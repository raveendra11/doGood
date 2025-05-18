import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography, MenuItem } from '@mui/material';
import { registerUser } from '../services/api';

const UserRegistration = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      role: 'DONOR'
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
      role: Yup.string().required('Required')
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await registerUser(values);
        alert('User registered successfully!');
        resetForm();
      } catch (error) {
        alert('Registration failed: ' + error.response?.data?.message || error.message);
      }
      setSubmitting(false);
    }
  });

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>Register yourself</Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          margin="normal"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          margin="normal"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          margin="normal"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        
        <TextField
          fullWidth
          id="role"
          name="role"
          label="Role"
          select
          margin="normal"
          value={formik.values.role}
          onChange={formik.handleChange}
          error={formik.touched.role && Boolean(formik.errors.role)}
          helperText={formik.touched.role && formik.errors.role}
        >
          <MenuItem value="DONOR">Donor</MenuItem>
          <MenuItem value="ADMIN">Admin</MenuItem>
          <MenuItem value="BENEFICIARY">Beneficiary</MenuItem>
        </TextField>
        
        <Button 
          color="primary" 
          variant="contained" 
          fullWidth 
          type="submit"
          sx={{ mt: 2 }}
          disabled={formik.isSubmitting}
        >
          Register
        </Button>
      </form>
    </Box>
  );
};

export default UserRegistration;