import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useStore } from "../context/StoreContext";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export function ProductCard({ id, name, price, imageUrl }: ProductCardProps) {
  const { wishlist, addToWishlist, removeFromWishlist, addToCart } = useStore();
  const isWishlisted = wishlist.includes(id);

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(id);
      toast.success("Đã xóa khỏi danh sách yêu thích");
    } else {
      addToWishlist(id);
      toast.success("Đã thêm vào danh sách yêu thích");
    }
  };

  const handleAddToCart = () => {
    addToCart(id, 1);
    toast.success("Đã thêm vào giỏ hàng");
  };

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      {/* Image Container */}
      <Link to={`/products/${id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      
      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
      >
        <Heart
          className={`h-5 w-5 ${
            isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
          }`}
        />
      </button>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/products/${id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-green-600 transition-colors">
            {name}
          </h3>
        </Link>
        <div className="flex items-center justify-between gap-2">
          <p className="text-xl font-bold text-green-600">
            {price.toLocaleString('vi-VN')}đ
          </p>
          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Thêm
          </Button>
        </div>
      </div>
    </div>
  );
}