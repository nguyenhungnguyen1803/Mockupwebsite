import React, { useState } from 'react';
import { Heart, Star, ShoppingCart, Minus, Plus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useStore } from '../context/StoreContext';
import { products } from '../data/mockData';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  shortDescription?: string;
  category: 'shirts' | 'pants' | 'accessories' | 'shoes' | 'dresses';
  imageUrl: string;
  galleryImages?: string[];
  stock: number;
  minStockLevel?: number;
  brand?: string;
  sku?: string;
  slug?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  weight?: number;
  dimensions?: string;
  salePrice?: number;
  sizes?: string[];
  colors?: string[];
  materials?: string[];
  variants?: any[];
}

interface Review {
  id: number;
  productId: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

const ProductDetailPage: React.FC = () => {
  // Mock product data (in a real app, this would come from route params)
  const product: Product = products[0]; // Using first product as example
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  
  // Mock reviews data
  const reviews: Review[] = [
    {
      id: 1,
      productId: product.id,
      userName: 'Nguyễn Văn A',
      rating: 5,
      comment: 'Sản phẩm rất tốt, chất lượng vải mềm mại và thoáng mát. Rất hài lòng!',
      date: '2026-01-05'
    },
    {
      id: 2,
      productId: product.id,
      userName: 'Trần Thị B',
      rating: 4,
      comment: 'Áo đẹp, giá hợp lý. Mình sẽ mua thêm.',
      date: '2026-01-03'
    }
  ];

  const { addToCart, addToWishlist, wishlist } = useStore();
  const isInWishlist = wishlist.includes(product.id);

  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  // Handle adding to cart
  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Vui lòng chọn kích thước và màu sắc');
      return;
    }
    addToCart(product.id, quantity, selectedSize || undefined, selectedColor || undefined, {});
  };

  // Handle adding to wishlist
  const handleAddToWishlist = () => {
    if (isInWishlist) {
      // Remove from wishlist if already in wishlist
    } else {
      addToWishlist(product.id);
    }
  };

  // Handle quantity changes
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Available sizes based on product category
  const availableSizes = product.category === 'accessories' 
    ? ['One Size', 'Small', 'Medium', 'Large'] 
    : ['S', 'M', 'L', 'XL', 'XXL'];

  // Available colors (mock data)
  const availableColors = [
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Red', value: '#EF4444' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <a href="/" className="hover:underline">Home</a> / 
          <a href="/products" className="hover:underline"> Products</a> / 
          <span> {product.name}</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Product Gallery */}
          <div>
            {/* Main Image */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-4">
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm p-2 cursor-pointer hover:shadow-md transition-shadow">
                  <img 
                    src={product.imageUrl} 
                    alt={`Product view ${index}`}
                    className="w-full h-24 object-cover rounded"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column - Product Information */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            {/* Price Section */}
            <div className="flex items-center mb-4">
              <span className="text-3xl font-bold text-green-600">
                {product.price.toLocaleString('vi-VN')}đ
              </span>
              {/* Uncomment if there's a sale price */}
              {/* <span className="ml-4 text-xl text-gray-500 line-through">
                {(product.price * 1.2).toLocaleString('vi-VN')}đ
              </span> */}
            </div>
            
            {/* Short Description */}
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 border rounded-lg ${
                      selectedSize === size
                        ? 'bg-green-600 text-white border-green-600'
                        : 'border-gray-300 hover:border-green-500'
                    }`}
                    onClick={() => setSelectedSize(size)}
                    disabled={product.stock === 0}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Color</h3>
              <div className="flex flex-wrap gap-3">
                {availableColors.map((color) => (
                  <button
                    key={color.name}
                    className={`w-10 h-10 rounded-full border-2 ${
                      selectedColor === color.name
                        ? 'border-gray-800'
                        : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => setSelectedColor(color.name)}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
            
            {/* Quantity Selector */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center">
                <button 
                  className="p-2 border border-gray-300 rounded-l-lg bg-gray-100 hover:bg-gray-200"
                  onClick={decreaseQuantity}
                >
                  <Minus size={18} />
                </button>
                <div className="px-6 py-2 border-y border-gray-300 bg-white">
                  {quantity}
                </div>
                <button 
                  className="p-2 border border-gray-300 rounded-r-lg bg-gray-100 hover:bg-gray-200"
                  onClick={increaseQuantity}
                  disabled={quantity >= product.stock}
                >
                  <Plus size={18} />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {product.stock > 0 ? `Còn ${product.stock} sản phẩm` : 'Hết hàng'}
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Button 
                className="flex-1 min-w-[200px] bg-green-600 hover:bg-green-700"
                onClick={handleAddToCart}
                disabled={!selectedSize || !selectedColor || product.stock === 0}
              >
                <ShoppingCart className="mr-2" size={18} />
                Add to Cart
              </Button>
              
              <Button 
                variant="outline"
                className="p-4 border-gray-300"
                onClick={handleAddToWishlist}
              >
                <Heart 
                  className={isInWishlist ? 'text-red-500 fill-red-500' : 'text-gray-600'} 
                  size={20} 
                />
              </Button>
            </div>
            
            {/* Validation Message */}
            {(!selectedSize || !selectedColor) && (
              <p className="text-red-500 text-sm mb-6">
                Vui lòng chọn kích thước và màu sắc
              </p>
            )}
            
            {/* Reviews Preview */}
            <div className="flex items-center mb-8">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`${i < Math.floor(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} mr-1`} 
                    size={18} 
                  />
                ))}
              </div>
              <span className="text-gray-700">
                {averageRating.toFixed(1)} ({reviews.length} reviews)
              </span>
            </div>
            
            {/* Additional Information Tabs */}
            <div className="border-b border-gray-200 mb-8">
              <div className="flex">
                {['description', 'material', 'size', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    className={`py-3 px-4 font-medium text-sm ${
                      activeTab === tab
                        ? 'border-b-2 border-green-600 text-green-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === 'description' && 'Description'}
                    {tab === 'material' && 'Material & Care'}
                    {tab === 'size' && 'Size Guide'}
                    {tab === 'reviews' && 'Reviews'}
                  </button>
                ))}
              </div>
              
              <div className="py-6">
                {activeTab === 'description' && (
                  <div>
                    <p className="text-gray-700 mb-4">
                      {product.description}
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                      <li>Chất liệu: 100% cotton cao cấp</li>
                      <li>Thiết kế hiện đại, phù hợp với nhiều hoàn cảnh</li>
                      <li>Đường may tỉ mỉ, chất lượng cao</li>
                      <li>Dễ phối đồ, thoải mái khi mặc</li>
                    </ul>
                  </div>
                )}
                
                {activeTab === 'material' && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Chất liệu & Bảo quản</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                      <li>Chất liệu: 100% cotton cao cấp, mềm mại, thoáng mát</li>
                      <li>Không phai màu sau nhiều lần giặt</li>
                      <li>Không co rút sau giặt</li>
                      <li>Hướng dẫn bảo quản: Giặt máy ở nhiệt độ thường, không dùng chất tẩy mạnh</li>
                    </ul>
                  </div>
                )}
                
                {activeTab === 'size' && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Hướng dẫn chọn size</h4>
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chest (cm)</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Length (cm)</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-2 text-sm text-gray-900">S</td>
                          <td className="px-4 py-2 text-sm text-gray-900">90-95</td>
                          <td className="px-4 py-2 text-sm text-gray-900">65</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm text-gray-900">M</td>
                          <td className="px-4 py-2 text-sm text-gray-900">95-100</td>
                          <td className="px-4 py-2 text-sm text-gray-900">67</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm text-gray-900">L</td>
                          <td className="px-4 py-2 text-sm text-gray-900">100-105</td>
                          <td className="px-4 py-2 text-sm text-gray-900">69</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm text-gray-900">XL</td>
                          <td className="px-4 py-2 text-sm text-gray-900">105-110</td>
                          <td className="px-4 py-2 text-sm text-gray-900">71</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
                
                {activeTab === 'reviews' && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Customer Reviews</h4>
                    {reviews.length > 0 ? (
                      <div className="space-y-6">
                        {reviews.map((review) => (
                          <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                            <div className="flex items-center mb-2">
                              <div className="flex mr-2">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} mr-1`} 
                                    size={16} 
                                  />
                                ))}
                              </div>
                              <span className="font-medium">{review.userName}</span>
                              <span className="text-gray-500 text-sm ml-4">{review.date}</span>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600">Chưa có đánh giá nào cho sản phẩm này</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;