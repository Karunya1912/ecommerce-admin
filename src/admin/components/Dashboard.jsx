import React from 'react';
import { useCurrentAdmin } from 'adminjs';
import AdminDashboard from './AdminDashboard.jsx';

const Dashboard = () => {
  const [currentAdmin] = useCurrentAdmin();

  // Always show AdminDashboard since this is an admin panel
  // If you want different dashboards based on role, you can check:
  // if (currentAdmin?.role === 'admin') return <AdminDashboard />;

  return <AdminDashboard />;
};

export default Dashboard;
