import Header from '@/components/sections/header';
import CategoriesSection from '@/components/sections/categories-section';
import Footer from '@/components/sections/footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <CategoriesSection />
      </main>
      <Footer />
    </div>
  );
}