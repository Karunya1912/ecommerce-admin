import React from 'react';
import { Box, H3, H5, Text } from '@adminjs/design-system';
import { useCurrentAdmin } from 'adminjs';

const UserDashboard = () => {
  const [currentAdmin] = useCurrentAdmin();

  return (
    <Box>
      <H3 mb="xl">Welcome, {currentAdmin?.name || 'User'}!</H3>

      {/* User Info Card */}
      <Box variant="white" p="xl" border="default" borderRadius="lg" mb="xl">
        <H5 mb="default">Your Profile Information</H5>
        <Box mt="default">
          <Text fontSize="sm" color="grey60">Email:</Text>
          <Text fontSize="default" fontWeight="bold" mb="sm">
            {currentAdmin?.email}
          </Text>

          <Text fontSize="sm" color="grey60">Role:</Text>
          <Text fontSize="default" fontWeight="bold" mb="sm">
            {currentAdmin?.role}
          </Text>
        </Box>
      </Box>

      {/* Quick Access */}
      <Box variant="white" p="xl" border="default" borderRadius="lg">
        <H5 mb="default">Quick Access</H5>
        <Text fontSize="sm" color="grey80" mt="default">
          You can browse products, categories, and orders from the navigation menu.
          As a regular user, you have view-only access to most resources.
        </Text>
      </Box>

      {/* Recent Activity Placeholder */}
      <Box variant="white" mt="xl" p="xl" border="default" borderRadius="lg">
        <H5 mb="default">Recent Activity</H5>
        <Text fontSize="sm" color="grey60">
          Your recent orders and activities will appear here.
        </Text>
      </Box>
    </Box>
  );
};

export default UserDashboard;
