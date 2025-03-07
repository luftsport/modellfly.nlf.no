import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { default as React, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Package from '../../package.json';
import { ColorModeContext } from './Layout';

const Footer = (): React.ReactElement => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const navigate = useNavigate();

    return (
        <footer
            style={{
                flexShrink: 0,
                padding: theme.spacing(2, 4),
                backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[800]
            }}>
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                <Grid item>
                    <IconButton onClick={() => colorMode.toggleColorMode()}>
                        {theme.palette.mode === 'dark' && <DarkModeIcon />}
                        {theme.palette.mode === 'light' && <LightModeIcon />}
                    </IconButton>
                </Grid>
                <Grid item>
                    <Typography
                        variant="subtitle2"
                        align="right"
                        color="textSecondary"
                        component="p"
                        onClick={() => navigate('/om')}
                        sx={{ cursor: 'pointer' }}>
                        NLF Modellfly v. {Package.version}, &copy; Norges Luftsportforbund
                    </Typography>
                </Grid>
            </Grid>
        </footer>
    );
};

export default Footer;
