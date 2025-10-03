"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Filter, Grid3x3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductCard } from "@/components/catalog/product-card";
import { ProductFilters } from "@/components/catalog/product-filters";

const products = [
  {
    id: 1,
    name: "Система обратного осмоса RO-3000",
    category: "Обратный осмос",
    price: "125,000 ₽",
    image: "/products/ro-system.jpg",
    description: "Промышленная установка обратного осмоса производительностью до 3 м³/ч",
  },
  {
    id: 2,
    name: "Фильтр для умягчения воды SF-2000",
    category: "Умягчители",
    price: "85,000 ₽",
    image: "/products/softener.jpg",
    description: "Автоматическая система умягчения воды для коттеджей и промышленности",
  },
  {
    id: 3,
    name: "Система обезжелезивания IF-1500",
    category: "Обезжелезиватели",
    price: "95,000 ₽",
    image: "/products/iron-filter.jpg",
    description: "Эффективное удаление железа и марганца из воды",
  },
  {
    id: 4,
    name: "УФ-стерилизатор UV-55W",
    category: "Ультрафиолет",
    price: "18,500 ₽",
    image: "/products/uv-sterilizer.jpg",
    description: "Ультрафиолетовый стерилизатор для обеззараживания воды",
  },
  {
    id: 5,
    name: "Картриджный фильтр CF-20",
    category: "Картриджные фильтры",
    price: "12,000 ₽",
    image: "/products/cartridge-filter.jpg",
    description: "Механическая очистка воды от взвешенных частиц",
  },
  {
    id: 6,
    name: "Дозирующий насос DP-10",
    category: "Дозаторы",
    price: "24,000 ₽",
    image: "/products/dosing-pump.jpg",
    description: "Автоматический насос-дозатор реагентов",
  },
  {
    id: 7,
    name: "Угольный фильтр ACF-1200",
    category: "Угольные фильтры",
    price: "45,000 ₽",
    image: "/products/carbon-filter.jpg",
    description: "Очистка от хлора, органических соединений и улучшение вкуса воды",
  },
  {
    id: 8,
    name: "Система аэрации AER-3000",
    category: "Аэраторы",
    price: "65,000 ₽",
    image: "/products/aerator.jpg",
    description: "Напорная аэрация для окисления железа и удаления сероводорода",
  },
  {
    id: 9,
    name: "Мембранный бак MT-300",
    category: "Баки",
    price: "15,500 ₽",
    image: "/products/membrane-tank.jpg",
    description: "Гидроаккумулятор 300 литров для систем водоснабжения",
  },
];

const categories = [
  "Все категории",
  "Обратный осмос",
  "Умягчители",
  "Обезжелезиватели",
  "Ультрафиолет",
  "Картриджные фильтры",
  "Дозаторы",
  "Угольные фильтры",
  "Аэраторы",
  "Баки",
];

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все категории");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popular");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "Все категории" ||
      product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold">EWA Product</h1>
              <nav className="hidden md:flex items-center gap-6">
                <a href="/" className="text-sm hover:text-primary">
                  Главная
                </a>
                <a
                  href="/catalog"
                  className="text-sm font-medium text-primary"
                >
                  Каталог
                </a>
                <a href="/about" className="text-sm hover:text-primary">
                  О компании
                </a>
                <a href="/services" className="text-sm hover:text-primary">
                  Услуги
                </a>
                <a href="/contacts" className="text-sm hover:text-primary">
                  Контакты
                </a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                +7 (495) 123-45-67
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Page Title */}
      <section className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Каталог оборудования</h1>
          <p className="text-muted-foreground max-w-2xl">
            Профессиональное оборудование для очистки и подготовки воды.
            Системы обратного осмоса, умягчители, обезжелезиватели и другое
            оборудование высокого качества.
          </p>
        </div>
      </section>

      {/* Catalog Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <ProductFilters
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Controls */}
            <div className="mb-6 space-y-4">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Поиск по каталогу..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" className="lg:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  Фильтры
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Сортировка" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">По популярности</SelectItem>
                      <SelectItem value="price-asc">
                        Цена: по возрастанию
                      </SelectItem>
                      <SelectItem value="price-desc">
                        Цена: по убыванию
                      </SelectItem>
                      <SelectItem value="name">По названию</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-muted-foreground">
                    Найдено товаров: {filteredProducts.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "flex flex-col gap-4"
              }
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={viewMode}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  По вашему запросу ничего не найдено
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-muted/30 mt-16 py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">О компании</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>О нас</li>
                <li>Новости</li>
                <li>Вакансии</li>
                <li>Контакты</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Покупателям</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Оплата</li>
                <li>Доставка</li>
                <li>Гарантия</li>
                <li>Возврат</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Услуги</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Проектирование</li>
                <li>Монтаж</li>
                <li>Сервис</li>
                <li>Консультация</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Контакты</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>+7 (495) 123-45-67</li>
                <li>info@ewaproduct.com</li>
                <li>Москва, ул. Примерная, д. 1</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2025 EWA Product. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}