import React from 'react';
import { Box, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" gutterBottom>Your Profile</Typography>
      <Typography variant="body1">
        Name: {currentUser?.name}
      </Typography>
      <Typography variant="body1">
        Email: {currentUser?.email}
      </Typography>
      <Typography variant="body1">
        Role: {currentUser?.role}
      </Typography>
    </Box>
  );
};

export default Profile;