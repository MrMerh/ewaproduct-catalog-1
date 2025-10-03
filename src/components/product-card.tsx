import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import type { Product } from '@/lib/products-data';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-xl border-2 border-gray-100 p-6 hover:border-[#E91E63] hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col h-full">
        {/* Product Image Placeholder */}
        <div className="relative w-full aspect-square mb-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
          <div className="text-6xl opacity-20">📦</div>
          {product.image && (
            <img 
              src={product.image} 
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          )}
        </div>

        {/* Product Name */}
        <h3 className="text-sm font-bold text-[#1A1A1A] mb-3 line-clamp-2 flex-grow">
          {product.name}
        </h3>

        {/* View Button */}
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-gradient-to-r from-[#E91E63] to-[#C2185B] text-white rounded-lg font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all"
        >
          Посмотреть
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
}