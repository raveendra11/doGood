import React from 'react';
import { Box, Typography } from '@mui/material';

const Donate = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" gutterBottom>Donate</Typography>
      <Typography variant="body1">
        Support our causes through financial contributions, goods, or your time.
      </Typography>
    </Box>
  );
};

export default Donate;