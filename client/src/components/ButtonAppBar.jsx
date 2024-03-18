import { useNavigate } from 'react-router-dom';

import Logo from "/Logo2.png"

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ButtonGroup } from '@mui/material';

export const ButtonAppBar = () => {

  const navigate = useNavigate()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
            <img onClick={() => navigate("/")} className='logo-app' src={Logo} alt="" />
            
            <div className='btn-group-nav'>
            <Button onClick={() => navigate("/register")} color="inherit">Register</Button>
          <Button onClick={() => navigate("/signin")} color="inherit">Login</Button>
            </div>
           
        </Toolbar>
      </AppBar>
    </Box>
  );
}