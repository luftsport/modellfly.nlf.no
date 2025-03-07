import MenuIcon from '@mui/icons-material/Menu';
import {
    AppBar,
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavigationLinks } from './common/NavigationLinks';
import VersionCheck from './VersionCheck';

const Header = (): React.ReactElement => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const drawerWidth = 240;

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleDrawer}>
                    <MenuIcon />
                </IconButton>
                <img src="/icon-wh.svg" alt="Logo" style={{ maxHeight: '34px', maxWidth: '90%', padding: '10px' }} />
                <Typography variant="h6" sx={{ display: { xs: 'block', sm: 'block', md: 'block', lg: 'block', xl: 'block' } }}>
                    Modellfly
                </Typography>

                <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'row', flex: 1 }}>
                    <Box sx={{ flexGrow: 1 }} />
                    {NavigationLinks.map((l) => (
                        <React.Fragment key={l.title}>
                            <Button
                                color="inherit"
                                aria-label={l.title}
                                title={l.title}
                                startIcon={l.icon}
                                sx={{
                                    display: { md: 'none', lg: 'flex' },
                                    m: 1,
                                    color:
                                        theme.palette.mode === 'dark' &&
                                        (location.pathname === l.url || (l.url.length > 2 && location.pathname.startsWith(l.url)))
                                            ? theme.palette.grey[800]
                                            : undefined,
                                    backgroundColor:
                                        location.pathname === l.url || (l.url.length > 2 && location.pathname.startsWith(l.url))
                                            ? theme.palette.primary.light
                                            : undefined
                                }}
                                onClick={() => navigate(l.url)}>
                                {l.title}
                            </Button>
                            <IconButton
                                color="inherit"
                                aria-label={l.title}
                                title={l.title}
                                sx={{
                                    m: 1,
                                    display: { lg: 'none' },
                                    width: 42,
                                    color:
                                        theme.palette.mode === 'dark' &&
                                        (location.pathname === l.url || (l.url.length > 2 && location.pathname.startsWith(l.url)))
                                            ? theme.palette.grey[800]
                                            : undefined,
                                    backgroundColor:
                                        location.pathname === l.url || (l.url.length > 2 && location.pathname.startsWith(l.url))
                                            ? theme.palette.primary.light
                                            : undefined
                                }}
                                onClick={() => navigate(l.url)}>
                                {l.icon}
                            </IconButton>
                        </React.Fragment>
                    ))}
                </Box>
            </Toolbar>
            <Drawer open={drawerOpen} onClose={toggleDrawer}>
                <List sx={{ width: drawerWidth, backgroundColor: theme?.palette?.background?.paper ?? 'white' }}>
                    <ListItem>
                        <img
                            src={theme.palette.mode === 'dark' ? '/icon-wh.svg' : '/icon.svg'}
                            alt="Logo"
                            style={{ maxHeight: '34px', maxWidth: '90%', padding: '10px' }}
                        />{' '}
                        Modellfly
                    </ListItem>
                    <Divider />
                    {NavigationLinks.map((l) => (
                        <ListItem key={l.title} disablePadding>
                            <ListItemButton onClick={() => navigate(l.url)}>
                                <ListItemIcon>{l.icon}</ListItemIcon>
                                <ListItemText primary={l.title} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <VersionCheck />
        </AppBar>
    );
};

export default Header;
