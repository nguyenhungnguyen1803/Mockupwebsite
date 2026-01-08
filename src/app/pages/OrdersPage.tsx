import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { products } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

// Define order type
interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  shippingInfo: {
    name: string;
    phone: string;
    address: string;
  };
  paymentMethod: 'cod' | 'internetBanking';
}

const OrdersPage: React.FC = () => {
  const { cart } = useStore();
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-001',
      date: '2023-05-15',
      total: 927000,
      status: 'delivered',
      items: [
        { productId: 1, quantity: 2, price: 299000 },
        { productId: 2, quantity: 1, price: 599000 }
      ],
      shippingInfo: {
        name: 'Nguyễn Văn A',
        phone: '0123456789',
        address: '123 Đường ABC, Quận XYZ, TP. HCM'
      },
      paymentMethod: 'cod'
    },
    {
      id: 'ORD-002',
      date: '2023-06-20',
      total: 699000,
      status: 'shipped',
      items: [
        { productId: 6, quantity: 1, price: 399000 },
        { productId: 3, quantity: 1, price: 250000 }
      ],
      shippingInfo: {
        name: 'Trần Thị B',
        phone: '0987654321',
        address: '456 Đường XYZ, Quận ABC, TP. HCM'
      },
      paymentMethod: 'internetBanking'
    },
    {
      id: 'ORD-003',
      date: '2023-07-10',
      total: 1200000,
      status: 'processing',
      items: [
        { productId: 5, quantity: 1, price: 1200000 }
      ],
      shippingInfo: {
        name: 'Lê Văn C',
        phone: '0369852147',
        address: '789 Đường DEF, Quận GHI, TP. HCM'
      },
      paymentMethod: 'cod'
    }
  ]);

  // Get product details for order items
  const getOrderItemDetails = (items: OrderItem[]) => {
    return items.map(item => {
      const product = products.find(p => p.id === item.productId);
      return {
        ...item,
        name: product?.name || '',
        image: product?.imageUrl || 'https://via.placeholder.com/80x80'
      };
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Đơn Hàng Của Tôi</h1>
        
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Bạn chưa có đơn hàng nào</h2>
            <p className="text-gray-600 mb-6">Các đơn hàng bạn đặt sẽ hiển thị ở đây</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const orderItems = getOrderItemDetails(order.items);
              
              return (
                <Card key={order.id} className="shadow-sm">
                  <CardHeader className="border-b">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">Đơn hàng #{order.id}</h3>
                        <p className="text-gray-600">Ngày đặt: {new Date(order.date).toLocaleDateString('vi-VN')}</p>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <Badge 
                          className={`${
                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {order.status === 'delivered' ? 'Đã giao' :
                           order.status === 'shipped' ? 'Đã giao hàng' :
                           order.status === 'processing' ? 'Đang xử lý' :
                           order.status === 'cancelled' ? 'Đã hủy' : 'Chờ xử lý'}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Order Items */}
                      <div className="lg:col-span-2">
                        <h4 className="font-semibold text-lg mb-4">Sản phẩm</h4>
                        <div className="space-y-4">
                          {orderItems.map((item) => (
                            <div key={item.productId} className="flex items-center py-3 border-b border-gray-100 last:border-0">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-16 h-16 object-cover rounded-md mr-4"
                              />
                              <div className="flex-1">
                                <h5 className="font-medium">{item.name}</h5>
                                <p className="text-gray-600">Số lượng: {item.quantity}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Order Summary */}
                      <div>
                        <h4 className="font-semibold text-lg mb-4">Thông tin đơn hàng</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Tạm tính:</span>
                            <span>{order.total.toLocaleString('vi-VN')}đ</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Phí vận chuyển:</span>
                            <span>30,000đ</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-gray-200">
                            <span className="font-semibold">Tổng cộng:</span>
                            <span className="font-semibold text-green-600">{order.total.toLocaleString('vi-VN')}đ</span>
                          </div>
                          
                          <div className="mt-6 pt-4 border-t border-gray-200">
                            <h5 className="font-semibold mb-2">Thông tin giao hàng</h5>
                            <p className="text-gray-700">{order.shippingInfo.name}</p>
                            <p className="text-gray-700">{order.shippingInfo.phone}</p>
                            <p className="text-gray-700">{order.shippingInfo.address}</p>
                          </div>
                          
                          <div className="mt-4">
                            <p className="text-gray-700">
                              <span className="font-medium">Phương thức thanh toán:</span> {order.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng' : 'Chuyển khoản ngân hàng'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;