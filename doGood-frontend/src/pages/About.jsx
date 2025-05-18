import React from 'react';
import { Box, Typography } from '@mui/material';

const About = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" gutterBottom>About Us</Typography>
      <Typography variant="body1" paragraph>
        Our mission is to bridge the gap between donors and beneficiaries...
      </Typography>
    </Box>
  );
};

export default About;