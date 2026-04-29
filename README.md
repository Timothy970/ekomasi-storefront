# Adenzo E-commerce App

A modern, high-performance e-commerce platform built with Next.js 15, featuring a robust admin dashboard and a seamless shopping experience.

## 🚀 Key Features

- **Storefront**: Browse products, categories, and subcategories.
- **User Management**: Authentication with Google OAuth, profile management, and address books.
- **Cart & Wishlist**: Persistent cart and shared wishlist functionality.
- **Checkout & Payments**: Integrated checkout flow with support for multiple payment methods (including M-Pesa).
- **Admin Dashboard**: Comprehensive management of products, orders, categories, blogs, and banners.
- **Real-time Updates**: WebSocket integration for live status updates.
- **Marketing Tools**: Vouchers and deals management.

## 🛠 Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/) (App Router), [React 19](https://react.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) with [Redux Persist](https://github.com/rt2zz/redux-persist)
- **UI Components**: [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Data Fetching**: [Axios](https://axios-http.com/)
- **Tables**: [TanStack Table v8](https://tanstack.com/table/v8)

## 📦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env.local` file in the root directory and add the following variables:

```env
NEXT_PUBLIC_API_BASE_URL=your_api_url
NEXT_PUBLIC_REDUX_SECRET_KEY=your_secret_key
NEXT_PUBLIC_WS_BASE_URL=your_websocket_url
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3009](http://localhost:3009) to view the application.

### Build

To create a production build:

```bash
npm run build
```

## 🐳 Docker Support

For development with Docker:

```bash
docker compose -f docker-compose.dev.yml up --build
```

## 📂 Project Structure

- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable UI components.
- `lib/`: Redux slices, custom hooks, and utility functions.
- `public/`: Static assets.
- `docs/`: Technical and project documentation.

