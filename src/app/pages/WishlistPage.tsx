import React, { useState } from 'react';
import { Heart, ShoppingCart, Plus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useStore } from '../context/StoreContext';
import { products } from '../data/mockData';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: 'shirts' | 'pants' | 'accessories';
  imageUrl: string;
  stock: number;
}

const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist, addToCart } = useStore();
  
  // Get wishlist products by filtering the main products array
  const wishlistProducts = products.filter(product => wishlist.includes(product.id));

  const handleAddToCart = (productId: number) => {
    addToCart(productId, 1);
  };

  const handleRemoveFromWishlist = (productId: number) => {
    removeFromWishlist(productId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Wishlist</h1>
        
        {wishlistProducts.length === 0 ? (
          // Empty State
          <div className="text-center py-16">
            <div className="mx-auto mb-6">
              <Heart className="text-gray-300 mx-auto" size={80} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8">Add items you like to your wishlist to save them for later</p>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2" size={18} />
              Continue Shopping
            </Button>
          </div>
        ) : (
          // Product Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Heart Icon - Remove from wishlist */}
                  <button
                    onClick={() => handleRemoveFromWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                  >
                    <Heart className="text-red-500 fill-red-500" size={20} />
                  </button>
                </div>
                
                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-12">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <p className="text-xl font-bold text-green-600">
                      {product.price.toLocaleString('vi-VN')}đ
                    </p>
                    
                    <span className={`text-xs px-2 py-1 rounded ${
                      product.stock > 0 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => handleAddToCart(product.id)}
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;