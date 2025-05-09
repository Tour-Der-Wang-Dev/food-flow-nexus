
import { MainNavbar } from "@/components/MainNavbar";
import { CartSummary } from "@/components/CartSummary";
import { useCart } from "@/hooks/useCart";

const CartPage = () => {
  const { cartItems } = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNavbar />
      
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        
        <div className="bg-white rounded-xl shadow-sm">
          <CartSummary />
        </div>
      </main>
    </div>
  );
};

export default CartPage;
