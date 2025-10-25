import React, { useEffect, useState } from 'react';
import { Box, H3, H5, Text, Loader } from '@adminjs/design-system';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/dashboard-stats');
      if (!response.ok) {
        throw new Error('Failed to fetch statistics');
      }
      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box variant="white" p="xxl">
        <Loader />
      </Box>
    );
  }

  if (error) {
    return (
      <Box variant="white" p="xxl">
        <Text color="error">{error}</Text>
      </Box>
    );
  }

  return (
    <Box>
      <H3 mb="xl">Admin Dashboard</H3>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
        gridGap="lg"
      >
        {/* Total Users Card */}
        <Box
          variant="white"
          p="xl"
          border="default"
          borderRadius="lg"
          boxShadow="card"
        >
          <H5 color="grey60" mb="default">Total Users</H5>
          <Text fontSize="xxl" fontWeight="bold" color="primary100">
            {stats?.totalUsers || 0}
          </Text>
          <Text fontSize="sm" color="grey60" mt="sm">
            Registered users in the system
          </Text>
        </Box>

        {/* Total Products Card */}
        <Box
          variant="white"
          p="xl"
          border="default"
          borderRadius="lg"
          boxShadow="card"
        >
          <H5 color="grey60" mb="default">Total Products</H5>
          <Text fontSize="xxl" fontWeight="bold" color="success">
            {stats?.totalProducts || 0}
          </Text>
          <Text fontSize="sm" color="grey60" mt="sm">
            Products in catalog
          </Text>
        </Box>

        {/* Total Orders Card */}
        <Box
          variant="white"
          p="xl"
          border="default"
          borderRadius="lg"
          boxShadow="card"
        >
          <H5 color="grey60" mb="default">Total Orders</H5>
          <Text fontSize="xxl" fontWeight="bold" color="accent">
            {stats?.totalOrders || 0}
          </Text>
          <Text fontSize="sm" color="grey60" mt="sm">
            Orders placed
          </Text>
        </Box>

        {/* Total Revenue Card */}
        <Box
          variant="white"
          p="xl"
          border="default"
          borderRadius="lg"
          boxShadow="card"
        >
          <H5 color="grey60" mb="default">Total Revenue</H5>
          <Text fontSize="xxl" fontWeight="bold" color="success">
            ${stats?.totalRevenue?.toFixed(2) || '0.00'}
          </Text>
          <Text fontSize="sm" color="grey60" mt="sm">
            From paid orders
          </Text>
        </Box>
      </Box>

      {/* Additional Info */}
      <Box variant="white" mt="xl" p="xl" border="default" borderRadius="lg">
        <H5 mb="default">System Information</H5>
        <Text fontSize="sm" color="grey80">
          Welcome to the eCommerce Admin Dashboard. Here you can manage users, products,
          categories, orders, and system settings.
        </Text>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
