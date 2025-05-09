
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { Minus, Plus, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

export const CartSummary = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      toast({
        title: "Order Placed Successfully!",
        description: "Your order has been placed and is being prepared.",
        duration: 5000,
      });
      
      clearCart();
      setIsCheckingOut(false);
    }, 1500);
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-muted-foreground mb-6">Add items to get started</p>
        <Button variant="outline" asChild>
          <a href="/restaurants">Browse Restaurants</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      
      <div className="space-y-4 mb-6">
        {cartItems.map(item => (
          <div key={item.id} className="flex items-start justify-between">
            <div className="flex items-start">
              <div className="flex items-center space-x-3 mr-3">
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-medium">{item.quantity}</span>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              <div className="flex-1">
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-muted-foreground">
                  ${item.price.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {item.restaurantName}
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="font-medium mr-3">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
              <button 
                className="text-gray-500 hover:text-destructive"
                onClick={() => removeFromCart(item.id)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <Separator />
      
      <div className="mt-4 space-y-3">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${getCartTotal().toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span>$3.99</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
        </div>
        
        <Separator />
        
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${(getCartTotal() + 3.99 + getCartTotal() * 0.08).toFixed(2)}</span>
        </div>
        
        <Button 
          className="w-full mt-4" 
          onClick={handleCheckout}
          disabled={isCheckingOut}
        >
          {isCheckingOut ? "Processing..." : "Checkout"}
        </Button>
      </div>
    </div>
  );
};
