import React from 'react';
import { Box, Typography } from '@mui/material';

const Gallery = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" gutterBottom>Success Stories</Typography>
      <Typography variant="body1">
        Inspiring stories from our community.
      </Typography>
    </Box>
  );
};

export default Gallery;