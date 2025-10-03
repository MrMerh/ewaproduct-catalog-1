'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { PartnerModal } from '@/components/partner-modal';

export default function Footer() {
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);

  return (
    <>
      <footer className="bg-[#1A1A1A] text-white py-12">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
            {/* Left - Navigation Links */}
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Image 
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0b3871a9-339e-42e0-ba54-51f5ac1974b3-ewaproduct-com/assets/svgs/diamond-5.svg?" 
                  alt="" 
                  width={20} 
                  height={20}
                  className="brightness-0 invert"
                />
                EWA THREE YEARS
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/shop" className="footer-link hover:text-[#E91E63] transition-colors flex items-center gap-2">
                    <Image src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0b3871a9-339e-42e0-ba54-51f5ac1974b3-ewaproduct-com/assets/svgs/shop-icon-7.svg?" alt="" width={16} height={16} className="brightness-0 invert" />
                    Продукты
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="footer-link hover:text-[#E91E63] transition-colors flex items-center gap-2">
                    <Image src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0b3871a9-339e-42e0-ba54-51f5ac1974b3-ewaproduct-com/assets/svgs/about-icon-9.svg?" alt="" width={16} height={16} className="brightness-0 invert" />
                    О компании
                  </Link>
                </li>
                <li>
                  <Link href="/rewards" className="footer-link hover:text-[#E91E63] transition-colors flex items-center gap-2">
                    <Image src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0b3871a9-339e-42e0-ba54-51f5ac1974b3-ewaproduct-com/assets/svgs/wallet-8.svg?" alt="" width={16} height={16} className="brightness-0 invert" />
                    Система вознаграждения
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="footer-link hover:text-[#E91E63] transition-colors flex items-center gap-2">
                    <Image src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0b3871a9-339e-42e0-ba54-51f5ac1974b3-ewaproduct-com/assets/svgs/events-icon-14.svg?" alt="" width={16} height={16} className="brightness-0 invert" />
                    События
                  </Link>
                </li>
                <li>
                  <Link href="/contacts" className="footer-link hover:text-[#E91E63] transition-colors flex items-center gap-2">
                    <Image src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0b3871a9-339e-42e0-ba54-51f5ac1974b3-ewaproduct-com/assets/svgs/help-icon-15.svg?" alt="" width={16} height={16} className="brightness-0 invert" />
                    Контакты
                  </Link>
                </li>
                <li>
                  <Link href="/policies" className="footer-link hover:text-[#E91E63] transition-colors">
                    Политики и правила
                  </Link>
                </li>
              </ul>
            </div>

            {/* Center - Logo & Partner Button */}
            <div className="flex flex-col items-center justify-center">
              <div className="text-2xl font-bold tracking-wider mb-4">
                EWA PRODUCT
              </div>
              <button
                onClick={() => setIsPartnerModalOpen(true)}
                className="text-white hover:text-[#E91E63] transition-colors text-sm font-medium uppercase underline"
              >
                Стать партнером
              </button>
            </div>

            {/* Right - Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-4">Презентация бизнеса</h3>
              <div className="space-y-3 text-sm">
                <p className="phone-number text-2xl font-bold">8 (800) 100-73-00</p>
                <p className="text-gray-400">Время работы: Пн-Вс 10:00-22:00</p>
                <p>
                  <a href="mailto:office@ewaproduct.com" className="hover:text-[#E91E63] transition-colors">
                    office@ewaproduct.com
                  </a>
                </p>
              </div>
            </div>

            {/* Far Right - Apps & Certifications */}
            <div>
              <h3 className="text-lg font-bold mb-4">Мобильное приложение</h3>
              <div className="space-y-3 mb-6">
                <a href="#" className="block hover:opacity-80 transition-opacity">
                  <Image 
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0b3871a9-339e-42e0-ba54-51f5ac1974b3-ewaproduct-com/assets/svgs/app-store-18.svg?" 
                    alt="App Store" 
                    width={140} 
                    height={42}
                  />
                </a>
                <a href="#" className="block hover:opacity-80 transition-opacity">
                  <Image 
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0b3871a9-339e-42e0-ba54-51f5ac1974b3-ewaproduct-com/assets/svgs/google-play-19.svg?" 
                    alt="Google Play" 
                    width={140} 
                    height={42}
                  />
                </a>
              </div>
              
              <div className="flex gap-4 mb-6">
                <Image 
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0b3871a9-339e-42e0-ba54-51f5ac1974b3-ewaproduct-com/assets/svgs/gmp-16.svg?" 
                  alt="GMP" 
                  width={50} 
                  height={50}
                />
                <Image 
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0b3871a9-339e-42e0-ba54-51f5ac1974b3-ewaproduct-com/assets/svgs/ISO-17.svg?" 
                  alt="ISO" 
                  width={50} 
                  height={50}
                />
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
            <p>2022—2025 «EWA PRODUCT». Все права защищены.</p>
          </div>
        </div>
      </footer>

      <PartnerModal 
        open={isPartnerModalOpen} 
        onOpenChange={setIsPartnerModalOpen}
        language="RU"
      />
    </>
  );
}