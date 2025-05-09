
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";

export const MainNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const cartItemCount = cartItems.length;

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/b352db9e-fafd-481b-b208-81884538f813.png" 
              alt="Tour Der Wang Logo" 
              className="h-12 mr-3"
            />
          </Link>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:flex relative flex-1 max-w-md mx-6">
            <Input
              placeholder="Search for restaurants or food..."
              className="pr-10"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          {/* Nav Links - desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/restaurants" className="text-gray-700 hover:text-brand-orange">
              Restaurants
            </Link>
            <Link to="/account" className="text-gray-700 hover:text-brand-orange">
              <User className="h-5 w-5" />
            </Link>
            <Link to="/cart" className="text-gray-700 hover:text-brand-orange relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Link>
            <Button variant="default">Sign In</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="mr-4 text-gray-700 hover:text-brand-orange relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile search - only visible on mobile */}
        <div className="mt-3 md:hidden relative">
          <Input
            placeholder="Search for restaurants or food..."
            className="pr-10"
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 py-3 border-t animate-fade-in">
            <Link 
              to="/restaurants" 
              className="block py-2 text-gray-700 hover:text-brand-orange"
              onClick={() => setIsMenuOpen(false)}
            >
              Restaurants
            </Link>
            <Link 
              to="/account" 
              className="block py-2 text-gray-700 hover:text-brand-orange"
              onClick={() => setIsMenuOpen(false)}
            >
              My Account
            </Link>
            <Button 
              variant="default" 
              className="w-full mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
