import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useEffect } from 'react';
import { setTitle } from '../tools/setTitle';

const NotFoundPage = (): React.ReactElement => {
    const theme = useTheme();

    useEffect(() => {
        setTitle('404 - Not Found');
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '100%'
            }}>
            <Typography variant="h1" style={{ color: theme.palette.text.primary }}>
                404
            </Typography>
            <Typography variant="h6" style={{ color: theme.palette.text.secondary }}>
                Siden du forsøkte å åpne finnes ikke
            </Typography>
            <Button variant="contained" sx={{ marginTop: theme.spacing(3) }} href="/">
                Tilbake til Hjem
            </Button>
        </Box>
    );
};

export default NotFoundPage;
