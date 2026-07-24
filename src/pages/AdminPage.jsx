import { useState } from "react";
import { useAllOrders, useUpdateOrderStatus } from "../hooks/useOrders";
import { formatPrice } from "../utils/format";

export default function AdminPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  
  const { data: orders = [], isLoading, isError } = useAllOrders({
    status: statusFilter,
    search: search.trim()
  });

  const { mutate: updateStatus } = useUpdateOrderStatus();

  const totalRevenue = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + (o.total_amount || 0), 0);

  return (
    <div className="admin-page p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage orders and view store performance</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-right">
          <p className="text-sm text-green-800 font-medium uppercase tracking-wide">Total Revenue (Filtered)</p>
          <p className="text-2xl font-bold text-green-900">{formatPrice(totalRevenue)}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Filters bar */}
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex gap-4 items-center flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search by order ID, name, or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-red-800"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase font-medium text-xs">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Item</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    <span className="inline-block w-6 h-6 border-2 border-gray-300 border-t-red-800 rounded-full animate-spin mb-2"></span>
                    <p>Loading orders...</p>
                  </td>
                </tr>
              )}
              
              {isError && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-red-600">
                    Failed to load orders. Please try again.
                  </td>
                </tr>
              )}

              {!isLoading && !isError && orders.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    No orders found matching your filters.
                  </td>
                </tr>
              )}

              {!isLoading && !isError && orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {order.order_id}
                    <div className="text-xs text-gray-500 font-normal mt-1">
                      {new Date(order.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{order.customer_name}</div>
                    <div className="text-gray-500 text-xs mt-1">{order.customer_phone}</div>
                    <div className="text-gray-500 text-xs truncate max-w-[150px]" title={order.address}>
                      {order.city}, {order.state}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-900 line-clamp-2 max-w-[200px]" title={order.product_name}>
                      {order.product_name}
                    </div>
                    {order.selected_size && (
                      <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">
                        Size: {order.selected_size}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {formatPrice(order.total_amount)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                      ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'confirmed' ? 'bg-purple-100 text-purple-800' :
                        'bg-yellow-100 text-yellow-800'}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus({ id: order.id, status: e.target.value })}
                      className="text-sm border border-gray-300 rounded-md px-2 py-1 bg-white outline-none focus:ring-1 focus:ring-red-800"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
