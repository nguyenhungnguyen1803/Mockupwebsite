import React, { useState } from 'react';
import { 
  CreditCard, 
  CheckCircle,
  Search
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

// Mock data for payments
const initialPayments = [
  {
    orderId: '#ORD-001',
    method: 'Credit Card',
    status: 'Paid',
    date: '2023-05-15',
    amount: 149.97
  },
  {
    orderId: '#ORD-002',
    method: 'COD',
    status: 'Pending',
    date: '2023-05-16',
    amount: 89.99
  },
  {
    orderId: '#ORD-003',
    method: 'Internet Banking',
    status: 'Paid',
    date: '2023-05-16',
    amount: 249.95
  },
  {
    orderId: '#ORD-004',
    method: 'Credit Card',
    status: 'Paid',
    date: '2023-05-14',
    amount: 59.99
  },
  {
    orderId: '#ORD-005',
    method: 'COD',
    status: 'Paid',
    date: '2023-05-13',
    amount: 199.98
  },
  {
    orderId: '#ORD-006',
    method: 'Internet Banking',
    status: 'Refunded',
    date: '2023-05-12',
    amount: 79.99
  }
];

const PaymentManagement: React.FC = () => {
  const [payments, setPayments] = useState(initialPayments);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPayments = payments.filter(payment => 
    payment.orderId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleConfirmPayment = (orderId: string) => {
    setPayments(payments.map(payment => 
      payment.orderId === orderId ? { ...payment, status: 'Paid' } : payment
    ));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Payment Management</h1>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-center">
            <Search className="text-gray-400 ml-3" size={20} />
            <input
              type="text"
              placeholder="Search payments..."
              className="w-full py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Method
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.map((payment, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{payment.orderId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{payment.method}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        payment.status === 'Paid'
                          ? 'bg-green-100 text-green-800' 
                          : payment.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : payment.status === 'Refunded'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${payment.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {payment.status === 'Pending' && (
                        <button 
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center text-sm transition-colors"
                          onClick={() => handleConfirmPayment(payment.orderId)}
                        >
                          <CheckCircle size={16} className="mr-1" />
                          Confirm
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default PaymentManagement;