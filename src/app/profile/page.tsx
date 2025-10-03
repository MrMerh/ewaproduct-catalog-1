'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, User, Mail, Phone, LogOut, ShoppingBag, Clock } from 'lucide-react';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';
import { useSession } from '@/lib/hooks/use-session';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';

// Mock order data (will be replaced with real data later)
const mockOrders = [
  {
    id: 'ORD-001',
    date: '2025-01-15',
    status: 'Доставлен',
    total: 4500,
    items: [
      { name: 'BRAINSTORM (морошка)', quantity: 2, price: 1500 },
      { name: 'FIRE SLIM', quantity: 1, price: 1500 },
    ],
  },
  {
    id: 'ORD-002',
    date: '2025-01-10',
    status: 'В пути',
    total: 2800,
    items: [
      { name: 'DETOX EASY', quantity: 1, price: 1400 },
      { name: 'NIGHT COLLAGEN', quantity: 1, price: 1400 },
    ],
  },
  {
    id: 'ORD-003',
    date: '2025-01-05',
    status: 'Доставлен',
    total: 1800,
    items: [
      { name: 'EWA TEA GREEN', quantity: 3, price: 600 },
    ],
  },
];

export default function ProfilePage() {
  const { data: session, isPending, refetch } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push('/login?redirect=/profile');
    }
  }, [session, isPending, router]);

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();
    if (error?.code) {
      toast.error('Ошибка при выходе');
    } else {
      localStorage.removeItem('bearer_token');
      refetch();
      router.push('/');
      toast.success('Вы успешно вышли из системы');
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E91E63] mx-auto mb-4"></div>
            <p className="text-gray-600">Загрузка...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Доставлен':
        return 'bg-green-100 text-green-800';
      case 'В пути':
        return 'bg-blue-100 text-blue-800';
      case 'Обработка':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 lg:py-12 px-4 lg:px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold uppercase text-[#1A1A1A] mb-2">
              Личный кабинет
            </h1>
            <p className="text-gray-600">Управляйте своим профилем и заказами</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Profile Info Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border-2 border-gray-100 p-6 lg:p-8">
                <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#E91E63] to-[#C2185B] rounded-full mx-auto mb-6">
                  <User size={40} className="text-white" />
                </div>
                
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-[#1A1A1A] mb-2">
                    {session.user.name}
                  </h2>
                  <p className="text-sm text-gray-500">Участник с января 2025</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail size={20} className="text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 mb-1">Email</p>
                      <p className="text-sm font-medium text-[#1A1A1A] break-all">
                        {session.user.email}
                      </p>
                    </div>
                  </div>

                  {session.user.phone && (
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <Phone size={20} className="text-gray-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-1">Телефон</p>
                        <p className="text-sm font-medium text-[#1A1A1A]">
                          {session.user.phone}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-700 font-medium hover:border-[#E91E63] hover:text-[#E91E63] transition-all"
                >
                  <LogOut size={18} />
                  Выйти из аккаунта
                </button>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 bg-white rounded-xl border-2 border-gray-100 p-6">
                <h3 className="font-bold text-[#1A1A1A] mb-4">Статистика</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Всего заказов</span>
                    <span className="text-lg font-bold text-[#E91E63]">{mockOrders.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">На сумму</span>
                    <span className="text-lg font-bold text-[#E91E63]">
                      {mockOrders.reduce((sum, order) => sum + order.total, 0).toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Orders History */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border-2 border-gray-100 p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Package size={24} className="text-[#E91E63]" />
                  <h2 className="text-2xl font-bold text-[#1A1A1A]">История заказов</h2>
                </div>

                {mockOrders.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag size={48} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">У вас пока нет заказов</p>
                    <Link
                      href="/shop"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#E91E63] to-[#C2185B] text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all"
                    >
                      Начать покупки
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {mockOrders.map((order) => (
                      <div
                        key={order.id}
                        className="border-2 border-gray-100 rounded-xl p-4 lg:p-6 hover:border-[#E91E63] transition-all"
                      >
                        {/* Order Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-gray-100">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#E91E63] to-[#C2185B] rounded-lg flex items-center justify-center flex-shrink-0">
                              <Package size={20} className="text-white" />
                            </div>
                            <div>
                              <p className="font-bold text-[#1A1A1A]">Заказ {order.id}</p>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Clock size={12} />
                                <span>{new Date(order.date).toLocaleDateString('ru-RU')}</span>
                              </div>
                            </div>
                          </div>
                          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-2 mb-4">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                              <div className="flex-1">
                                <span className="text-gray-700">{item.name}</span>
                                <span className="text-gray-400 ml-2">× {item.quantity}</span>
                              </div>
                              <span className="font-medium text-[#1A1A1A]">
                                {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Order Total */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <span className="font-semibold text-[#1A1A1A]">Итого:</span>
                          <span className="text-xl font-bold text-[#E91E63]">
                            {order.total.toLocaleString('ru-RU')} ₽
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}