import React from 'react'
import Product from './Product'

export default function CategoryProducts() {
    const products = [
        { id: 1, name: "Men's Fashion", price: "KES 79", image: "https://picsum.photos/400/500?random=1", description: "Trendy and stylish clothing options for men." },
        { id: 2, name: "Women's Fashion", price: "KES 99", image: "https://picsum.photos/400/500?random=2", description: "Elegant and fashionable outfits for women." },
        { id: 3, name: "Electronics", price: "KES 299", image: "https://picsum.photos/400/500?random=3", description: "Latest gadgets, smartphones, and tech gear." },
        { id: 4, name: "Home & Living", price: "KES 159", image: "https://picsum.photos/400/500?random=4", description: "Furniture and accessories for a cozy home." },
        { id: 5, name: "Sports & Outdoors", price: "KES 129", image: "https://picsum.photos/400/500?random=5", description: "Gear up for fitness, sports, and adventure." },
        { id: 6, name: "Beauty & Health", price: "KES 49", image: "https://picsum.photos/400/500?random=6", description: "Skincare, cosmetics, and wellness essentials." },
        { id: 7, name: "Shoes", price: "KES 120", image: "https://picsum.photos/400/500?random=7", description: "Footwear for every style and occasion." },
        { id: 8, name: "Furniture", price: "KES 399", image: "https://picsum.photos/400/500?random=8", description: "Comfortable and modern furniture pieces." },
        { id: 9, name: "Groceries", price: "KES 59", image: "https://picsum.photos/400/500?random=9", description: "Everyday essentials and fresh produce." },
        { id: 10, name: "Toys", price: "KES 39", image: "https://picsum.photos/400/500?random=10", description: "Fun and safe toys for kids of all ages." },
    ]

    return (
        <div className="mt-[2rem] lg:mt-[2.5rem]">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {products.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}
