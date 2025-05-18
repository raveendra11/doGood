import React from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>


<Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
  <IconButton edge="start" color="inherit" aria-label="logo" sx={{ mr: 2 }}>
    <img 
      src="doGood.png"
      alt=''
      style={{ height: '50px', width: '50px' }} 
    /> 
  </IconButton>
</Link>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        </Typography>

        <Button color="inherit" component={Link} to="/about">About Us</Button>
        <Button color="inherit" component={Link} to="/causes">Causes</Button>
        <Button color="inherit" component={Link} to="/gallery">Stories</Button>
        <Button color="inherit" component={Link} to="/contact">Contact</Button>
        <Button color="inherit" component={Link} to="/faq">FAQ</Button>

        {currentUser ? (
          <>
            <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem component={Link} to="/profile">Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/register">Register</Button>
            <Button color="inherit" component={Link} to="/login">Login</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;