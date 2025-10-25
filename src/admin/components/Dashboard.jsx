import { useCurrentAdmin } from 'adminjs';
import AdminDashboard from './AdminDashboard.jsx';
import UserDashboard from './UserDashboard.jsx';

const Dashboard = () => {
  const [currentAdmin] = useCurrentAdmin();

  if (!currentAdmin) {
    return <div>Loading...</div>;
  }

  // Route to appropriate dashboard based on role
  if (currentAdmin.role === 'admin') {
    return <AdminDashboard />;
  } else {
    return <UserDashboard />;
  }
};

export default Dashboard;