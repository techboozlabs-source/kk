import { Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/src/types';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  quantityInCart: number;
  key?: string | number;
}

export function ProductCard({ product, onAddToCart, quantityInCart }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white group">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <Badge className="absolute top-3 left-3 bg-white/90 text-green-700 hover:bg-white border-none shadow-sm">
            {product.category}
          </Badge>
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
          </div>
          <p className="text-sm text-gray-500 line-clamp-2 h-10 mb-3">
            {product.description}
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-green-700">${product.price}</span>
            <span className="text-xs text-gray-400">/ {product.unit}</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button 
            onClick={() => onAddToCart(product)}
            className="w-full bg-gray-900 hover:bg-green-600 text-white transition-colors gap-2 rounded-xl h-11"
          >
            <ShoppingBag size={18} />
            {quantityInCart > 0 ? `Add More (${quantityInCart})` : 'Add to Cart'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
