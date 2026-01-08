import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Order } from '../data/mockData';

interface CartItem {
  productId: number;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  selectedOptions?: Record<string, string>;
}

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface StoreContextType {
  cart: CartItem[];
  wishlist: number[];
  user: User | null;
  orders: Order[];
  addToCart: (productId: number, quantity?: number, selectedSize?: string, selectedColor?: string, selectedOptions?: Record<string, string>) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (productId: number) => void;
  removeFromWishlist: (productId: number) => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (name: string, email: string, password: string) => boolean;
  placeOrder: (order: Order) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    const savedUser = localStorage.getItem('user');
    const savedOrders = localStorage.getItem('orders');

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (productId: number, quantity: number = 1, selectedSize?: string, selectedColor?: string, selectedOptions?: Record<string, string>) => {
    setCart(prev => {
      // Check for existing item with same product and variants
      const existing = prev.find(item => 
        item.productId === productId &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor &&
        JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
      );
      
      if (existing) {
        return prev.map(item =>
          item.productId === productId &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor &&
          JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prev, { 
        productId, 
        quantity,
        selectedSize,
        selectedColor,
        selectedOptions
      }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prev =>
        prev.map(item =>
          item.productId === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const addToWishlist = (productId: number) => {
    setWishlist(prev => {
      if (prev.includes(productId)) return prev;
      return [...prev, productId];
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist(prev => prev.filter(id => id !== productId));
  };

  const login = (email: string, password: string): boolean => {
    // Mock login - in real app would validate against backend
    if (email === 'admin@shop.com' && password === 'admin') {
      setUser({
        id: '1',
        name: 'Admin User',
        email: 'admin@shop.com',
        isAdmin: true
      });
      return true;
    } else if (email && password) {
      setUser({
        id: Math.random().toString(),
        name: email.split('@')[0],
        email,
        isAdmin: false
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const register = (name: string, email: string, password: string): boolean => {
    // Mock registration
    if (name && email && password) {
      setUser({
        id: Math.random().toString(),
        name,
        email,
        isAdmin: false
      });
      return true;
    }
    return false;
  };

  const placeOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    clearCart();
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        user,
        orders,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        login,
        logout,
        register,
        placeOrder
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
}
