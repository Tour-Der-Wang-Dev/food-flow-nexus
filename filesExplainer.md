
# Food Delivery Hub - Files Explanation

This document explains all the files in the project, organized by folder structure, with importance indicators:
- 🟢 Critical file with many imports or core functionality
- 💛 Important file with moderate usage
- 🔴 Supporting file with few imports or utility purpose

## Root Directory

- `README.md` 🟢 - Main project documentation and getting started guide
- `supabase/config.toml` 🔴 - Supabase project configuration
- `tailwind.config.ts` 🟢 - Tailwind CSS configuration with theme customization
- `package.json` 🟢 - Project dependencies and scripts
- `vite.config.ts` 🟢 - Vite bundler configuration
- `tsconfig.json` 🟢 - TypeScript configuration
- `index.html` 🔴 - Entry HTML file for the Vite application

## Source (src) Directory

### Root
- `src/main.tsx` 🟢 - Application entry point that renders the root component
- `src/App.tsx` 🟢 - Main application component with routing setup
- `src/vite-env.d.ts` 🔴 - TypeScript type declarations for Vite environment
- `src/index.css` 🟢 - Global CSS styles including Tailwind imports

### Components
- `src/components/MainNavbar.tsx` 🟢 - Main navigation bar with user authentication controls
- `src/components/ProtectedRoute.tsx` 🟢 - Route wrapper that requires authentication
- `src/components/RestaurantCard.tsx` 💛 - Card component for displaying restaurant information
- `src/components/MenuItemCard.tsx` 💛 - Card component for displaying food menu items
- `src/components/FoodCategorySelector.tsx` 💛 - Component for selecting food categories
- `src/components/CartSummary.tsx` 💛 - Cart summary component showing order details

### UI Components
- `src/components/ui/aspect-ratio.tsx` 🔴 - Component for maintaining aspect ratios
- `src/components/ui/button.tsx` 🟢 - Reusable button component with variants
- `src/components/ui/card.tsx` 🟢 - Card component for content containers
- `src/components/ui/form.tsx` 🟢 - Form components with validation
- `src/components/ui/input.tsx` 🟢 - Input component for form fields
- `src/components/ui/skeleton.tsx` 🔴 - Loading skeleton component
- `src/components/ui/use-toast.ts` 🟢 - Toast notification hook

### Pages
- `src/pages/Index.tsx` 🟢 - Homepage with featured restaurants and offers
- `src/pages/RestaurantsPage.tsx` 🟢 - Page showing all available restaurants
- `src/pages/RestaurantPage.tsx` 🟢 - Individual restaurant page with menu items
- `src/pages/CartPage.tsx` 🟢 - Shopping cart page with checkout functionality
- `src/pages/AuthPage.tsx` 🟢 - Authentication page with login and signup forms
- `src/pages/ProfilePage.tsx` 🟢 - User profile management page
- `src/pages/NotFound.tsx` 🔴 - 404 error page

### Hooks and Utilities
- `src/hooks/useAuth.tsx` 🟢 - Authentication context and functionality
- `src/hooks/useCart.tsx` 🟢 - Shopping cart context and state management
- `src/hooks/use-toast.ts` 🟢 - Toast notification utility
- `src/lib/utils.ts` 💛 - Utility functions for the application

### API Integration
- `src/integrations/supabase/client.ts` 🟢 - Supabase client configuration
- `src/integrations/supabase/types.ts` 💛 - TypeScript type definitions for Supabase data
