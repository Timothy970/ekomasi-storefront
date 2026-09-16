import React from 'react';
import Navigation from '@/components/Navigation';
import { ShoppingBag } from 'lucide-react';

export function ProductLoadingView() {
  return (
    <Navigation>
      <div className="flex flex-col items-center justify-center h-[80vh] text-center space-y-4">
        <div className="w-12 h-12 border-4 border-secondary-tenant/30 border-t-[var(--secondary)] rounded-full animate-spin"></div>
      </div>
    </Navigation>
  );
}

export function ProductNotFoundView() {
  return (
    <Navigation>
      <div className="flex flex-col items-center justify-center h-[80vh] text-center space-y-4">
        <ShoppingBag className="w-16 h-16 text-gray-400" />
        <h2 className="text-xl font-semibold text-gray-800">Product not found</h2>
        <p className="text-gray-500 max-w-sm">
          The product you’re looking for doesn’t exist or has been removed.
        </p>
        <a
          href="/"
          className="mt-4 px-5 py-2.5 rounded-full bg-secondary-tenant text-white hover:opacity-90 transition-colors"
        >
          Continue Shopping
        </a>
      </div>
    </Navigation>
  );
}
