import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import React, { useEffect } from 'react';
import { setTitle } from '../../tools/setTitle';

const Home = (): React.ReactElement => {
    const theme = useTheme();

    useEffect(() => {
        setTitle('Hjem');
    }, []);

    return (
        <Container maxWidth="lg" sx={{ paddingBottom: theme.spacing(2) }}>
            <Typography variant="h4" component="h1" sx={{ color: theme.palette.text.primary, marginBottom: theme.spacing(5) }}>
                Velkommen til NLF Modellfly
            </Typography>
            <img src="/modellfly.svg" />
            <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
                <p>Her har vi samlet nyttige verktøy og ressurser for modellflygere som flyr under Norges Luftsportforbunds sikkerhetssystem for modellfly.</p>
            </Typography>
        </Container>
    );
};

export default Home;
