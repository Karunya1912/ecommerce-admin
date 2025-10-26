import { useEffect, useState } from 'react';
import { Box, H3, H5, Text, Loader } from '@adminjs/design-system';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard-stats', {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setStats(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Box variant="grey" padding="xxl" style={{ textAlign: 'center' }}>
        <Loader />
      </Box>
    );
  }

  if (error) {
    return (
      <Box padding="xxl" style={{ textAlign: 'center' }}>
        <H3 style={{ color: '#EF4444' }}>Error Loading Dashboard</H3>
        <Text>{error}</Text>
        <Text style={{ marginTop: '16px', color: '#666' }}>
          Please make sure you are logged in and try refreshing the page.
        </Text>
      </Box>
    );
  }

  if (!stats) {
    return (
      <Box padding="xxl" style={{ textAlign: 'center' }}>
        <Text>No data available</Text>
      </Box>
    );
  }

  const StatCard = ({ title, value, subtitle, icon }) => (
    <Box
      style={{
        background: '#FFFFFF',
        borderRadius: '8px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #E5E7EB',
        minHeight: '140px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.2s ease',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Text style={{ color: '#6B7280', fontSize: '14px', marginBottom: '8px', fontWeight: '500' }}>
            {title}
          </Text>
          <H3 style={{ color: '#111827', fontSize: '32px', margin: '0', marginBottom: '8px', fontWeight: '700' }}>
            {value}
          </H3>
          {subtitle && (
            <Text style={{ color: '#4F46E5', fontSize: '12px', fontWeight: '500' }}>
              {subtitle}
            </Text>
          )}
        </div>
        <div style={{
          fontSize: '28px',
          background: '#EEF2FF',
          borderRadius: '8px',
          padding: '10px',
          width: '52px',
          height: '52px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          overflow: 'hidden',
          lineHeight: '1'
        }}>{icon}</div>
      </div>
    </Box>
  );

  const getStatusColor = (status) => {
    const colors = {
      pending: '#B45309',
      processing: '#1D4ED8',
      shipped: '#312E81',
      delivered: '#15803D',
      cancelled: '#B91C1C'
    };
    return colors[status] || '#4B5563';
  };

  const getStatusBgColor = (status) => {
    const colors = {
      pending: '#FFFBEB',
      processing: '#EFF6FF',
      shipped: '#EEF2FF',
      delivered: '#F0FDF4',
      cancelled: '#FEF2F2'
    };
    return colors[status] || '#F3F4F6';
  };

  const getPaymentStatusColor = (status) => {
    return status === 'paid' ? '#15803D' : '#B45309';
  };

  const getPaymentBgColor = (status) => {
    return status === 'paid' ? '#F0FDF4' : '#FFFBEB';
  };

  return (
    <Box padding="xxl" style={{ background: '#F9FAFB', minHeight: '100vh' }}>
      <Box marginBottom="xl">
        <H3 style={{ fontSize: '28px', marginBottom: '8px', color: '#111827', fontWeight: '700' }}>Dashboard Overview</H3>
        <Text style={{ color: '#6B7280', fontSize: '15px' }}>Welcome back, Admin User! Here's your store performance summary.</Text>
      </Box>

      {/* Stats Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          marginBottom: '32px'
        }}
      >
        <StatCard
          title="Total Orders"
          value={stats?.totalOrders || 0}
          subtitle={stats?.pendingOrders > 0 ? `${stats.pendingOrders} pending` : 'All orders processed'}
          icon="🛒"
        />
        <StatCard
          title="Total Products"
          value={stats?.totalProducts || 0}
          subtitle={`${stats?.activeProducts || 0} active`}
          icon="📦"
        />
        <StatCard
          title="Total Customers"
          value={stats?.totalUsers || 0}
          subtitle="Registered users"
          icon="👥"
        />
      </div>

      {/* Recent Orders Table */}
      {stats?.recentOrders && stats.recentOrders.length > 0 && (
        <Box
          style={{
            background: '#FFFFFF',
            borderRadius: '8px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            marginBottom: '32px',
            border: '1px solid #E5E7EB'
          }}
        >
          <H5 style={{ marginBottom: '16px', color: '#111827', fontWeight: '600' }}>Recent Orders</H5>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #E5E7EB', background: '#F9FAFB' }}>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#6B7280', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Order #</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#6B7280', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Customer</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#6B7280', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Amount</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#6B7280', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#6B7280', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Payment</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#6B7280', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order) => (
                  <tr key={order.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                    <td style={{ padding: '12px' }}>
                      <a
                        href={`/admin/resources/Order/records/${order.id}/show`}
                        style={{ color: '#4F46E5', textDecoration: 'none', fontWeight: '600' }}
                      >
                        {order.orderNumber}
                      </a>
                    </td>
                    <td style={{ padding: '12px', color: '#111827', fontWeight: '500' }}>{order.user?.name || 'N/A'}</td>
                    <td style={{ padding: '12px', fontWeight: '600', color: '#111827' }}>${parseFloat(order.totalAmount || 0).toFixed(2)}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600',
                        background: getStatusBgColor(order.status),
                        color: getStatusColor(order.status),
                        textTransform: 'capitalize'
                      }}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600',
                        background: getPaymentBgColor(order.paymentStatus),
                        color: getPaymentStatusColor(order.paymentStatus),
                        textTransform: 'capitalize'
                      }}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td style={{ padding: '12px', color: '#6B7280' }}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Box>
      )}

      {/* Low Stock Alert */}
      {stats?.lowStockProducts && stats.lowStockProducts.length > 0 && (
        <Box
          style={{
            background: '#FFFBEB',
            borderRadius: '8px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            marginBottom: '32px',
            border: '1px solid #F59E0B'
          }}
        >
          <H5 style={{ marginBottom: '16px', color: '#B45309', fontWeight: '600' }}>⚠️ Low Stock Alert</H5>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #FDE68A', background: '#FEF3C7' }}>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#92400E', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Product</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#92400E', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Stock</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#92400E', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Price</th>
                </tr>
              </thead>
              <tbody>
                {stats.lowStockProducts.map((product) => (
                  <tr key={product.id} style={{ borderBottom: '1px solid #FDE68A' }}>
                    <td style={{ padding: '12px', fontWeight: '600', color: '#111827' }}>{product.name}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600',
                        background: product.stock === 0 ? '#FEF2F2' : '#FFFBEB',
                        color: product.stock === 0 ? '#B91C1C' : '#B45309'
                      }}>
                        {product.stock} left
                      </span>
                    </td>
                    <td style={{ padding: '12px', fontWeight: '600', color: '#111827' }}>${parseFloat(product.price || 0).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Box>
      )}
    </Box>
  );
};

export default AdminDashboard;
