import React, { useState } from 'react';
import { 
  Package, 
  Eye, 
  CheckCircle, 
  Clock, 
  Truck, 
  Check, 
  X, 
  Plus,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { products } from '../data/mockData';

// Define order types
interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'pending' | 'waiting' | 'confirmed' | 'shipping' | 'completed' | 'cancelled';
  items: OrderItem[];
  shippingInfo: {
    name: string;
    phone: string;
    address: string;
  };
  paymentMethod: 'cod' | 'internetBanking';
  paymentCompleted: boolean;
}

const MyOrdersPage: React.FC = () => {
  // Mock orders data
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-001',
      date: '2023-05-15',
      total: 927000,
      status: 'completed',
      items: [
        { productId: 1, quantity: 2, price: 299000 },
        { productId: 2, quantity: 1, price: 599000 }
      ],
      shippingInfo: {
        name: 'Nguyễn Văn A',
        phone: '0123456789',
        address: '123 Đường ABC, Quận XYZ, TP. HCM'
      },
      paymentMethod: 'cod',
      paymentCompleted: true
    },
    {
      id: 'ORD-002',
      date: '2023-06-20',
      total: 699000,
      status: 'shipping',
      items: [
        { productId: 6, quantity: 1, price: 399000 },
        { productId: 3, quantity: 1, price: 250000 }
      ],
      shippingInfo: {
        name: 'Trần Thị B',
        phone: '0987654321',
        address: '456 Đường XYZ, Quận ABC, TP. HCM'
      },
      paymentMethod: 'internetBanking',
      paymentCompleted: true
    },
    {
      id: 'ORD-003',
      date: '2023-07-10',
      total: 1200000,
      status: 'waiting',
      items: [
        { productId: 5, quantity: 1, price: 1200000 }
      ],
      shippingInfo: {
        name: 'Lê Văn C',
        phone: '0369852147',
        address: '789 Đường DEF, Quận GHI, TP. HCM'
      },
      paymentMethod: 'internetBanking',
      paymentCompleted: false
    },
    {
      id: 'ORD-004',
      date: '2023-08-05',
      total: 450000,
      status: 'pending',
      items: [
        { productId: 4, quantity: 1, price: 450000 }
      ],
      shippingInfo: {
        name: 'Phạm Thị D',
        phone: '0852147963',
        address: '321 Đường JKL, Quận MNO, TP. HCM'
      },
      paymentMethod: 'internetBanking',
      paymentCompleted: false
    }
  ]);

  // State for expanded order details
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  // Function to get status badge color
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'shipping':
        return 'bg-blue-100 text-blue-800';
      case 'confirmed':
        return 'bg-purple-100 text-purple-800';
      case 'waiting':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to get status display text
  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'shipping':
        return 'Shipping';
      case 'confirmed':
        return 'Confirmed';
      case 'waiting':
        return 'Waiting for Admin Approval';
      case 'cancelled':
        return 'Cancelled';
      case 'pending':
        return 'Pending Payment Confirmation';
      default:
        return status;
    }
  };

  // Function to get status icon
  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" size={16} />;
      case 'shipping':
        return <Truck className="text-blue-500" size={16} />;
      case 'confirmed':
        return <Check className="text-purple-500" size={16} />;
      case 'waiting':
        return <Clock className="text-yellow-500" size={16} />;
      case 'cancelled':
        return <X className="text-red-500" size={16} />;
      case 'pending':
        return <Clock className="text-gray-500" size={16} />;
      default:
        return <Clock className="text-gray-500" size={16} />;
    }
  };

  // Function to toggle order details
  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  // Function to mark payment as completed
  const markPaymentCompleted = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, paymentCompleted: true, status: 'waiting' } : order
    ));
  };

  // Get product details for order items
  const getProductDetails = (productId: number) => {
    return products.find(p => p.id === productId) || {
      id: 0,
      name: 'Unknown Product',
      price: 0,
      description: '',
      category: 'shirts',
      imageUrl: 'https://via.placeholder.com/80x80',
      stock: 0
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Orders</h1>
        
        {orders.length === 0 ? (
          // Empty State
          <div className="text-center py-16">
            <div className="mx-auto mb-6">
              <Package className="text-gray-300 mx-auto" size={80} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">You have no orders yet</h2>
            <p className="text-gray-500 mb-8">Your orders will appear here after checkout</p>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2" size={18} />
              Start Shopping
            </Button>
          </div>
        ) : (
          // Orders List
          <div className="space-y-6">
            {orders.map((order) => {
              const isExpanded = expandedOrderId === order.id;
              const canMarkPayment = order.paymentMethod === 'internetBanking' && 
                                    !order.paymentCompleted && 
                                    (order.status === 'pending' || order.status === 'waiting');
              
              return (
                <Card key={order.id} className="shadow-sm">
                  <CardHeader 
                    className="cursor-pointer p-6 border-b"
                    onClick={() => toggleOrderDetails(order.id)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="text-xl font-semibold mr-3">Order #{order.id}</h3>
                          <div className="flex items-center">
                            {getStatusIcon(order.status)}
                            <Badge className={`ml-2 ${getStatusColor(order.status)}`}>
                              {getStatusText(order.status)}
                            </Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Date:</span> {new Date(order.date).toLocaleDateString('vi-VN')}
                          </div>
                          <div>
                            <span className="font-medium">Total:</span> {order.total.toLocaleString('vi-VN')}đ
                          </div>
                          <div>
                            <span className="font-medium">Payment:</span> {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Internet Banking'}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 flex items-center">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex items-center mr-3"
                        >
                          <Eye className="mr-1" size={16} />
                          View Details
                        </Button>
                        {isExpanded ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  
                  {isExpanded && (
                    <CardContent className="p-6">
                      {/* Order Items */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-lg mb-4">Order Items</h4>
                        <div className="space-y-4">
                          {order.items.map((item) => {
                            const product = getProductDetails(item.productId);
                            return (
                              <div key={item.productId} className="flex items-center py-3 border-b border-gray-100 last:border-0">
                                <img 
                                  src={product.imageUrl} 
                                  alt={product.name} 
                                  className="w-16 h-16 object-cover rounded-md mr-4"
                                />
                                <div className="flex-1">
                                  <h5 className="font-medium">{product.name}</h5>
                                  <p className="text-gray-600">Qty: {item.quantity}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      {/* Shipping Information */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-lg mb-4">Shipping Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-gray-700"><span className="font-medium">Name:</span> {order.shippingInfo.name}</p>
                            <p className="text-gray-700"><span className="font-medium">Phone:</span> {order.shippingInfo.phone}</p>
                          </div>
                          <div>
                            <p className="text-gray-700"><span className="font-medium">Address:</span> {order.shippingInfo.address}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Payment Information */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-lg mb-4">Payment Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-gray-700"><span className="font-medium">Method:</span> {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Internet Banking'}</p>
                            <p className="text-gray-700"><span className="font-medium">Status:</span> {order.paymentCompleted ? 'Completed' : 'Pending'}</p>
                          </div>
                          <div>
                            <p className="text-gray-700"><span className="font-medium">Total:</span> {order.total.toLocaleString('vi-VN')}đ</p>
                            <p className="text-gray-700"><span className="font-medium">Date:</span> {new Date(order.date).toLocaleDateString('vi-VN')}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Order Status Timeline */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-lg mb-4">Order Status</h4>
                        <div className="flex flex-wrap gap-4">
                          <div className={`flex items-center ${order.status === 'pending' || order.status === 'waiting' || order.status === 'confirmed' || order.status === 'shipping' || order.status === 'completed' ? 'text-green-600' : 'text-gray-400'}`}>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${order.status === 'pending' || order.status === 'waiting' || order.status === 'confirmed' || order.status === 'shipping' || order.status === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}>
                              1
                            </div>
                            <span className="ml-2">Order Placed</span>
                          </div>
                          <div className={`flex items-center ${order.status === 'waiting' || order.status === 'confirmed' || order.status === 'shipping' || order.status === 'completed' ? 'text-green-600' : 'text-gray-400'}`}>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${order.status === 'waiting' || order.status === 'confirmed' || order.status === 'shipping' || order.status === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}>
                              2
                            </div>
                            <span className="ml-2">Payment Confirmed</span>
                          </div>
                          <div className={`flex items-center ${order.status === 'confirmed' || order.status === 'shipping' || order.status === 'completed' ? 'text-green-600' : 'text-gray-400'}`}>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${order.status === 'confirmed' || order.status === 'shipping' || order.status === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}>
                              3
                            </div>
                            <span className="ml-2">Order Confirmed</span>
                          </div>
                          <div className={`flex items-center ${order.status === 'shipping' || order.status === 'completed' ? 'text-green-600' : 'text-gray-400'}`}>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${order.status === 'shipping' || order.status === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}>
                              4
                            </div>
                            <span className="ml-2">Shipping</span>
                          </div>
                          <div className={`flex items-center ${order.status === 'completed' ? 'text-green-600' : 'text-gray-400'}`}>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${order.status === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}>
                              5
                            </div>
                            <span className="ml-2">Delivered</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3">
                        {canMarkPayment && (
                          <Button 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              markPaymentCompleted(order.id);
                            }}
                          >
                            I have completed the transfer
                          </Button>
                        )}
                        <Button variant="outline">Contact Support</Button>
                        {order.status === 'cancelled' && (
                          <Button>Reorder</Button>
                        )}
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;