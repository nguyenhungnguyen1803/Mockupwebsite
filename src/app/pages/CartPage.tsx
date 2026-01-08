import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { products } from "../data/mockData";
import { Button } from "../components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";

export function CartPage() {
  const { cart, updateCartQuantity, removeFromCart } = useStore();

  const cartItems = cart.map(item => ({
    ...item,
    product: products.find(p => p.id === item.productId)!
  }));

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = 30000;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Giỏ hàng trống</h2>
          <p className="text-gray-600 mb-6">Hãy thêm sản phẩm vào giỏ hàng của bạn</p>
          <Link to="/products">
            <Button className="bg-green-600 hover:bg-green-700">
              Tiếp tục mua sắm
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Giỏ Hàng</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.productId} className="bg-white p-4 rounded-lg shadow flex gap-4">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded"
                />
                
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.product.name}</h3>
                  <p className="text-green-600 font-bold">
                    {item.product.price.toLocaleString('vi-VN')}đ
                  </p>
                  
                  {/* Display selected variants */}
                  <div className="text-sm text-gray-600 mt-1">
                    {item.selectedSize && (
                      <p>Size: {item.selectedSize}</p>
                    )}
                    {item.selectedColor && (
                      <p>Color: {item.selectedColor}</p>
                    )}
                    {item.selectedOptions && Object.keys(item.selectedOptions).map(key => (
                      <p key={key}>{key}: {item.selectedOptions![key]}</p>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center">{item.quantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col justify-between items-end">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeFromCart(item.productId)}
                  >
                    <Trash2 className="h-5 w-5 text-red-500" />
                  </Button>
                  <p className="font-bold text-lg">
                    {(item.product.price * item.quantity).toLocaleString('vi-VN')}đ
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow sticky top-24">
              <h3 className="font-bold text-xl mb-4">Tóm Tắt Đơn Hàng</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Tạm tính:</span>
                  <span>{subtotal.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển:</span>
                  <span>{shipping.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Tổng cộng:</span>
                    <span className="text-green-600">{total.toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>
              </div>

              <Link to="/checkout">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Tiến hành thanh toán
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
