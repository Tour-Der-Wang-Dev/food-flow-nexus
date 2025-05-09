
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainNavbar } from "@/components/MainNavbar";
import { FoodCategorySelector } from "@/components/FoodCategorySelector";
import { RestaurantCard } from "@/components/RestaurantCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    categories: ["2", "3"]
  },
  {
    id: "r2",
    name: "Sushi Palace",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop",
    cuisine: "Japanese",
    rating: 4.8,
    deliveryTime: "25-35 min",
    deliveryFee: "$3.99",
    categories: ["4"]
  },
  {
    id: "r3",
    name: "Pizza Heaven",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop",
    cuisine: "Italian",
    rating: 4.5,
    deliveryTime: "20-30 min",
    deliveryFee: "$2.99",
    categories: ["2", "7"]
  },
  {
    id: "r4",
    name: "Taco Town",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&auto=format&fit=crop",
    cuisine: "Mexican",
    rating: 4.3,
    deliveryTime: "20-30 min",
    deliveryFee: "$2.99",
    categories: ["6"]
  },
  {
    id: "r5",
    name: "Golden Dragon",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&auto=format&fit=crop",
    cuisine: "Chinese",
    rating: 4.6,
    deliveryTime: "25-40 min",
    deliveryFee: "$3.99",
    categories: ["5"]
  },
  {
    id: "r6",
    name: "Sweet Treats",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop",
    cuisine: "Desserts",
    rating: 4.7,
    deliveryTime: "15-25 min",
    deliveryFee: "$2.99",
    categories: ["8"]
  },
  {
    id: "r7",
    name: "Morning Delight",
    image: "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=800&auto=format&fit=crop",
    cuisine: "Breakfast",
    rating: 4.4,
    deliveryTime: "15-25 min",
    deliveryFee: "$2.49",
    categories: ["10"]
  },
  {
    id: "r8",
    name: "Spice Garden",
    image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=800&auto=format&fit=crop",
    cuisine: "Indian",
    rating: 4.6,
    deliveryTime: "30-40 min",
    deliveryFee: "$3.99",
    categories: ["11"]
  },
  {
    id: "r9",
    name: "Green Bowl",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop",
    cuisine: "Healthy",
    rating: 4.5,
    deliveryTime: "20-30 min",
    deliveryFee: "$2.99",
    categories: ["9"]
  },
];

const RestaurantsPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("1"); // Default to "All"
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };
  
  const handleRestaurantClick = (restaurantId: string) => {
    navigate(`/restaurant/${restaurantId}`);
  };
  
  const filteredRestaurants = restaurants.filter(restaurant => {
    // Apply category filter
    const matchesCategory = selectedCategory === "1" || restaurant.categories.includes(selectedCategory);
    
    // Apply search filter
    const matchesSearch = 
      searchQuery === "" || 
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNavbar />
      
      <main className="container mx-auto px-4 pb-20 max-w-6xl">
        <h1 className="text-3xl font-bold mt-8 mb-6">Restaurants</h1>
        
        <div className="mb-6 relative">
          <Input
            placeholder="Search for restaurants or cuisines..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        
        <FoodCategorySelector onSelectCategory={handleCategorySelect} />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredRestaurants.map(restaurant => (
            <RestaurantCard 
              key={restaurant.id}
              id={restaurant.id}
              name={restaurant.name}
              image={restaurant.image}
              cuisine={restaurant.cuisine}
              rating={restaurant.rating}
              deliveryTime={restaurant.deliveryTime}
              deliveryFee={restaurant.deliveryFee}
              onClick={handleRestaurantClick}
            />
          ))}
        </div>
        
        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No restaurants found</h3>
            <p className="text-muted-foreground mb-6">
              Try a different search or category
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSelectedCategory("1");
                setSearchQuery("");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default RestaurantsPage;
