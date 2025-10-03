import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';
import { ProductCard } from '@/components/product-card';
import { allProducts } from '@/lib/products-data';

export default function ShopPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 lg:py-12 px-4 lg:px-6 bg-gray-50">
        <div className="container mx-auto">
          {/* Back Button */}
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#E91E63] transition-colors mb-6 lg:mb-8"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Назад к категориям</span>
          </Link>

          {/* Page Header */}
          <div className="flex items-center gap-4 mb-8 lg:mb-12">
            <span className="text-4xl lg:text-5xl">🛍️</span>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold uppercase text-[#1A1A1A]">
                Все продукты
              </h1>
              <p className="text-gray-600 mt-2">
                {allProducts.length} товаров
              </p>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}