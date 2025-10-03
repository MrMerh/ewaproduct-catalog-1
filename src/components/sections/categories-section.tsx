'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Download, Search } from 'lucide-react';

const categories = [
  {
    name: 'ХИТЫ',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0b3871a9-339e-42e0-ba54-51f5ac1974b3-ewaproduct-com/assets/images/hit-site-1.png',
    href: '/shop/hits',
  },
  {
    name: 'СТАРТОВЫЕ НАБОРЫ',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0b3871a9-339e-42e0-ba54-51f5ac1974b3-ewaproduct-com/assets/images/starter-box-site-2.png',
    href: '/shop/starter-kits',
  },
  {
    name: 'НОВИНКИ',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0b3871a9-339e-42e0-ba54-51f5ac1974b3-ewaproduct-com/assets/images/new-site-3.png',
    href: '/shop/new-products',
  },
  {
    name: 'ЗАБОТА О МОЗГЕ',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0b3871a9-339e-42e0-ba54-51f5ac1974b3-ewaproduct-com/assets/images/brain-site-4.png',
    href: '/shop/brain-care',
  },
  {
    name: 'БАД',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0b3871a9-339e-42e0-ba54-51f5ac1974b3-ewaproduct-com/assets/images/health-site-5.png',
    href: '/shop/health-supplement',
  },
  {
    name: 'ПОХУДЕНИЕ',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0b3871a9-339e-42e0-ba54-51f5ac1974b3-ewaproduct-com/assets/images/weight-loss-site-6.png',
    href: '/shop/slimming',
  },
  {
    name: 'ЗДОРОВОЕ ПИТАНИЕ',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0b3871a9-339e-42e0-ba54-51f5ac1974b3-ewaproduct-com/assets/images/sport-site1-7.png',
    href: '/shop/healthy-eating',
  },
  {
    name: 'НАПИТКИ',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0b3871a9-339e-42e0-ba54-51f5ac1974b3-ewaproduct-com/assets/images/tea-site-8.png',
    href: '/shop/drinks',
  },
  {
    name: 'КРАСОТА И УХОД',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0b3871a9-339e-42e0-ba54-51f5ac1974b3-ewaproduct-com/assets/images/beauty-site-9.png',
    href: '/shop/beauty-and-care',
  },
  {
    name: 'ИДЕИ ПОДАРКОВ',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0b3871a9-339e-42e0-ba54-51f5ac1974b3-ewaproduct-com/assets/images/gift-default-site-10.png',
    href: '/shop/gift-ideas',
  },
  {
    name: 'ДОМ',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0b3871a9-339e-42e0-ba54-51f5ac1974b3-ewaproduct-com/assets/images/home-site-11.png',
    href: '/shop/home',
  },
  {
    name: 'АКСЕССУАРЫ',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0b3871a9-339e-42e0-ba54-51f5ac1974b3-ewaproduct-com/assets/images/access-site-12.png',
    href: '/shop/accessories',
  },
  {
    name: 'НАБОРЫ ДЛЯ АКТИВАЦИИ',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0b3871a9-339e-42e0-ba54-51f5ac1974b3-ewaproduct-com/assets/images/kit-site-13.png',
    href: '/shop/activation-kits',
  },
  {
    name: 'EXPERT COSMETICS',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0b3871a9-339e-42e0-ba54-51f5ac1974b3-ewaproduct-com/assets/images/expert-14.png',
    href: '/shop/expert-cosmetics',
  },
  {
    name: 'ВСЕ ПРОДУКТЫ',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0b3871a9-339e-42e0-ba54-51f5ac1974b3-ewaproduct-com/assets/images/hit-site-1.png',
    href: '/shop',
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-8 lg:py-12 px-4 lg:px-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 lg:mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-center sm:text-left">
            КАТЕГОРИИ
          </h1>
          <button className="flex items-center gap-2 px-4 lg:px-6 py-2.5 lg:py-3 border-2 border-gray-300 rounded-lg hover:border-[#E91E63] hover:text-[#E91E63] transition-all text-sm lg:text-base font-medium whitespace-nowrap">
            <Download size={18} className="lg:w-5 lg:h-5" />
            Скачать каталог
          </button>
        </div>

        {/* Search */}
        <div className="mb-8 lg:mb-12">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Искать товары"
              className="w-full px-4 py-3 lg:py-4 pl-12 lg:pl-14 pr-4 bg-white border-2 border-gray-200 rounded-full focus:border-[#E91E63] focus:outline-none transition-all text-sm lg:text-base"
            />
            <Search className="absolute left-4 lg:left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 lg:w-6 lg:h-6" />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={category.href}
              className="group bg-[#F5F5F5] rounded-xl p-4 lg:p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center"
            >
              <div className="relative w-full aspect-square mb-3 lg:mb-4">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="category-name text-center text-xs lg:text-sm leading-tight">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}