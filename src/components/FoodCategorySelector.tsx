
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Category {
  id: string;
  name: string;
  icon: string;
}

const categories: Category[] = [
  { id: "1", name: "All", icon: "🍽️" },
  { id: "2", name: "Pizza", icon: "🍕" },
  { id: "3", name: "Burgers", icon: "🍔" },
  { id: "4", name: "Sushi", icon: "🍣" },
  { id: "5", name: "Chinese", icon: "🥡" },
  { id: "6", name: "Mexican", icon: "🌮" },
  { id: "7", name: "Italian", icon: "🍝" },
  { id: "8", name: "Desserts", icon: "🍰" },
  { id: "9", name: "Healthy", icon: "🥗" },
  { id: "10", name: "Breakfast", icon: "🍳" },
  { id: "11", name: "Indian", icon: "🍛" },
  { id: "12", name: "Thai", icon: "🍲" },
];

interface FoodCategorySelectorProps {
  onSelectCategory: (categoryId: string) => void;
}

export const FoodCategorySelector = ({ onSelectCategory }: FoodCategorySelectorProps) => {
  const [selectedCategory, setSelectedCategory] = useState("1"); // Default to "All"

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    onSelectCategory(categoryId);
  };

  return (
    <div className="my-6">
      <h3 className="text-lg font-semibold mb-4 px-4">Categories</h3>
      <ScrollArea className="w-full">
        <div className="flex space-x-4 pb-2 px-4 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`food-category-button min-w-[80px] ${
                selectedCategory === category.id ? "bg-brand-orange text-white" : ""
              }`}
            >
              <span className="text-2xl mb-1">{category.icon}</span>
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
