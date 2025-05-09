
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface RestaurantCardProps {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  onClick: (id: string) => void;
}

export const RestaurantCard = ({
  id,
  name,
  image,
  cuisine,
  rating,
  deliveryTime,
  deliveryFee,
  onClick,
}: RestaurantCardProps) => {
  return (
    <Card 
      className="restaurant-card cursor-pointer"
      onClick={() => onClick(id)}
    >
      <div className="h-48 overflow-hidden relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge className="bg-white text-black hover:bg-gray-100">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
            {rating}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-1">{name}</h3>
        <p className="text-muted-foreground text-sm mb-2">{cuisine}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{deliveryTime}</span>
          <span className="text-muted-foreground">{deliveryFee}</span>
        </div>
      </CardContent>
    </Card>
  );
};
