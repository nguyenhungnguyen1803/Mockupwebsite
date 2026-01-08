import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  CreditCard, 
  Users,
  Menu,
  X 
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { 
      name: 'Dashboard', 
      path: '/admin', 
      icon: LayoutDashboard 
    },
    { 
      name: 'Products', 
      path: '/admin/products', 
      icon: Package 
    },
    { 
      name: 'Orders', 
      path: '/admin/orders', 
      icon: ShoppingCart 
    },
    { 
      name: 'Payments', 
      path: '/admin/payments', 
      icon: CreditCard 
    },
    { 
      name: 'Users', 
      path: '/admin/users', 
      icon: Users 
    }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md bg-white shadow-md"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside 
          className={`fixed md:static z-40 h-full bg-white shadow-md transition-all duration-300 transform ${
            sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-0 md:w-64 md:translate-x-0'
          }`}
        >
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center p-3 rounded-lg transition-colors ${
                        isActive(item.path)
                          ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="mr-3" size={20} />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-0' : 'ml-0'}`}>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;