import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import InfoIcon from '@mui/icons-material/Info';
import { Chip, Container, Grid2, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import LaptopIcon from 'mdi-material-ui/Laptop';
import ServerSecurityIcon from 'mdi-material-ui/ServerSecurity';
import React, { useEffect, useMemo } from 'react';
import packageJson from '../../../package.json';
import BuildInfo from '../../data/build.json';
import { useDevMode } from '../../hooks/useDevMode';
import { setTitle } from '../../tools/setTitle';

const DataStatus = ({
    buildDate,
    text = 'bygd',
    color = undefined
}: {
    buildDate: string;
    text?: string;
    color?: 'success' | 'warning' | 'error' | 'info' | 'primary' | 'secondary' | undefined;
}): React.ReactElement => {
    const d = useMemo(() => dayjs(buildDate), [buildDate]);

    const statusColor = useMemo<'success' | 'warning' | 'error' | 'info' | 'primary' | 'secondary' | undefined>(() => {
        if (color) {
            return color;
        }

        const diff = dayjs().diff(d, 'day');
        if (diff < 100) {
            return 'success';
        }

        if (diff < 72) {
            return 'warning';
        }

        return 'error';
    }, [d, color]);

    return (
        <Chip sx={{ marginTop: 2 }} icon={<EventAvailableIcon />} label={`Sist ${text}: ${d?.format('MMMM Do, YYYY')} (${d?.fromNow()})`} color={statusColor} />
    );
};

const About = (): React.ReactElement => {
    const theme = useTheme();
    const devMode = useDevMode();

    useEffect(() => {
        setTitle('Om');
    }, []);

    return (
        <Container maxWidth="lg" sx={{ paddingBottom: '10px' }}>
            <Grid2 container rowSpacing={theme.spacing(3)}>
                <Grid2 size={12}>
                    <Typography variant="h3" sx={{ paddingBottom: theme.spacing(1), color: theme.palette.text.primary }}>
                        NLF Modellfly
                    </Typography>
                </Grid2>
                <Grid2 size={12}>
                    <Typography variant="h4" sx={{ paddingBottom: theme.spacing(1), color: theme.palette.text.primary }}>
                        Bygginformasjon
                    </Typography>
                    <List>
                        <ListItem alignItems="flex-start" divider>
                            <ListItemText primary="NLF Modellfly" secondary="Applikasjonsrammeverk" sx={{ color: theme.palette.text.primary }} />
                            <Chip sx={{ marginTop: 2 }} icon={<InfoIcon />} label={`Versjon ${packageJson.version}`} color="success" />
                        </ListItem>
                        <ListItem alignItems="flex-start" divider>
                            <ListItemText
                                primary="Genererte og importerte data"
                                secondary="Generert data: radioprosedyrer"
                                sx={{ color: theme.palette.text.primary }}
                            />
                            <DataStatus buildDate={BuildInfo.build} />
                        </ListItem>
                        <ListItem alignItems="flex-start" divider>
                            <ListItemText primary="Miljø" secondary="Kjøremiljø" sx={{ color: theme.palette.text.primary }} />
                            {!devMode && <Chip sx={{ marginTop: 2 }} icon={<ServerSecurityIcon />} label="Produksjon" color="success" />}
                            {devMode && <Chip sx={{ marginTop: 2 }} icon={<LaptopIcon />} label="Lokalt" color="warning" />}
                        </ListItem>
                    </List>
                </Grid2>
            </Grid2>
        </Container>
    );
};

export default About;
