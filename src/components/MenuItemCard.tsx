
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart, MenuItem } from "@/hooks/useCart";
import { useToast } from "@/components/ui/use-toast";

interface MenuItemCardProps {
  item: MenuItem;
}

export const MenuItemCard = ({ item }: MenuItemCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Simulate a slight delay for better UX
    setTimeout(() => {
      addToCart(item);
      setIsAdding(false);
      
      toast({
        title: "Added to cart",
        description: `${item.name} has been added to your cart.`,
        duration: 2000,
      });
    }, 300);
  };

  return (
    <Card className="restaurant-card h-full flex flex-col">
      <div className="h-40 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-base mb-1">{item.name}</h3>
        <p className="text-muted-foreground text-sm mb-2 line-clamp-2 flex-grow">
          {item.description}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="font-medium">${item.price.toFixed(2)}</span>
          <Button 
            variant="default" 
            size="sm" 
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
