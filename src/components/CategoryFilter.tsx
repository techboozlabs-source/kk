import { Category } from '@/src/types';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

export function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          className={`rounded-full px-6 whitespace-nowrap transition-all duration-300 ${
            selectedCategory === category 
              ? "bg-green-600 hover:bg-green-700 text-white border-none shadow-md shadow-green-100" 
              : "border-gray-200 hover:border-green-300 hover:bg-green-50 text-gray-600"
          }`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
