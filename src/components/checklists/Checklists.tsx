import ChecklistsIcon from '@mui/icons-material/Checklist';
import { Box, Card, CardContent, Grid2, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChecklistData from '../../data/checklists.json';
import { setTitle } from '../../tools/setTitle';
import ChecklistIcon from '../common/ChecklistIcon';

const Checklists = (): React.ReactElement => {
    const theme = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        setTitle('Sjekklister');
    }, []);

    return (
        <Container maxWidth="lg" sx={{ paddingBottom: theme.spacing(2) }}>
            <Typography variant="h4" component="h1" sx={{ color: theme.palette.text.primary, marginBottom: theme.spacing(5) }}>
                <ChecklistsIcon fontSize="inherit" /> Sjekklister
            </Typography>
            <Grid2 container spacing={theme.spacing(2)}>
                {ChecklistData.map((checklist) => (
                    <Grid2 key={checklist.slug} size={{ xs: 12, md: 6, lg: 3 }}>
                        <Card
                            onClick={() => navigate(`/sjekklister/${checklist.slug}`)}
                            sx={{
                                textAlign: 'center',
                                borderRadius: 2,
                                boxShadow: 3,
                                '&:hover': { backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800] },
                                height: '100%',
                                cursor: 'pointer'
                            }}>
                            <CardContent>
                                <Box alignItems="center" justifyContent="center" height={200} display="flex" flexDirection="column">
                                    <ChecklistIcon checklist={checklist} />
                                    <Typography variant="h4" sx={{ textAlign: 'center' }}>
                                        {checklist.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ textAlign: 'center' }}>
                                        {checklist.description}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
        </Container>
    );
};

export default Checklists;
