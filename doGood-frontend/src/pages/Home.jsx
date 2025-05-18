import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" gutterBottom>Welcome to doGood</Typography>
      <Typography variant="body1" paragraph>
        doGood is a charity for the orphaned childern and elders by fellow friends.
      </Typography>
      <Button variant="contained" component={Link} to="/register" sx={{ mr: 2 }}>
        Join Us
      </Button>
      <Button variant="outlined" component={Link} to="/about">
        Learn More
      </Button>
    </Box>
  );
};

export default Home;