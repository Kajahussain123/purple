import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Divider, Typography} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import StorefrontIcon from '@mui/icons-material/Storefront';

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        { text: 'Overview', icon: <DashboardIcon />, path: '/' },
        { text: 'Products', icon: <CategoryIcon />, path: '/products' },
        { text: 'Users', icon: <PeopleIcon />, path: '/users' },
        { text: 'Orders', icon: <ShoppingCartIcon />, path: '/orders' },
        { text: 'Vendors', icon: <StorefrontIcon />, path: '/vendors' },
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                    backgroundColor: '#1e1e2d',
                    color: '#a4a6b3',
                },
            }}
        >
            {/* <Box sx={{ padding: '16px', textAlign: 'center' }}>
                <img
                    src="https://i.postimg.cc/qqhWvvN2/6f05cef92da77e8f946c303920fa8a7e.png"
                    alt="Logo"
                    style={{ width: '100%', maxWidth: '120px', height: '50px' }}
                />
            </Box> */}
            <Box sx={{ padding: '16px', textAlign: 'center' }}>
                <Typography variant="h6" color="white">
                    Admin Panel
                </Typography>
            </Box>
            <Divider sx={{ borderColor: '#393946' }} />
            <List sx={{ overflowY: 'auto', overflowX: 'hidden' }}> {/* Ensure vertical scrolling only */}
                {menuItems.map((item) => (
                    <ListItem
                        button
                        component={Link}
                        to={item.path}
                        key={item.text}
                        selected={location.pathname === item.path}
                        sx={{
                            borderRadius: '4px',
                            backgroundColor: location.pathname === item.path ? '#393946' : 'transparent',
                            color: location.pathname === item.path ? '#ffffff' : '#a4a6b3',
                            '&:hover': {
                                backgroundColor: '#393946',
                                color: '#ffffff',
                            },
                            padding: '8px 16px',
                            margin: '4px 8px',
                        }}
                    >
                        <ListItemIcon sx={{ color: location.pathname === item.path ? '#ffffff' : '#a4a6b3' }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;