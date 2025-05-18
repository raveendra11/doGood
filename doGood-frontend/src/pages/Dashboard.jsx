import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box } from '@mui/material';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) navigate('/login'); // Redirect if not logged in
  }, [user, navigate]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Welcome, {user?.name}!</Typography>
      <Typography>Email: {user?.email}</Typography>
      <Typography>Role: {user?.role}</Typography>
    </Box>
  );
};

export default Dashboard;

