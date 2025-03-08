import { PaletteMode, responsiveFontSizes } from '@mui/material';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import React, { useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import useLocalStorageState from 'use-local-storage-state';
import UnhandledExceptionBoundary from '../components/common/UnhandledExceptionBoundary';
import Footer from './Footer';
import Header from './Header';
import ScrollToTop from './ScrollToTop';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const Layout = (): React.ReactElement => {
    const [mode, setMode] = useLocalStorageState<'light' | 'dark'>('color_theme', { defaultValue: 'light' });

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

    return (
        <UnhandledExceptionBoundary>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="nb">
                <ColorModeContext.Provider value={colorMode}>
                    <ThemeProvider theme={theme}>
                        <ScrollToTop />
                        <Header />
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
                                    paddingTop: theme.spacing(2),
                                    paddingBottom: theme.spacing(2),
                                    paddingLeft: 0,
                                    paddingRight: 0,
                                    backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#121212'
                                }}
                                maxWidth={false}>
                                <UnhandledExceptionBoundary>
                                    <Outlet />
                                </UnhandledExceptionBoundary>
                            </Container>
                            <Footer />
                        </Container>
                    </ThemeProvider>
                </ColorModeContext.Provider>
            </LocalizationProvider>
        </UnhandledExceptionBoundary>
    );
};

export default Layout;
