import React from 'react';
import { 
  ShoppingCart, 
  DollarSign, 
  Users, 
  AlertCircle,
  BarChart3
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminDashboard: React.FC = () => {
  // Mock data for statistics
  const stats = [
    {
      title: 'Total Orders',
      value: '1,248',
      icon: ShoppingCart,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Revenue',
      value: '$24,569',
      icon: DollarSign,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Total Users',
      value: '3,421',
      icon: Users,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Pending Orders',
      value: '42',
      icon: AlertCircle,
      color: 'bg-yellow-100 text-yellow-600',
    }
  ];

  // Mock data for the chart
  const chartData = [
    { month: 'Jan', orders: 120, revenue: 24000 },
    { month: 'Feb', orders: 190, revenue: 38000 },
    { month: 'Mar', orders: 150, revenue: 30000 },
    { month: 'Apr', orders: 180, revenue: 36000 },
    { month: 'May', orders: 220, revenue: 44000 },
    { month: 'Jun', orders: 130, revenue: 26000 },
    { month: 'Jul', orders: 160, revenue: 32000 },
    { month: 'Aug', orders: 140, revenue: 28000 },
    { month: 'Sep', orders: 170, revenue: 34000 },
    { month: 'Oct', orders: 200, revenue: 40000 },
    { month: 'Nov', orders: 180, revenue: 36000 },
    { month: 'Dec', orders: 210, revenue: 42000 }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <div className="flex items-center space-x-2 text-gray-600">
            <BarChart3 size={20} />
            <span>Last 30 days</span>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Orders & Revenue Overview</h2>
          <div className="h-80">
            {/* Dual bar chart visualization */}
            <div className="h-64 border-b border-l border-gray-200 pb-4 pl-4 relative">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-2">
                <span className="text-right">Max</span>
                <span className="text-right">75%</span>
                <span className="text-right">50%</span>
                <span className="text-right">25%</span>
                <span className="text-right">0</span>
              </div>
              
              <div className="flex h-64 items-end gap-1">
                {chartData.map((data, index) => {
                  // Normalize values for chart display
                  const maxOrders = Math.max(...chartData.map(d => d.orders));
                  const maxRevenue = Math.max(...chartData.map(d => d.revenue));
                  const orderHeight = (data.orders / maxOrders) * 100;
                  const revenueHeight = (data.revenue / maxRevenue) * 100;
                  
                  return (
                    <div key={index} className="flex flex-col items-center flex-1" style={{ minWidth: '30px' }}>
                      <div className="flex gap-1 w-full justify-center h-full relative">
                        {/* Orders bar */}
                        <div 
                          className="w-2 bg-blue-500 rounded-t hover:bg-blue-600 transition-colors absolute bottom-0"
                          style={{ height: `${orderHeight}%`, width: '8px' }}
                          title={`Orders: ${data.orders}`}
                        ></div>
                        {/* Revenue bar */}
                        <div 
                          className="w-2 bg-green-500 rounded-t hover:bg-green-600 transition-colors absolute bottom-0"
                          style={{ height: `${revenueHeight}%`, width: '8px', marginLeft: '10px' }}
                          title={`Revenue: $${data.revenue.toLocaleString()}`}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 -rotate-45 origin-left mt-4">
                        {data.month}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Legend */}
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-sm text-gray-600">Orders</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm text-gray-600">Revenue</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;