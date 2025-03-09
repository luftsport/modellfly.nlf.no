import { PaletteMode, responsiveFontSizes, useMediaQuery } from '@mui/material';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useEffect, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import useLocalStorageState from 'use-local-storage-state';
import UnhandledExceptionBoundary from '../components/common/UnhandledExceptionBoundary';
import { useFrameDetection } from '../hooks/useFrameDetection';
import Footer from './Footer';
import Header from './Header';
import ScrollToTop from './ScrollToTop';

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const Layout = (): React.ReactElement => {
    const [mode, setMode] = useLocalStorageState<'light' | 'dark'>('color_theme', { defaultValue: 'light' });

    const iAmFramed = useFrameDetection();

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode: PaletteMode) => (prevMode === 'light' ? 'dark' : 'light'));
            }
        }),
        [setMode]
    );

    const theme = responsiveFontSizes(
        createTheme(
            {
                palette: {
                    mode,
                    primary: {
                        main: mode === 'light' ? '#0a303b' : '#c4e8f2',
                        dark: mode === 'light' ? '#0a303b' : '#c4e8f2'
                    },
                    secondary: {
                        main: '#f50057'
                    }
                },
                components: {
                    MuiChip: {
                        styleOverrides: {
                            root: ({ ownerState }) => ({
                                backgroundColor: ownerState.variant === 'outlined' ? 'white' : ''
                            })
                        }
                    },
                    MuiDialogTitle: {
                        styleOverrides: {
                            root: () => ({
                                fontSize: '250% !important'
                            })
                        }
                    }
                },
                mixins: {
                    toolbar: {
                        background: '#0a303b'
                    }
                }
            },
            [mode]
        )
    );

    theme.typography.h1 = {
        marginBottom: '1rem',
        fontSize: '2.2rem',
        [theme.breakpoints.up('md')]: {
            fontSize: '3.4rem'
        }
    };

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { defaultMatches: true });

    useEffect(() => {
        if (iAmFramed) {
            setMode('light');
        }
    }, [iAmFramed, setMode]);

    return (
        <UnhandledExceptionBoundary>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="nb">
                <ColorModeContext.Provider value={colorMode}>
                    <ThemeProvider theme={theme}>
                        <ScrollToTop />
                        {!iAmFramed && <Header />}
                        <Container
                            maxWidth={false}
                            component="main"
                            sx={{ height: '100%', width: '100%', overflow: 'auto', display: 'flex', flexDirection: 'column' }}
                            style={{
                                padding: 0,
                                margin: 0
                            }}>
                            <Container
                                id="main-content"
                                sx={{
                                    flex: '1 0 auto',
                                    paddingTop: !isMobile ? theme.spacing(2) : 0,
                                    paddingBottom: !isMobile ? theme.spacing(2) : 0,
                                    paddingLeft: 0,
                                    paddingRight: 0,
                                    backgroundColor: iAmFramed ? '#ffffff' : theme.palette.mode === 'light' ? '#fafafa' : '#121212'
                                }}
                                maxWidth={false}>
                                <UnhandledExceptionBoundary>
                                    <Outlet />
                                </UnhandledExceptionBoundary>
                            </Container>
                            {!iAmFramed && <Footer />}
                        </Container>
                    </ThemeProvider>
                </ColorModeContext.Provider>
            </LocalizationProvider>
        </UnhandledExceptionBoundary>
    );
};

export default Layout;
