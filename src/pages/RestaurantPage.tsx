
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MainNavbar } from "@/components/MainNavbar";
import { MenuItemCard } from "@/components/MenuItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Clock, DollarSign } from "lucide-react";

// Sample restaurant data
const restaurants = [
  {
    id: "r1",
    name: "Burger King",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop",
    cuisine: "Fast Food",
    rating: 4.2,
    deliveryTime: "15-25 min",
    deliveryFee: "$1.99",
    description: "Home of the Whopper and more. Serving flame-grilled favorites for decades.",
    tags: ["Burgers", "Fast Food", "Value Meals"],
  },
  {
    id: "r2",
    name: "Sushi Palace",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop",
    cuisine: "Japanese",
    rating: 4.8,
    deliveryTime: "25-35 min",
    deliveryFee: "$3.99",
    description: "Premium sushi and Japanese cuisine prepared by master chefs.",
    tags: ["Sushi", "Japanese", "Healthy"],
  },
  {
    id: "r3",
    name: "Pizza Heaven",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop",
    cuisine: "Italian",
    rating: 4.5,
    deliveryTime: "20-30 min",
    deliveryFee: "$2.99",
    description: "Artisanal pizzas with the freshest ingredients and perfect crust every time.",
    tags: ["Pizza", "Italian", "Family Meals"],
  },
  {
    id: "r4",
    name: "Taco Town",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&auto=format&fit=crop",
    cuisine: "Mexican",
    rating: 4.3,
    deliveryTime: "20-30 min",
    deliveryFee: "$2.99",
    description: "Authentic Mexican street food bringing the flavors of Mexico to your doorstep.",
    tags: ["Mexican", "Tacos", "Burritos"],
  },
  {
    id: "r5",
    name: "Golden Dragon",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&auto=format&fit=crop",
    cuisine: "Chinese",
    rating: 4.6,
    deliveryTime: "25-40 min",
    deliveryFee: "$3.99",
    description: "Traditional Chinese dishes prepared with authentic recipes and techniques.",
    tags: ["Chinese", "Asian", "Noodles"],
  },
  {
    id: "r6",
    name: "Sweet Treats",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop",
    cuisine: "Desserts",
    rating: 4.7,
    deliveryTime: "15-25 min",
    deliveryFee: "$2.99",
    description: "Indulgent desserts and sweet treats to satisfy your cravings.",
    tags: ["Desserts", "Ice Cream", "Cakes"],
  },
];

// Sample menu items
const menuItems = {
  "r1": [
    {
      id: "r1-m1",
      name: "Whopper",
      description: "Flame-grilled beef patty topped with juicy tomatoes, fresh lettuce, mayonnaise, ketchup, and onions on a sesame seed bun.",
      price: 7.99,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop",
      category: "Burgers",
      restaurantId: "r1",
      restaurantName: "Burger King",
    },
    {
      id: "r1-m2",
      name: "Chicken Sandwich",
      description: "Crispy chicken fillet topped with lettuce and mayo on a toasted bun.",
      price: 6.99,
      image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&auto=format&fit=crop",
      category: "Chicken",
      restaurantId: "r1",
      restaurantName: "Burger King",
    },
    {
      id: "r1-m3",
      name: "French Fries",
      description: "Golden, crispy, and delicious french fries made from premium potatoes.",
      price: 3.99,
      image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=800&auto=format&fit=crop",
      category: "Sides",
      restaurantId: "r1",
      restaurantName: "Burger King",
    },
    {
      id: "r1-m4",
      name: "Chocolate Shake",
      description: "Creamy chocolate milkshake topped with whipped cream.",
      price: 4.99,
      image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop",
      category: "Beverages",
      restaurantId: "r1",
      restaurantName: "Burger King",
    },
    {
      id: "r1-m5",
      name: "Onion Rings",
      description: "Crispy battered onion rings fried to golden perfection.",
      price: 3.49,
      image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=800&auto=format&fit=crop",
      category: "Sides",
      restaurantId: "r1",
      restaurantName: "Burger King",
    },
    {
      id: "r1-m6",
      name: "Bacon King",
      description: "Two flame-grilled beef patties topped with smoky bacon, cheese, ketchup and mayo on a sesame seed bun.",
      price: 9.99,
      image: "https://images.unsplash.com/photo-1550317138-10000687a72b?w=800&auto=format&fit=crop",
      category: "Burgers",
      restaurantId: "r1",
      restaurantName: "Burger King",
    },
  ],
  "r2": [
    {
      id: "r2-m1",
      name: "California Roll",
      description: "Crab, avocado and cucumber wrapped in seaweed and rice.",
      price: 8.99,
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop",
      category: "Rolls",
      restaurantId: "r2",
      restaurantName: "Sushi Palace",
    },
    {
      id: "r2-m2",
      name: "Salmon Nigiri",
      description: "Fresh salmon over pressed vinegared rice.",
      price: 7.99,
      image: "https://images.unsplash.com/photo-1556845754-93cd99eb8ec8?w=800&auto=format&fit=crop",
      category: "Nigiri",
      restaurantId: "r2",
      restaurantName: "Sushi Palace",
    },
    // More menu items...
  ],
  // More restaurants...
};

// Sample categories for each restaurant
const restaurantCategories = {
  "r1": ["Burgers", "Chicken", "Sides", "Beverages"],
  "r2": ["Rolls", "Nigiri", "Sashimi", "Appetizers"],
  "r3": ["Pizza", "Pasta", "Appetizers", "Desserts"],
  "r4": ["Tacos", "Burritos", "Quesadillas", "Sides"],
  "r5": ["Noodles", "Rice", "Appetizers", "Specialties"],
  "r6": ["Cakes", "Ice Cream", "Cookies", "Beverages"],
};

const RestaurantPage = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [menuItemsByCategory, setMenuItemsByCategory] = useState<any>({});
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");

  useEffect(() => {
    if (id) {
      // Find the restaurant by id
      const foundRestaurant = restaurants.find(r => r.id === id);
      setRestaurant(foundRestaurant);
      
      // Get menu items for this restaurant
      const items = menuItems[id as keyof typeof menuItems] || [];
      
      // Organize items by category
      const itemsByCategory: Record<string, any[]> = {};
      items.forEach(item => {
        if (!itemsByCategory[item.category]) {
          itemsByCategory[item.category] = [];
        }
        itemsByCategory[item.category].push(item);
      });
      
      setMenuItemsByCategory(itemsByCategory);
      
      // Get categories for this restaurant
      const restaurantCats = restaurantCategories[id as keyof typeof restaurantCategories] || [];
      setCategories(restaurantCats);
      
      // Set active category to first one
      if (restaurantCats.length > 0) {
        setActiveCategory(restaurantCats[0]);
      }
    }
  }, [id]);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MainNavbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold">Restaurant not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNavbar />
      
      <div className="relative">
        {/* Restaurant Hero Image */}
        <div className="h-64 md:h-80 w-full">
          <img 
            src={restaurant.image} 
            alt={restaurant.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
        
        {/* Restaurant Info */}
        <div className="container mx-auto px-4 relative -mt-24 z-10 max-w-6xl">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
            <p className="text-muted-foreground mb-3">{restaurant.cuisine}</p>
            
            <div className="flex flex-wrap items-center text-sm text-muted-foreground mb-4 gap-y-2">
              <div className="flex items-center mr-4">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span>{restaurant.rating} (500+ ratings)</span>
              </div>
              <div className="flex items-center mr-4">
                <Clock className="h-4 w-4 mr-1" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                <span>Delivery fee: {restaurant.deliveryFee}</span>
              </div>
            </div>
            
            <p className="mb-4">
              {restaurant.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {restaurant.tags.map((tag: string) => (
                <span 
                  key={tag} 
                  className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 pb-20 max-w-6xl">
        <h2 className="text-2xl font-bold mb-6">Menu</h2>
        
        <Tabs defaultValue={activeCategory} className="w-full">
          <TabsList className="mb-6 w-full h-auto flex flex-wrap">
            {categories.map(category => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="py-2 px-4"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map(category => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItemsByCategory[category]?.map((item: any) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
              
              {(!menuItemsByCategory[category] || menuItemsByCategory[category].length === 0) && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No items found in this category
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
};

export default RestaurantPage;
