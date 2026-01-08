import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { products } from '../data/mockData';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const CheckoutPage: React.FC = () => {
  const { cart, clearCart } = useStore();
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    phoneNumber: '',
    address: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'internetBanking'>('cod');
  const [transferNote, setTransferNote] = useState('');
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  
  const navigate = useNavigate();

  // Get cart items from store context
  const cartItems = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return {
      id: item.productId,
      name: product?.name || '',
      price: product?.price || 0,
      quantity: item.quantity,
      image: product?.imageUrl || 'https://via.placeholder.com/80x80'
    };
  });

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingFee = 30000;
  const total = subtotal + shippingFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === 'internetBanking' && !paymentCompleted) {
      alert('Vui lòng hoàn tất thanh toán trước khi đặt hàng.');
      return;
    }
    
    // In a real application, you would send the order data to your backend
    console.log('Order placed:', { shippingInfo, paymentMethod, transferNote, cartItems, total });
    
    // Clear the cart after successful order
    clearCart();
    
    // Navigate to order confirmation page
    navigate('/orders');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Checkout Form */}
          <div className="space-y-6">
            {/* Shipping Information Section */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Shipping Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={shippingInfo.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      value={shippingInfo.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Shipping Address
                    </label>
                    <Input
                      id="address"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleInputChange}
                      placeholder="Enter your shipping address"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Payment Method Section */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="cod"
                      name="paymentMethod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="cod" className="ml-3 block text-sm font-medium text-gray-700">
                      Thanh Toán Khi Nhận Hàng (COD)
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="internetBanking"
                      name="paymentMethod"
                      checked={paymentMethod === 'internetBanking'}
                      onChange={() => setPaymentMethod('internetBanking')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="internetBanking" className="ml-3 block text-sm font-medium text-gray-700">
                      Chuyển Khoản Ngân Hàng (QR)
                    </label>
                  </div>
                  
                  {paymentMethod === 'internetBanking' && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex flex-col items-center">
                        <div className="mb-4 p-4 bg-white rounded-lg shadow-inner">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-48 h-48 flex items-center justify-center text-gray-500">
                            QR Code
                          </div>
                        </div>
                        
                        <div className="text-center mb-4">
                          <p className="font-medium">Thông Tin Tài Khoản Ngân Hàng</p>
                          <p className="text-sm text-gray-600">Tên Tài Khoản: Công Ty TNHH ABC Fashion</p>
                          <p className="text-sm text-gray-600">Số Tài Khoản: 1234567890123</p>
                          <p className="text-sm text-gray-600">Ngân Hàng: Vietcombank</p>
                        </div>
                        
                        <p className="text-center text-sm text-gray-600 mb-4">
                          Quét mã QR để thực hiện chuyển khoản
                        </p>
                        
                        <div className="w-full max-w-md">
                          <label htmlFor="transferNote" className="block text-sm font-medium text-gray-700 mb-1">
                            Ghi Chú Chuyển Khoản (tùy chọn)
                          </label>
                          <Input
                            id="transferNote"
                            value={transferNote}
                            onChange={(e) => setTransferNote(e.target.value)}
                            placeholder="Nhập số tham chiếu chuyển khoản"
                          />
                        </div>
                        
                        <Button 
                          className="mt-4 w-full max-w-xs"
                          variant="default"
                          onClick={() => setPaymentCompleted(true)}
                        >
                          Tôi đã hoàn tất chuyển khoản
                        </Button>
                        
                        {paymentCompleted && (
                          <p className="mt-2 text-green-600 text-sm">
                            Thanh toán đã được xác nhận! Bạn có thể đặt hàng ngay bây giờ.
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Order Summary */}
          <div>
            <Card className="shadow-sm sticky top-8">
              <CardHeader>
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Order Items */}
                  <div className="divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <div key={item.id} className="py-4 flex items-center">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover rounded-md mr-4"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{(item.price * item.quantity).toLocaleString('vi-VN')} ₫</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Cost Breakdown */}
                  <div className="pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tạm tính</span>
                      <span className="text-gray-900">{subtotal.toLocaleString('vi-VN')} ₫</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phí vận chuyển</span>
                      <span className="text-gray-900">{shippingFee.toLocaleString('vi-VN')} ₫</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200">
                      <span className="text-lg font-semibold text-gray-900">Total</span>
                      <span className="text-lg font-semibold text-gray-900">{total.toLocaleString('vi-VN')} ₫</span>
                    </div>
                  </div>
                  
                  {/* Place Order Button */}
                  <Button 
                    className="w-full mt-6 py-6 text-base"
                    variant="default"
                    onClick={handlePlaceOrder}
                    disabled={paymentMethod === 'internetBanking' && !paymentCompleted}
                  >
                    Đặt Hàng
                  </Button>
                  
                  {(paymentMethod === 'internetBanking' && !paymentCompleted) && (
                    <p className="text-center text-sm text-red-600 mt-2">
                      Vui lòng hoàn tất thanh toán để kích hoạt đặt hàng.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;