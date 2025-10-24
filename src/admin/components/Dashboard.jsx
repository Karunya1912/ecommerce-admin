import React, { useEffect, useState } from 'react';
import { Box, H2, H5, Text } from '@adminjs/design-system';
import { ApiClient } from 'adminjs';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const api = new ApiClient();
        
        // Fetch statistics from your API
        const response = await api.getPage({ pageName: 'dashboard-stats' });
        
        if (response.data) {
          setStats(response.data);
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Box padding="xxl">
        <Text>Loading dashboard...</Text>
      </Box>
    );
  }

  return (
    <Box padding="xxl">
      <H2 marginBottom="xl">Dashboard Overview</H2>
      
      <Box display="flex" flexWrap="wrap" marginTop="xl">
        <Box
          flex="1"
          minWidth="200px"
          padding="xl"
          margin="default"
          bg="primary100"
          borderRadius="default"
        >
          <H5 color="white">Total Users</H5>
          <Text fontSize="xl" fontWeight="bold" color="white">
            {stats.totalUsers}
          </Text>
        </Box>

        <Box
          flex="1"
          minWidth="200px"
          padding="xl"
          margin="default"
          bg="success"
          borderRadius="default"
        >
          <H5 color="white">Total Orders</H5>
          <Text fontSize="xl" fontWeight="bold" color="white">
            {stats.totalOrders}
          </Text>
        </Box>

        <Box
          flex="1"
          minWidth="200px"
          padding="xl"
          margin="default"
          bg="info"
          borderRadius="default"
        >
          <H5 color="white">Total Products</H5>
          <Text fontSize="xl" fontWeight="bold" color="white">
            {stats.totalProducts}
          </Text>
        </Box>

        <Box
          flex="1"
          minWidth="200px"
          padding="xl"
          margin="default"
          bg="warning"
          borderRadius="default"
        >
          <H5 color="white">Total Revenue</H5>
          <Text fontSize="xl" fontWeight="bold" color="white">
            ${stats.totalRevenue.toFixed(2)}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;