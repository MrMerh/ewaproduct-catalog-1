"use client";

import Image from "next/image";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
  viewMode: "grid" | "list";
}

export function ProductCard({ product, viewMode }: ProductCardProps) {
  if (viewMode === "list") {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="flex">
          <div className="relative w-64 h-48 flex-shrink-0 bg-muted">
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              <ShoppingCart className="h-12 w-12" />
            </div>
          </div>
          <CardContent className="flex-1 p-6">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <Badge variant="secondary" className="mb-2">
                  {product.category}
                </Badge>
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {product.description}
                </p>
              </div>
              <Button variant="ghost" size="icon" className="ml-4">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div>
                <p className="text-2xl font-bold">{product.price}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Подробнее</Button>
                <Button>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  В корзину
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="relative h-64 bg-muted">
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
          <ShoppingCart className="h-16 w-16" />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/90 hover:bg-white"
        >
          <Heart className="h-4 w-4" />
        </Button>
        <Badge className="absolute bottom-2 left-2">{product.category}</Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <p className="text-2xl font-bold">{product.price}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button variant="outline" className="flex-1">
          Подробнее
        </Button>
        <Button className="flex-1">
          <ShoppingCart className="h-4 w-4 mr-2" />
          В корзину
        </Button>
      </CardFooter>
    </Card>
  );
}