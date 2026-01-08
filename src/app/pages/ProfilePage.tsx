import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Package, 
  Lock, 
  Edit3, 
  Trash2, 
  Check, 
  Plus,
  ShoppingBag,
  ChevronRight
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Checkbox } from '../components/ui/checkbox';

// Define address type
interface Address {
  id: number;
  recipientName: string;
  phone: string;
  address: string;
  isDefault: boolean;
}

// Define user profile type
interface UserProfile {
  name: string;
  email: string;
}

// Define order types
interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  productImage: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  total: number;
  paymentMethod: 'cod' | 'bank_transfer';
  status: 'waiting' | 'confirmed' | 'shipping' | 'completed' | 'cancelled';
  shippingAddress: string;
  items: OrderItem[];
}

const ProfilePage: React.FC = () => {
  // User profile state
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com'
  });

  // Address state
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      recipientName: 'Nguyễn Văn A',
      phone: '0123456789',
      address: '123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh',
      isDefault: true
    },
    {
      id: 2,
      recipientName: 'Trần Thị B',
      phone: '0987654321',
      address: '456 Đường DEF, Phường UVW, Quận 2, TP. Hồ Chí Minh',
      isDefault: false
    },
    {
      id: 3,
      recipientName: 'Lê Văn C',
      phone: '0369852147',
      address: '789 Đường GHI, Phường RST, Quận 3, TP. Hồ Chí Minh',
      isDefault: false
    }
  ]);

  // State for edit profile modal
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editProfileData, setEditProfileData] = useState<UserProfile>(userProfile);

  // State for add/edit address modal
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);

  // Orders state
  const [orders] = useState<Order[]>([
    {
      id: 'ORD001',
      date: '2026-01-05',
      total: 1250000,
      paymentMethod: 'bank_transfer',
      status: 'completed',
      shippingAddress: '123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh',
      items: [
        {
          id: 1,
          productId: 1,
          productName: 'Áo Thun Premium Cotton',
          productImage: 'https://images.unsplash.com/photo-1759572095329-1dcf9522762b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          size: 'M',
          color: 'Black',
          quantity: 2,
          price: 299000
        },
        {
          id: 2,
          productId: 3,
          productName: 'Giày Sneakers Thể Thao',
          productImage: 'https://images.unsplash.com/photo-1656944227480-98180d2a5155?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          size: '40',
          color: 'White',
          quantity: 1,
          price: 850000
        }
      ]
    },
    {
      id: 'ORD002',
      date: '2026-01-03',
      total: 599000,
      paymentMethod: 'cod',
      status: 'shipping',
      shippingAddress: '123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh',
      items: [
        {
          id: 3,
          productId: 2,
          productName: 'Quần Jeans Slim Fit',
          productImage: 'https://images.unsplash.com/photo-1714729382668-7bc3bb261662?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          size: 'L',
          color: 'Blue',
          quantity: 1,
          price: 599000
        }
      ]
    },
    {
      id: 'ORD003',
      date: '2026-01-07',
      total: 399000,
      paymentMethod: 'bank_transfer',
      status: 'waiting',
      shippingAddress: '123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh',
      items: [
        {
          id: 4,
          productId: 6,
          productName: 'Áo Hoodie Basic',
          productImage: 'https://images.unsplash.com/photo-1759572095329-1dcf9522762b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          size: 'M',
          color: 'Gray',
          quantity: 1,
          price: 399000
        }
      ]
    }
  ]);

  // Navigation state
  const [activeNav, setActiveNav] = useState('profile');

  // State for order details modal
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Handle profile edit
  const handleEditProfile = () => {
    setEditProfileData(userProfile);
    setIsEditingProfile(true);
  };

  const saveProfile = () => {
    setUserProfile(editProfileData);
    setIsEditingProfile(false);
  };

  // Handle address operations
  const handleSetDefault = (id: number) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const handleEditAddress = (address: Address) => {
    setCurrentAddress(address);
    setIsEditingAddress(true);
    setIsAddingAddress(false);
  };

  const handleDeleteAddress = (id: number) => {
    if (addresses.length <= 1) {
      alert('Bạn cần có ít nhất một địa chỉ');
      return;
    }
    
    const updatedAddresses = addresses.filter(addr => addr.id !== id);
    
    // If the deleted address was the default, set the first remaining address as default
    if (addresses.find(addr => addr.id === id)?.isDefault && updatedAddresses.length > 0) {
      updatedAddresses[0].isDefault = true;
    }
    
    setAddresses(updatedAddresses);
  };

  const handleAddAddress = () => {
    setCurrentAddress({
      id: Date.now(), // Simple ID generation
      recipientName: '',
      phone: '',
      address: '',
      isDefault: addresses.length === 0 // First address is default
    });
    setIsAddingAddress(true);
    setIsEditingAddress(false);
  };

  const saveAddress = () => {
    if (!currentAddress) return;

    if (isAddingAddress) {
      // If setting as default, update all other addresses
      if (currentAddress.isDefault) {
        setAddresses(addresses.map(addr => ({ ...addr, isDefault: false })));
      } else if (addresses.length === 0) {
        // If this is the first address, make it default
        currentAddress.isDefault = true;
      }
      setAddresses([...addresses, currentAddress]);
    } else if (isEditingAddress && currentAddress) {
      // If changing to default, update all other addresses
      if (currentAddress.isDefault) {
        setAddresses(addresses.map(addr => ({
          ...addr,
          isDefault: addr.id === currentAddress.id
        })));
      } else {
        setAddresses(addresses.map(addr => 
          addr.id === currentAddress.id ? currentAddress : addr
        ));
      }
    }
    
    setIsAddingAddress(false);
    setIsEditingAddress(false);
    setCurrentAddress(null);
  };

  // Navigation items
  const navItems = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'addresses', label: 'My Addresses', icon: MapPin },
    { id: 'password', label: 'Change Password', icon: Lock }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Profile Menu */}
          <div className="lg:col-span-1">
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="bg-gray-200 border-2 border-dashed rounded-full w-24 h-24 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold">{userProfile.name}</h3>
                  <p className="text-gray-600">{userProfile.email}</p>
                </div>
                
                <nav className="space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                          activeNav === item.id
                            ? 'bg-green-100 text-green-700 border-l-4 border-green-600'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                        onClick={() => setActiveNav(item.id)}
                      >
                        <Icon className="mr-3" size={20} />
                        <span>{item.label}</span>
                        <ChevronRight className="ml-auto" size={16} />
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Content - Profile Details */}
          <div className="lg:col-span-3">
            {activeNav === 'profile' && (
              <>
                {/* Personal Information Section */}
                <Card className="shadow-sm mb-8">
                  <CardHeader>
                    <CardTitle className="text-xl">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>Full Name</Label>
                        <div className="mt-1 p-3 bg-gray-50 rounded-md">{userProfile.name}</div>
                      </div>
                      
                      <div>
                        <Label>Email</Label>
                        <div className="mt-1 p-3 bg-gray-50 rounded-md">{userProfile.email}</div>
                      </div>
                      
                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          className="flex items-center"
                          onClick={handleEditProfile}
                        >
                          <Edit3 className="mr-2" size={18} />
                          Edit Profile
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
            
            {activeNav === 'addresses' && (
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl">My Addresses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Address List */}
                    {addresses.map((address) => (
                      <div 
                        key={address.id} 
                        className={`p-4 rounded-lg border ${
                          address.isDefault 
                            ? 'border-green-500 bg-green-50 shadow-sm' 
                            : 'border-gray-200'
                        }`}
                      >
                        {address.isDefault && (
                          <div className="flex justify-end mb-2">
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                              Default Address
                            </span>
                          </div>
                        )}
                        
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-semibold">{address.recipientName}</h4>
                            <p className="text-gray-600">{address.phone}</p>
                            <p className="text-gray-700 mt-1">{address.address}</p>
                          </div>
                          
                          <div className="flex flex-col space-y-2">
                            {!address.isDefault && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center"
                                onClick={() => handleSetDefault(address.id)}
                              >
                                <Check className="mr-1" size={16} />
                                Set as Default
                              </Button>
                            )}
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditAddress(address)}
                              >
                                <Edit3 size={16} />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteAddress(address.id)}
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Add New Address Button */}
                    <div className="pt-4">
                      <Button 
                        variant="default" 
                        className="flex items-center"
                        onClick={handleAddAddress}
                      >
                        <Plus className="mr-2" size={18} />
                        Add New Address
                      </Button>
                    </div>
                    
                    {/* Checkout Integration Hint */}
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-start">
                        <ShoppingBag className="text-blue-500 mt-1 mr-3" size={20} />
                        <div>
                          <h4 className="font-medium text-blue-800">Checkout Information</h4>
                          <p className="text-blue-700 text-sm mt-1">
                            Your default address will be automatically selected during checkout.
                            <a href="/checkout" className="text-blue-600 hover:underline ml-1">Go to checkout</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {activeNav === 'orders' && (
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl">My Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  {orders.length > 0 ? (
                    <div className="space-y-6">
                      {orders.map((order) => {
                        // Get status display and color
                        const statusInfo = {
                          waiting: { text: 'Waiting for Admin Confirmation', color: 'bg-yellow-100 text-yellow-800' },
                          confirmed: { text: 'Confirmed', color: 'bg-blue-100 text-blue-800' },
                          shipping: { text: 'Shipping', color: 'bg-purple-100 text-purple-800' },
                          completed: { text: 'Completed', color: 'bg-green-100 text-green-800' },
                          cancelled: { text: 'Cancelled', color: 'bg-red-100 text-red-800' },
                        }[order.status];
                        
                        return (
                          <div key={order.id} className="p-6 border rounded-lg">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="font-semibold text-lg">Order ID: {order.id}</h3>
                                <p className="text-gray-600">{order.date}</p>
                              </div>
                              <div className="flex items-center space-x-4">
                                <div>
                                  <p className="text-gray-600 text-sm">Total</p>
                                  <p className="font-semibold">{order.total.toLocaleString('vi-VN')}₫</p>
                                </div>
                                <div>
                                  <p className="text-gray-600 text-sm">Payment</p>
                                  <p className="font-semibold">
                                    {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Internet Banking'}
                                  </p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
                                  {statusInfo.text}
                                </span>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setSelectedOrder(order)}
                                >
                                  View Details
                                </Button>
                              </div>
                            </div>
                            
                            {/* Order items preview */}
                            <div className="flex flex-wrap gap-2">
                              {order.items.slice(0, 3).map((item, index) => (
                                <div key={item.id} className="flex items-center space-x-2 bg-gray-50 p-2 rounded">
                                  <img 
                                    src={item.productImage} 
                                    alt={item.productName}
                                    className="w-10 h-10 object-cover rounded"
                                  />
                                  <div>
                                    <p className="text-sm font-medium">{item.productName}</p>
                                    <p className="text-xs text-gray-600">{item.size}, {item.color}</p>
                                  </div>
                                </div>
                              ))}
                              {order.items.length > 3 && (
                                <div className="flex items-center justify-center bg-gray-100 w-10 h-10 rounded">
                                  <span className="text-xs">+{order.items.length - 3}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Package className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">You have not placed any orders yet</h3>
                      <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
                      <Button>
                        Start Shopping
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
            
            {activeNav === 'password' && (
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Change Password</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" placeholder="Enter current password" />
                    </div>
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" placeholder="Enter new password" />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                    </div>
                    <div className="pt-4">
                      <Button>Change Password</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      
      {/* Edit Profile Modal */}
      <Dialog open={isEditingProfile} onOpenChange={setIsEditingProfile}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="editName">Full Name</Label>
              <Input
                id="editName"
                value={editProfileData.name}
                onChange={(e) => setEditProfileData({...editProfileData, name: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="editEmail">Email</Label>
              <Input
                id="editEmail"
                type="email"
                value={editProfileData.email}
                onChange={(e) => setEditProfileData({...editProfileData, email: e.target.value})}
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button 
              variant="outline" 
              onClick={() => setIsEditingProfile(false)}
            >
              Cancel
            </Button>
            <Button onClick={saveProfile}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Add/Edit Address Modal */}
      <Dialog 
        open={isAddingAddress || isEditingAddress} 
        onOpenChange={() => {
          setIsAddingAddress(false);
          setIsEditingAddress(false);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isAddingAddress ? 'Add New Address' : 'Edit Address'}
            </DialogTitle>
          </DialogHeader>
          
          {currentAddress && (
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="recipientName">Recipient Name</Label>
                <Input
                  id="recipientName"
                  value={currentAddress.recipientName}
                  onChange={(e) => setCurrentAddress({...currentAddress, recipientName: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={currentAddress.phone}
                  onChange={(e) => setCurrentAddress({...currentAddress, phone: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={currentAddress.address}
                  onChange={(e) => setCurrentAddress({...currentAddress, address: e.target.value})}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="setDefault"
                  checked={currentAddress.isDefault}
                  onCheckedChange={(checked) => setCurrentAddress({...currentAddress, isDefault: Boolean(checked)})}
                />
                <Label htmlFor="setDefault">Set as default address</Label>
              </div>
            </div>
          )}
          
          <div className="flex justify-end space-x-3">
            <Button 
              variant="outline" 
              onClick={() => {
                setIsAddingAddress(false);
                setIsEditingAddress(false);
              }}
            >
              Cancel
            </Button>
            <Button onClick={saveAddress}>
              Save Address
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Order Details Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="py-4 space-y-6">
              {/* Order Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Order Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Order ID:</span> {selectedOrder.id}</p>
                    <p><span className="font-medium">Date:</span> {selectedOrder.date}</p>
                    <p><span className="font-medium">Payment Method:</span> 
                      {selectedOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Internet Banking'}</p>
                    <p><span className="font-medium">Total:</span> {selectedOrder.total.toLocaleString('vi-VN')}₫</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">Shipping Address</h3>
                  <p className="text-sm">{selectedOrder.shippingAddress}</p>
                </div>
              </div>
              
              {/* Status */}
              <div>
                <h3 className="font-semibold text-lg mb-2">Order Status</h3>
                <div className="flex flex-wrap gap-4">
                  {(['waiting', 'confirmed', 'shipping', 'completed'] as const).map((status) => {
                    const statusInfo = {
                      waiting: { text: 'Waiting for Admin Confirmation', color: 'bg-yellow-100 text-yellow-800' },
                      confirmed: { text: 'Confirmed', color: 'bg-blue-100 text-blue-800' },
                      shipping: { text: 'Shipping', color: 'bg-purple-100 text-purple-800' },
                      completed: { text: 'Completed', color: 'bg-green-100 text-green-800' },
                    }[status];
                    
                    const isCurrent = selectedOrder.status === status;
                    const isPast = (() => {
                      const statusOrder = ['waiting', 'confirmed', 'shipping', 'completed'];
                      return statusOrder.indexOf(selectedOrder.status) > statusOrder.indexOf(status);
                    })();
                    
                    return (
                      <div key={status} className="flex items-center">
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${isCurrent ? statusInfo.color : isPast ? 'bg-gray-100 text-gray-800' : 'bg-gray-100 text-gray-400'}`}>
                          {statusInfo.text}
                        </div>
                        {status !== 'completed' && <span className="mx-2 text-gray-300">&gt;</span>}
                      </div>
                    );
                  })}
                </div>
                
                {selectedOrder.status === 'waiting' && (
                  <div className="mt-3 text-sm text-yellow-600">
                    Your order is being reviewed by admin
                  </div>
                )}
              </div>
              
              {/* Order Items */}
              <div>
                <h3 className="font-semibold text-lg mb-2">Items Ordered</h3>
                <div className="space-y-4">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <img 
                        src={item.productImage} 
                        alt={item.productName}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.productName}</h4>
                        <p className="text-sm text-gray-600">Size: {item.size}, Color: {item.color}</p>
                        <p className="text-sm">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{item.price.toLocaleString('vi-VN')}₫</p>
                        <p className="text-sm text-gray-600">{item.quantity} × {item.price.toLocaleString('vi-VN')}₫</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfilePage;