'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ShoppingCart, ChevronDown } from 'lucide-react';
import { AuthModal } from '@/components/auth/auth-modal';
import { useSession } from '@/lib/hooks/use-session';

const logoUrl = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0b3871a9-339e-42e0-ba54-51f5ac1974b3-ewaproduct-com/assets/svgs/logo-black-3.svg?";
const flagUrl = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0b3871a9-339e-42e0-ba54-51f5ac1974b3-ewaproduct-com/assets/icons/ru-1.png?";
const cartIcon = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0b3871a9-339e-42e0-ba54-51f5ac1974b3-ewaproduct-com/assets/images/shopping-cart-icon.0754df43afb88e95-15.svg?";

export default function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const { data: session } = useSession();

  const openLoginModal = () => {
    setAuthTab('login');
    setIsAuthModalOpen(true);
  };

  return (
    <>
      <header className="bg-[#1A1A1A] text-white">
        <div className="container mx-auto px-4 lg:px-6">
          {/* Top Bar with Country Selector */}
          <div className="flex items-center justify-between py-2 border-b border-gray-700">
            <div className="flex items-center gap-2">
              <Image src={flagUrl} alt="Russia" width={24} height={16} className="rounded" />
              <span className="text-sm">Россия | RU</span>
            </div>
            <button className="flex items-center gap-1 text-sm hover:text-[#E91E63] transition-colors">
              Помощь
              <ChevronDown size={16} />
            </button>
          </div>

          {/* Main Navigation */}
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image 
                src={logoUrl} 
                alt="EWA PRODUCT" 
                width={140} 
                height={56} 
                className="brightness-0 invert"
                priority
              />
            </Link>

            {/* Navigation Menu */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/shop" className="navigation-link hover:text-[#E91E63] transition-colors">
                ИНТЕРНЕТ-МАГАЗИН
              </Link>
              <Link href="/about" className="navigation-link hover:text-[#E91E63] transition-colors">
                О КОМПАНИИ
              </Link>
              <Link href="/business" className="navigation-link hover:text-[#E91E63] transition-colors">
                БИЗНЕС
              </Link>
              <Link href="/events" className="navigation-link hover:text-[#E91E63] transition-colors">
                СОБЫТИЯ
              </Link>
              <Link href="/office" className="navigation-link hover:text-[#E91E63] transition-colors">
                ЛИЧНЫЙ ОФИС
              </Link>
              <Link href="/geography" className="navigation-link hover:text-[#E91E63] transition-colors">
                ГЕОГРАФИЯ
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Cart */}
              <Link href="/cart" className="relative hover:opacity-80 transition-opacity">
                <Image src={cartIcon} alt="Cart" width={28} height={28} className="brightness-0 invert" />
                <span className="absolute -top-2 -right-2 bg-[#E91E63] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  0
                </span>
              </Link>

              {/* Login/Profile */}
              {session ? (
                <Link
                  href="/profile"
                  className="px-6 py-2 bg-white text-[#1A1A1A] rounded font-semibold hover:bg-gray-200 transition-colors"
                >
                  {session.user?.name || 'ПРОФИЛЬ'}
                </Link>
              ) : (
                <button
                  onClick={openLoginModal}
                  className="px-6 py-2 bg-white text-[#1A1A1A] rounded font-semibold hover:bg-gray-200 transition-colors"
                >
                  ВОЙТИ
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal 
        open={isAuthModalOpen} 
        onOpenChange={setIsAuthModalOpen}
        defaultTab={authTab}
        language="RU"
      />
    </>
  );
}