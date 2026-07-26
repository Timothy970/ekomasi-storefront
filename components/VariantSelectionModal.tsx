"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { X, Plus, Minus } from 'lucide-react'
import { Product, VariantSelection } from '@/lib/features/types'
import { formatPrice } from '@/lib/utils/priceUtils'

interface VariantSelectionModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
  onConfirm: (selectedVariants: { variant: VariantSelection, quantity: number }[]) => void
  loading?: boolean
}

export default function VariantSelectionModal({
  product,
  isOpen,
  onClose,
  onConfirm,
  loading = false
}: VariantSelectionModalProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>({})

  if (!isOpen || !product.variant_selection) {
    return null
  }

  const handleIncrease = (sku: string, max: number) => {
    setQuantities(prev => ({
      ...prev,
      [sku]: Math.min((prev[sku] || 0) + 1, max)
    }))
  }

  const handleDecrease = (sku: string) => {
    setQuantities(prev => ({
      ...prev,
      [sku]: Math.max((prev[sku] || 0) - 1, 0)
    }))
  }

  const handleConfirm = () => {
    const selected = product.variant_selection!
      .filter(v => quantities[v.sku] > 0)
      .map(v => ({
        variant: v,
        quantity: quantities[v.sku]
      }))
    
    if (selected.length > 0) {
      onConfirm(selected)
    }
  }

  const totalSelected = Object.values(quantities).reduce((a, b) => a + b, 0)

  return (
    <div className='fixed inset-0 z-[100] h-screen w-screen flex justify-center items-center'>
      <div className='absolute bg-black/50 z-[105] h-screen w-screen' onClick={onClose} />
      
      <div className='bg-white flex flex-col w-full max-w-[500px] max-h-[90vh] rounded-lg overflow-hidden z-[110] m-4'>
        <div className='flex items-center justify-between p-4 border-b'>
          <h2 className='font-semibold text-lg'>Select Variations</h2>
          <button onClick={onClose} className='p-1 hover:bg-gray-100 rounded-full transition-colors'>
            <X size={20} />
          </button>
        </div>

        <div className='flex-1 overflow-y-auto p-4 space-y-4'>
          <div className='flex gap-4 mb-4'>
            <div className='flex-1'>
              <h3 className='font-medium text-base'>{product.name}</h3>
              <p className='text-sm text-gray-500'>Base Price: {formatPrice(product.price)}</p>
            </div>
          </div>

          <div className='space-y-3'>
            {product.variant_selection.map((variant) => {
              const qty = quantities[variant.sku] || 0
              const isOutOfStock = variant.stock_quantity === 0

              return (
                <div 
                  key={variant.sku} 
                  className={`flex items-center justify-between p-3 border rounded-md ${isOutOfStock ? 'opacity-50' : 'hover:border-secondary-tenant/50 transition-colors'}`}
                >
                  <div className='flex-1'>
                    <p className='font-medium text-sm'>{variant.name}</p>
                    <p className='text-xs text-gray-500'>
                      {variant.additional_price > 0 ? `+ ${formatPrice(variant.additional_price)}` : 'No additional cost'}
                      {variant.stock_quantity > 0 ? ` • ${variant.stock_quantity} in stock` : ' • Out of stock'}
                    </p>
                    <p className='text-sm font-semibold mt-1'>
                      {formatPrice(product.price + variant.additional_price)}
                    </p>
                  </div>

                  <div className='flex items-center gap-2'>
                    <Button
                      variant="outline"
                      size="icon"
                      className='h-8 w-8'
                      onClick={() => handleDecrease(variant.sku)}
                      disabled={qty === 0 || isOutOfStock}
                    >
                      <Minus size={14} />
                    </Button>
                    <span className='w-6 text-center text-sm font-medium'>{qty}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className='h-8 w-8'
                      onClick={() => handleIncrease(variant.sku, variant.stock_quantity)}
                      disabled={isOutOfStock || qty >= variant.stock_quantity}
                    >
                      <Plus size={14} />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className='p-4 border-t bg-gray-50'>
          <Button 
            className='w-full bg-secondary-tenant text-white py-6 text-base font-semibold'
            disabled={totalSelected === 0 || loading}
            onClick={handleConfirm}
          >
            {loading ? 'Adding to Cart...' : `Add ${totalSelected > 0 ? totalSelected : ''} to Cart`}
          </Button>
        </div>
      </div>
    </div>
  )
}
