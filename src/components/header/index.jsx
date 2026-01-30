import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import Register from '../../features/auth/components/register';

export default function Header() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    marginRight: 16,
  };

  return (
    <>
      <AppBar position="static" sx={{ mb: 2 }}>
        <Toolbar>
          <CodeIcon sx={{ mr: 2 }} />

          <Link to="/" style={{ ...linkStyle, marginRight: 24 }}>
            <Typography variant="h6">First Code</Typography>
          </Link>

          <NavLink to="/member" style={linkStyle}>
            <Button color="inherit">Member</Button>
          </NavLink>

          <NavLink to="/products" style={linkStyle}>
            <Button color="inherit">Products</Button>
          </NavLink>

          <NavLink to="/staff" style={linkStyle}>
            <Button color="inherit">Staff</Button>
          </NavLink>

          <Button color="inherit" onClick={handleOpen}>
            Register
          </Button>
        </Toolbar>
      </AppBar>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Register</DialogTitle>
        <DialogContent>
          <Register />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
