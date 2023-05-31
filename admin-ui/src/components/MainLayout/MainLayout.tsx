import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Chip from '@mui/material/Chip';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { SidebarItems } from '../SidebarItems/SidebarItems';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppRoutes } from '@/AppRoutes';
import { over } from 'lodash';
import Button from '@mui/material/Button';
import { AuthContext, AuthService } from '@/services/AuthService';
import { useContext } from 'react';

const drawerWidth = 280;
const applicationName=import.meta.env.VITE_APPLICATION_NAME as string;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export  const MainLayout = () => {
  const theme = useTheme();
  const authContext = useContext(AuthContext)
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Router>
    <Box sx={{ display: 'flex' , overflow:'hidden' }}>
      <AppBar position="fixed" open={open} sx={{backgroundColor : '#202123','& . MuiChip-labelSmall ': {
                color: 'yellow',
              }, }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <img src="/guardrails-logo-no-bg-inverted.png" alt="logo" style={{height:'40px', width:'40px',marginLeft:'10px'}} />
          <Typography variant="h6" noWrap component="div">
            {applicationName}
          </Typography>
          <Typography variant="subtitle2" component="span">
          <Chip label="Beta" variant="outlined" size="small" style={{ borderColor: '#DA9B14', color: '#DA9B14',marginLeft:"5px" }} />
        </Typography>

          <Button sx={{ marginLeft: "auto", border:'1px', backgroundColor:"#343541" }} color="inherit" onClick={authContext.logout}> <Typography  noWrap component="div">
            Logout
          </Typography></Button>
        </Toolbar>
        
      </AppBar>
      <Drawer
        sx={{
          backgroundColor : '#202123 !important',
          width: drawerWidth,
          flexShrink: 0,
          overflow:'hidden',
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor : '#202123 !important',
            color: 'white',
            overflow:'hidden'
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{color: 'white'}}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider  />
       <SidebarItems />
      </Drawer>
      <Main open={open} className='text-white bg-[#343541]'  sx={{flexGrow: 1, height: '100vh', width:'100vw', overflow: 'auto', display: 'flex', flexDirection: 'column'}}>
        <DrawerHeader />
        <Routes>
          {AppRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.component} />
          ))}
        </Routes>
      </Main>
    </Box>
    </Router>
  );
}