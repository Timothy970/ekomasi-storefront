# Technical Documentation: Ekomasi E-commerce App

## 1. Introduction
Ekomasi is a comprehensive e-commerce platform designed for a seamless shopping experience and efficient store management. It leverages modern web technologies to provide a fast, responsive, and secure environment for both customers and administrators.

## 2. Project Architecture
The project follows a modern Next.js 15 architecture using the **App Router**.

### `app/` Folder Breakdown

The `app/` directory uses the Next.js App Router. Each subfolder represents a route or a set of related routes:

- **`about-us/`**: Contains information about the company.
- **`blogs/`**: Management and display of company blog posts.
- **`bundles/`**: Displays curated product bundles/packages.
- **`cart/`**: The shopping cart page, allowing users to review and modify their selected items.
- **`categories/`**: A high-level listing of all product categories.
- **`category/`**: Dynamic routes for viewing products within a specific category.
- **`checkout/`**: The multi-step checkout process, including address selection and payment integration.
- **`dashboard/`**: The main user account area, which includes:
    - **`address/`**: Managed saved shipping/billing addresses.
    - **`details/`**: Edit user profile information.
    - **`giftcards/`**: View and manage gift card balances.
    - **`orders/`**: View order history and order details.
    - **`returns/`**: Handle product return requests.
    - **`wishlist/`**: personal wishlist management.
- **`deals/`**: Dedicated page for current active deals and promotions.
- **`faq/`**: List of frequently asked questions for customer support.
- **`guest/`**: Features tailored for guest users (e.g., guest order tracking).
- **`health/`**: A simple health check route for monitoring system status.
- **`new-in/`**: Showcases newly added items to the store.
- **`privacy-policy/`**: Legal document regarding data privacy.
- **`products/`**: Detailed product listing and product information pages.
- **`sales/`**: Focuses on discounted items and seasonal sales events.
- **`search/`**: Handles product search functionality and displays results.
- **`shared-wishlist/`**: View wishlists that have been shared via a public link.
- **`subcategory/`**: Refined view for products within specific sub-categories.
- **`terms-&-conditions/`**: Legal document outlining the terms of service.
- **`user/`**: Authentication-related pages:
    - **`login/`**: User login page.
    - **`signup/`**: New user registration.
    - **`otp/`**: One-Time Password verification flow.
- **`utils/`**: Client-side utility components (e.g., `toastUtils.ts`) used across different pages.

- **`ClientLayout.tsx`**: A client-side wrapper layout for shared UI elements like Navigation and Footer.
- **`StoreProvider.tsx`**: Wraps the application with the Redux store provider.
- **`layout.tsx`**: The main root layout for the entire application.
- **`globals.css`**: Global Tailwind CSS styles and custom CSS variables.

### Other Key Directories
- **`components/`**: Houses reusable UI components, categorized by their function (e.g., `PaymentProcessingModal.tsx`, shared UI elements).
- **`lib/`**: Centralized logic for state management, API services, and utility functions.
  - **`features/`**: Redux slices organized by domain (e.g., `cart`, `user`, `wishlist`, `returns`).
  - **`utils/`**: Helper functions and common types.
- **`public/`**: Static assets like images and icons.
- **`docs/`**: Project documentation (including this file).

## 3. Tech Stack & Dependencies
- **Core**: Next.js 15.5.2, React 19.1.0, TypeScript.
- **State Management**: Redux Toolkit with Redux Persist for client-side state persistence.
- **Styling**: Tailwind CSS v4 for utility-first styling, Framer Motion for animations.
- **UI Components**: Radix UI primitives for accessible and customizable components.
- **API Communication**: Axios for HTTP requests, WebSocket for real-time features.
- **Utilities**: `date-fns` for date manipulation, `dompurify` for sanitizing HTML, `lucide-react` for iconography.

## 4. State Management Flow
The application uses Redux Toolkit to manage global state. The state is divided into slices located in `lib/features/`.

### Persistence
`redux-persist` is used to maintain the user's session and cart data across page reloads. Sensitive data in the store is encrypted using `redux-persist-transform-encrypt`.

## 5. API & Integration
The frontend communicates with a Go-based backend (as inferred from related logs and directory structure) via a RESTful API.

### Environment Variables
- `NEXT_PUBLIC_API_BASE_URL`: The base URL for the REST API.
- `NEXT_PUBLIC_WS_BASE_URL`: The endpoint for WebSocket connections.
- `NEXT_PUBLIC_REDUX_SECRET_KEY`: Used for encrypting the persisted state.

## 6. Authentication
Authentication is primarily handled via **Google OAuth** (@react-oauth/google). The application maintains user profiles and session tokens in the Redux store.

## 7. Key Workflows
- **Checkout**: A multi-step process involving address selection, payment method choice (including M-Pesa), and order confirmation.
- **Admin Management**: Secure routes for managing products, categories, and viewing sales reports.
- **Returns**: A structured system for handling product returns, including approvals and M-Pesa refund integration.

## 8. Development & Deployment
- **Local Dev**: `npm run dev` (starts on port 3009).
- **Docker**: Supports containerized development using `docker-compose.dev.yml`.
- **Build**: `npm run build` generates a standalone output for optimized production hosting.
