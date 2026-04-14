import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';

export function Hero() {
  return (
    <section className="relative py-12 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 text-sm font-semibold mb-6"
            >
              <Sparkles size={16} />
              <span>Freshness Guaranteed</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-6"
            >
              Fresh Groceries <br />
              <span className="text-green-600">Delivered</span> to Your <br />
              Doorstep.
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Shop from a wide range of organic fruits, fresh vegetables, dairy, and more. 
              Get the best quality products at your convenience.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
            >
              <Button className="bg-green-600 hover:bg-green-700 text-white h-14 px-8 rounded-2xl text-lg font-semibold shadow-xl shadow-green-100 group">
                Shop Now
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
              <Button variant="outline" className="h-14 px-8 rounded-2xl text-lg font-semibold border-gray-200">
                View Deals
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-12 flex items-center justify-center lg:justify-start gap-8"
            >
              <div>
                <p className="text-3xl font-bold text-gray-900">15k+</p>
                <p className="text-sm text-gray-500">Happy Customers</p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div>
                <p className="text-3xl font-bold text-gray-900">500+</p>
                <p className="text-sm text-gray-500">Fresh Products</p>
              </div>
            </motion.div>
          </div>

          <div className="flex-1 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <div className="relative w-full aspect-square max-w-[500px] mx-auto">
                <div className="absolute inset-0 bg-green-100 rounded-[60px] rotate-6" />
                <div className="absolute inset-0 bg-green-600 rounded-[60px] -rotate-3 overflow-hidden shadow-2xl">
                  <img
                    src="https://picsum.photos/seed/grocery-hero/800/800"
                    alt="Fresh Groceries"
                    className="w-full h-full object-cover opacity-90"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* Floating elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl z-20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Daily Deal</p>
                      <p className="text-sm font-bold text-gray-900">30% OFF</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl z-20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      <ArrowRight size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Fast Delivery</p>
                      <p className="text-sm font-bold text-gray-900">&lt; 30 Mins</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Background blobs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-green-50 rounded-full blur-3xl -z-10 opacity-50" />
          </div>
        </div>
      </div>
    </section>
  );
}
