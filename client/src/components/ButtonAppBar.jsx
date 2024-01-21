import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

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
          <Typography className='logo' onClick={() => navigate("/")} variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mmarkets'S
          </Typography>
          <Button onClick={() => navigate("/register")} color="inherit">Register</Button>
          <Button onClick={() => navigate("/signin")} color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}