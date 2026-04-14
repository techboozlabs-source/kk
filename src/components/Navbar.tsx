import { ShoppingCart, Search, Menu, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { CartItem } from '@/src/types';

interface NavbarProps {
  cartCount: number;
  onCartOpen: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Navbar({ cartCount, onCartOpen, searchQuery, onSearchChange }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-200">
            <Leaf size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900 hidden sm:block">
            Grocery<span className="text-green-600">Things</span>
          </span>
        </div>

        <div className="flex-1 max-w-md relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search fresh groceries..."
            className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search size={20} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative"
            onClick={onCartOpen}
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <Badge 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-green-600 hover:bg-green-700"
              >
                {cartCount}
              </Badge>
            )}
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                <Button variant="ghost" className="justify-start">Categories</Button>
                <Button variant="ghost" className="justify-start">Special Offers</Button>
                <Button variant="ghost" className="justify-start">My Orders</Button>
                <Button variant="ghost" className="justify-start">Settings</Button>
              </div>
            </SheetContent>
          </Sheet>

          <Button className="hidden sm:flex bg-green-600 hover:bg-green-700 text-white rounded-full px-6">
            Sign In
          </Button>
        </div>
      </div>
    </nav>
  );
}
