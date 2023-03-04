import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// MUI imports
import { 
  AppBar,
  Box,
  Button,
  Toolbar,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// Reducers
import { logoutUser } from 'src/store/slices/auth/userSlice';


const Header = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ anchorElIcon, setAnchorElIcon ] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorElIcon(event.currentTarget);
  }

  const handleCloseMenu = () => {
    setAnchorElIcon(null)
  }

  return (
    <AppBar position="static" sx={{ height: "100%", paddingLeft: 5, paddingRight: 5, bgcolor: 'primary.color' }}>
      <Toolbar disableGutter
        sx={{
          alignItems: 'center',
          height: '100%'
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Typography
            variant="h5"
            noWrap
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: '.3rem',
            }}
          >
            TASKTIME
          </Typography>
        </motion.div>
        <Box
          sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Button
              onClick={() => {
                navigate({ pathname: '/dashboards' });
              }}
              sx={{ color: 'primary.contrastText', display: 'block' }}
            >
              Dashboards
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Button
              onClick={() => {
                navigate({ pathname: '/projects' });
              }}
              sx={{ color: 'primary.contrastText', display: 'block' }}
            >
              Projetos
            </Button>
          </motion.div>
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Tooltip title="Abrir menu de opções">
              <IconButton
                size="large"
                aria-label="settings"
                aria-controls="settings-menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenMenu}
                sx={{
                  color: "primary.contrastText"
                }}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
          </motion.div>
          <Menu
            sx={{ mt: '45px' }}
            id="settings-menu-appbar"
            anchorEl={anchorElIcon}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'top'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={Boolean(anchorElIcon)}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={() => {
              dispatch(logoutUser());
            }}>
              Sair + Icone de sair
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>

    </AppBar>
  )
}

export default Header;