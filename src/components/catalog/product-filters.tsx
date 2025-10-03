"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

interface ProductFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
}: ProductFiltersProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Категории</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedCategory} onValueChange={onCategoryChange}>
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value={category} id={category} />
                <Label htmlFor={category} className="cursor-pointer">
                  {category}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Цена, ₽</CardTitle>
        </CardHeader>
        <CardContent>
          <Slider
            defaultValue={[0, 150000]}
            max={150000}
            step={1000}
            className="mb-4"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>0 ₽</span>
            <span>150,000 ₽</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Производитель</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="brand1" />
              <Label htmlFor="brand1" className="cursor-pointer">
                EWS
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="brand2" />
              <Label htmlFor="brand2" className="cursor-pointer">
                Clack
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="brand3" />
              <Label htmlFor="brand3" className="cursor-pointer">
                Pentair
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="brand4" />
              <Label htmlFor="brand4" className="cursor-pointer">
                Vontron
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Наличие</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="instock" />
              <Label htmlFor="instock" className="cursor-pointer">
                В наличии
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="preorder" />
              <Label htmlFor="preorder" className="cursor-pointer">
                Под заказ
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}