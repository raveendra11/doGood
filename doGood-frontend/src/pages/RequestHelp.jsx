import React from 'react';
import { Box, Typography } from '@mui/material';

const RequestHelp = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" gutterBottom>Request Help</Typography>
      <Typography variant="body1">
        Submit your request for assistance.
      </Typography>
    </Box>
  );
};

export default RequestHelp;