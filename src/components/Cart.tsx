import { X, Plus, Minus, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { CartItem } from '@/src/types';
import { motion, AnimatePresence } from 'motion/react';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onClose: () => void;
}

export function Cart({ items, onUpdateQuantity, onRemove, onClose }: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 5.00 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-6 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <ShoppingCart className="text-green-600" size={24} />
          <h2 className="text-xl font-bold">Your Basket</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
          <X size={20} />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-6">
        <AnimatePresence mode="popLayout">
          {items.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-[400px] text-center"
            >
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="text-gray-300" size={40} />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Your basket is empty</h3>
              <p className="text-gray-500 max-w-[200px] mt-2">
                Looks like you haven't added any fresh items yet.
              </p>
              <Button 
                onClick={onClose}
                className="mt-6 bg-green-600 hover:bg-green-700 text-white rounded-full px-8"
              >
                Start Shopping
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex gap-4"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h4 className="font-semibold text-gray-900 leading-tight">{item.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">${item.price} / {item.unit}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1 border">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 rounded-md"
                          onClick={() => onUpdateQuantity(item.id, -1)}
                        >
                          <Minus size={14} />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 rounded-md"
                          onClick={() => onUpdateQuantity(item.id, 1)}
                        >
                          <Plus size={14} />
                        </Button>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-gray-400 hover:text-red-500"
                        onClick={() => onRemove(item.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </ScrollArea>

      {items.length > 0 && (
        <div className="p-6 border-t bg-gray-50/50">
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white h-14 rounded-2xl text-lg font-semibold shadow-lg shadow-green-100">
            Checkout Now
          </Button>
          <p className="text-center text-xs text-gray-400 mt-4">
            Free delivery on orders over $50
          </p>
        </div>
      )}
    </div>
  );
}
