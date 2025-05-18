import React from 'react';
import { Box, Typography } from '@mui/material';

const FAQ = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" gutterBottom>FAQs</Typography>
      <Typography variant="body1">
        Frequently asked questions.
      </Typography>
    </Box>
  );
};

export default FAQ;