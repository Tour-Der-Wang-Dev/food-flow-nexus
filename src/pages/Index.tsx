
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainNavbar } from "@/components/MainNavbar";
import { FoodCategorySelector } from "@/components/FoodCategorySelector";
import { RestaurantCard } from "@/components/RestaurantCard";
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
];

const offers = [
  {
    id: "o1",
    title: "50% OFF Your First Order",
    description: "Use code WELCOME50",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&auto=format&fit=crop",
    backgroundColor: "bg-brand-soft-pink"
  },
  {
    id: "o2",
    title: "Free Delivery on Orders $15+",
    description: "Limited time offer",
    image: "https://images.unsplash.com/photo-1571867424488-4565932edb41?w=800&auto=format&fit=crop",
    backgroundColor: "bg-brand-soft-yellow"
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("1"); // Default to "All"
  
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };
  
  const handleRestaurantClick = (restaurantId: string) => {
    navigate(`/restaurant/${restaurantId}`);
  };
  
  const filteredRestaurants = selectedCategory === "1" 
    ? restaurants 
    : restaurants.filter(restaurant => restaurant.categories.includes(selectedCategory));

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNavbar />
      
      <main className="container mx-auto px-4 pb-20 max-w-6xl">
        {/* Hero Banner */}
        <div className="w-full bg-brand-orange rounded-xl overflow-hidden mt-6 relative">
          <div className="md:flex items-center">
            <div className="md:w-1/2 p-6 md:p-10 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                Food delivery made simple
              </h1>
              <p className="text-lg mb-6 opacity-90">
                Order from your favorite restaurants with just a few taps
              </p>
              <Button 
                size="lg" 
                className="bg-white text-brand-orange hover:bg-gray-100"
                onClick={() => navigate('/restaurants')}
              >
                Order Now
              </Button>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&auto=format&fit=crop"
                alt="Delicious Food" 
                className="w-full h-56 md:h-72 object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Offers */}
        <h2 className="text-2xl font-bold mt-10 mb-4">Special Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offers.map(offer => (
            <div 
              key={offer.id} 
              className={`${offer.backgroundColor} rounded-xl p-6 flex flex-col md:flex-row items-center card-hover cursor-pointer`}
            >
              <div className="md:w-2/3 mb-4 md:mb-0 md:mr-4">
                <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                <p className="text-gray-700">{offer.description}</p>
              </div>
              <div className="md:w-1/3">
                <img 
                  src={offer.image} 
                  alt={offer.title} 
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Food Categories */}
        <FoodCategorySelector onSelectCategory={handleCategorySelect} />
        
        {/* Restaurants */}
        <h2 className="text-2xl font-bold mt-10 mb-6">Restaurants Near You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              Try selecting a different category
            </p>
            <Button 
              variant="outline" 
              onClick={() => setSelectedCategory("1")}
            >
              View All Restaurants
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
