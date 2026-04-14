import { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { CategoryFilter } from './components/CategoryFilter';
import { Cart } from './components/Cart';
import { products } from './data';
import { Product, CartItem, Category } from './types';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'motion/react';

const CATEGORIES: Category[] = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Meat', 'Pantry'];

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter((item) => item.quantity > 0);
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-green-100 selection:text-green-900">
      <Navbar 
        cartCount={cartCount} 
        onCartOpen={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main>
        <Hero />

        <section className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Products</h2>
              <p className="text-gray-500">Fresh and organic groceries just for you.</p>
            </div>
            <CategoryFilter 
              categories={CATEGORIES}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          <AnimatePresence mode="wait">
            {filteredProducts.length > 0 ? (
              <motion.div 
                key={selectedCategory + searchQuery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6"
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    quantityInCart={cartItems.find(item => item.id === product.id)?.quantity || 0}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-4xl">🔍</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">No products found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your search or category filter.</p>
                <Button 
                  variant="link" 
                  className="text-green-600 mt-4"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                >
                  Clear all filters
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Features Section */}
        <section className="bg-white py-20 border-y">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6">
                  <span className="text-2xl">🚚</span>
                </div>
                <h4 className="text-xl font-bold mb-2">Free Delivery</h4>
                <p className="text-gray-500">On all orders over $50. Fast and reliable delivery to your door.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6">
                  <span className="text-2xl">🌱</span>
                </div>
                <h4 className="text-xl font-bold mb-2">100% Organic</h4>
                <p className="text-gray-500">We source directly from local farms to ensure the highest quality.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6">
                  <span className="text-2xl">💳</span>
                </div>
                <h4 className="text-xl font-bold mb-2">Secure Payment</h4>
                <p className="text-gray-500">Multiple payment options with 100% secure checkout process.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white">
                  <span className="text-lg font-bold">G</span>
                </div>
                <span className="text-xl font-bold tracking-tight">
                  Grocery<span className="text-green-500">Things</span>
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your one-stop shop for fresh, organic, and high-quality groceries. 
                Delivering health and happiness to your home.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-6">Quick Links</h5>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="#" className="hover:text-green-500 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">Shop All</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">Special Offers</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6">Support</h5>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="#" className="hover:text-green-500 transition-colors">Shipping Policy</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">Returns & Refunds</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-green-500 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6">Newsletter</h5>
              <p className="text-sm text-gray-400 mb-4">Subscribe to get special offers and fresh updates.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-gray-800 border-none rounded-lg px-4 py-2 text-sm flex-1 focus:ring-1 focus:ring-green-500 outline-none"
                />
                <Button className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2">
                  Join
                </Button>
              </div>
            </div>
          </div>
          <Separator className="bg-gray-800 mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© 2026 Grocery Things. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">Facebook</a>
            </div>
          </div>
        </div>
      </footer>

      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="p-0 sm:max-w-md">
          <Cart 
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemove={handleRemoveFromCart}
            onClose={() => setIsCartOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
