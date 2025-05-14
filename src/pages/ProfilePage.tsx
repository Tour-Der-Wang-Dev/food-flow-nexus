
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { MainNavbar } from "@/components/MainNavbar";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash, Plus, Check } from "lucide-react";

const profileSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  phoneNumber: z.string().optional(),
});

const addressSchema = z.object({
  addressLine1: z.string().min(1, { message: "Address is required" }),
  addressLine2: z.string().optional(),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  postalCode: z.string().min(1, { message: "Postal code is required" }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type AddressFormValues = z.infer<typeof addressSchema>;

interface ProfileData {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string | null;
}

interface AddressData {
  id: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  postal_code: string;
  is_default: boolean;
}

const ProfilePage = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [addresses, setAddresses] = useState<AddressData[]>([]);
  const [activeTab, setActiveTab] = useState("profile");

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
  });

  const addressForm = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
    },
  });

  // Fetch profile data
  useEffect(() => {
    if (!user) return;

    const fetchProfileData = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        if (data) {
          profileForm.reset({
            firstName: data.first_name || "",
            lastName: data.last_name || "",
            phoneNumber: data.phone_number || "",
          });
        }
      } catch (error: any) {
        console.error("Error fetching profile:", error.message);
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [user, profileForm]);

  // Fetch addresses
  useEffect(() => {
    if (!user) return;

    const fetchAddresses = async () => {
      try {
        const { data, error } = await supabase
          .from("delivery_addresses")
          .select("*")
          .eq("user_id", user.id)
          .order("is_default", { ascending: false });

        if (error) throw error;

        if (data) {
          setAddresses(data);
        }
      } catch (error: any) {
        console.error("Error fetching addresses:", error.message);
        toast({
          title: "Error",
          description: "Failed to load address data",
          variant: "destructive",
        });
      }
    };

    fetchAddresses();
  }, [user]);

  const onProfileSubmit = async (data: ProfileFormValues) => {
    if (!user) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: data.firstName,
          last_name: data.lastName,
          phone_number: data.phoneNumber || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    } catch (error: any) {
      console.error("Error updating profile:", error.message);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const onAddressSubmit = async (data: AddressFormValues) => {
    if (!user) return;

    setIsSaving(true);
    try {
      const { error } = await supabase.from("delivery_addresses").insert({
        user_id: user.id,
        address_line1: data.addressLine1,
        address_line2: data.addressLine2 || null,
        city: data.city,
        state: data.state,
        postal_code: data.postalCode,
        is_default: addresses.length === 0 ? true : false,
      });

      if (error) throw error;

      // Refresh addresses
      const { data: newAddresses, error: fetchError } = await supabase
        .from("delivery_addresses")
        .select("*")
        .eq("user_id", user.id)
        .order("is_default", { ascending: false });

      if (fetchError) throw fetchError;

      setAddresses(newAddresses || []);
      setIsAddingAddress(false);
      addressForm.reset();

      toast({
        title: "Address added",
        description: "Your address has been added successfully",
      });
    } catch (error: any) {
      console.error("Error adding address:", error.message);
      toast({
        title: "Error",
        description: "Failed to add address",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const setDefaultAddress = async (addressId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("delivery_addresses")
        .update({ is_default: true })
        .eq("id", addressId)
        .eq("user_id", user.id);

      if (error) throw error;

      // Update local state
      setAddresses(prevAddresses =>
        prevAddresses.map(address => ({
          ...address,
          is_default: address.id === addressId,
        }))
      );

      toast({
        title: "Default address updated",
        description: "Your default delivery address has been updated",
      });
    } catch (error: any) {
      console.error("Error setting default address:", error.message);
      toast({
        title: "Error",
        description: "Failed to update default address",
        variant: "destructive",
      });
    }
  };

  const deleteAddress = async (addressId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("delivery_addresses")
        .delete()
        .eq("id", addressId)
        .eq("user_id", user.id);

      if (error) throw error;

      // Update local state
      setAddresses(prevAddresses => prevAddresses.filter(a => a.id !== addressId));

      toast({
        title: "Address deleted",
        description: "Your address has been deleted",
      });
    } catch (error: any) {
      console.error("Error deleting address:", error.message);
      toast({
        title: "Error",
        description: "Failed to delete address",
        variant: "destructive",
      });
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <MainNavbar />
        
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-6 text-2xl font-bold">My Account</h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="addresses">Addresses</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details here
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormField
                          control={profileForm.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="First Name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={profileForm.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Last Name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={profileForm.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Phone Number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" disabled={isSaving}>
                        {isSaving ? "Saving..." : "Save Changes"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="addresses">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Delivery Addresses</CardTitle>
                    <CardDescription>
                      Manage your delivery addresses
                    </CardDescription>
                  </div>
                  <Button onClick={() => setIsAddingAddress(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Add Address
                  </Button>
                </CardHeader>
                <CardContent>
                  {isAddingAddress ? (
                    <Card className="mb-4 border border-brand-orange">
                      <CardHeader>
                        <CardTitle>Add New Address</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Form {...addressForm}>
                          <form onSubmit={addressForm.handleSubmit(onAddressSubmit)} className="space-y-4">
                            <FormField
                              control={addressForm.control}
                              name="addressLine1"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Address Line 1</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Street address" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={addressForm.control}
                              name="addressLine2"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Address Line 2 (Optional)</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Apartment, suite, etc." {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                              <FormField
                                control={addressForm.control}
                                name="city"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                      <Input placeholder="City" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={addressForm.control}
                                name="state"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>State</FormLabel>
                                    <FormControl>
                                      <Input placeholder="State" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={addressForm.control}
                                name="postalCode"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Postal Code</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Postal code" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <div className="flex space-x-2">
                              <Button type="submit" disabled={isSaving}>
                                {isSaving ? "Saving..." : "Save Address"}
                              </Button>
                              <Button 
                                type="button" 
                                variant="outline" 
                                onClick={() => setIsAddingAddress(false)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </form>
                        </Form>
                      </CardContent>
                    </Card>
                  ) : null}
                  
                  {addresses.length === 0 && !isAddingAddress ? (
                    <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                      <p className="text-muted-foreground">You don't have any saved addresses</p>
                      <Button 
                        className="mt-4" 
                        variant="outline" 
                        onClick={() => setIsAddingAddress(true)}
                      >
                        <Plus className="mr-2 h-4 w-4" /> Add your first address
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {addresses.map((address) => (
                        <div 
                          key={address.id} 
                          className={`relative rounded-lg border p-4 ${
                            address.is_default ? "border-brand-orange bg-accent" : ""
                          }`}
                        >
                          {address.is_default && (
                            <div className="absolute right-2 top-2 rounded-full bg-brand-orange px-2 py-1 text-xs text-white">
                              Default
                            </div>
                          )}
                          <div className="mb-2">
                            <p>{address.address_line1}</p>
                            {address.address_line2 && <p>{address.address_line2}</p>}
                            <p>
                              {address.city}, {address.state} {address.postal_code}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            {!address.is_default && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setDefaultAddress(address.id)}
                              >
                                <Check className="mr-1 h-3 w-3" /> 
                                Set as default
                              </Button>
                            )}
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              onClick={() => deleteAddress(address.id)}
                            >
                              <Trash className="mr-1 h-3 w-3" /> 
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ProfilePage;
