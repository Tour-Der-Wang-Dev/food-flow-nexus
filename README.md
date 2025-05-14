
# Food Delivery Hub

A comprehensive food delivery platform connecting customers with local restaurants for seamless online ordering, delivery tracking, and management.

![Food Delivery Hub](https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&auto=format&fit=crop)

## Features

- **User Authentication**: Secure signup and login with email/password
- **Restaurant Discovery**: Browse restaurants by category, cuisine, or search
- **Menu Exploration**: View restaurant menus with detailed item descriptions
- **Shopping Cart**: Add items, customize orders, and proceed to checkout
- **Order Tracking**: Real-time updates on order status
- **User Profiles**: Manage personal information and delivery addresses
- **Responsive Design**: Optimized for both desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or Yarn
- Supabase account (for backend services)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/food-delivery-hub.git
   cd food-delivery-hub
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Technology Stack

- **Frontend**:
  - React.js with TypeScript
  - Vite (build tool)
  - React Router (routing)
  - Tailwind CSS (styling)
  - Shadcn UI (component library)
  - Lucide Icons

- **Backend**:
  - Supabase (Backend-as-a-Service)
  - PostgreSQL (database)
  - Supabase Auth (authentication)
  - Supabase Storage (file storage)

- **State Management**:
  - React Query (data fetching)
  - React Context API (global state)

## Project Structure

The project follows a feature-based organization, with key directories including:

- `/src/components`: Reusable UI components
- `/src/pages`: Page components corresponding to routes
- `/src/hooks`: Custom React hooks
- `/src/lib`: Utility functions and helpers
- `/src/integrations`: Integration with external services

See [filesExplainer.md](./filesExplainer.md) for a detailed breakdown of all files.

## Deployment

The application can be deployed using services like Vercel, Netlify, or any other static site hosting platform.

1. Build the production version:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. Deploy the contents of the `dist` directory to your hosting service.

## Contributing

We welcome contributions to the Food Delivery Hub project!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Shadcn UI for the component library
- Tailwind CSS for styling utilities
- Supabase for backend services
- All the contributors who have helped shape this project
