import { Alert, Button, Checkbox, Grid2, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import ChecklistData from '../../data/checklists.json';
import { setTitle } from '../../tools/setTitle';
import ChecklistIcon from '../common/ChecklistIcon';
import ChecklistField from './ChecklistField';

const Checklist = (): React.ReactElement => {
    const { slug } = useParams();

    const theme = useTheme();

    const checklist = useMemo(() => ChecklistData.filter((c) => c.slug === slug).at(0), [slug]);
    const [checked, setChecked] = React.useState<number[]>([]);

    useEffect(() => {
        setTitle(checklist?.title ?? 'Sjekkliste');
    }, [checklist]);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const print = () => {};

    const reset = () => {
        setChecked([]);
    };

    if (!checklist) {
        return <Alert severity="error">Sjekkliste ikke funnet</Alert>;
    }

    return (
        <Container maxWidth="lg" sx={{ paddingBottom: theme.spacing(2) }}>
            <Typography variant="h4" component="h1" sx={{ color: theme.palette.text.primary, marginBottom: theme.spacing(5) }}>
                <ChecklistIcon checklist={checklist} /> {checklist?.title}
            </Typography>
            <Grid2 container spacing={theme.spacing(2)} component={Paper} padding={theme.spacing(2)}>
                {checklist.fields?.length > 0 && (
                    <Grid2 size={12}>
                        <Grid2 container spacing={theme.spacing(2)}>
                            {checklist.fields.map((field, index) => (
                                <Grid2 key={index} size={12}>
                                    <ChecklistField field={field} />
                                </Grid2>
                            ))}
                        </Grid2>
                    </Grid2>
                )}
                <Grid2 size={12}>
                    <List>
                        <ListItem
                            secondaryAction="JA"
                            sx={{
                                borderBottom: '1px solid',
                                borderBottomColor: theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[600],
                                backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[800],
                                fontWeight: 'bold'
                            }}>
                            <ListItemAvatar>&nbsp;</ListItemAvatar>
                            <ListItemText primary="Sjekkpunkt" slotProps={{ primary: { sx: { fontWeight: 'bold' } } }} />
                        </ListItem>
                        {checklist?.checklist.map((item, index) => (
                            <ListItem
                                key={item.title}
                                secondaryAction={<Checkbox edge="end" onChange={handleToggle(index)} checked={checked.includes(index)} />}
                                sx={{
                                    borderBottom: '1px solid',
                                    borderBottomColor: theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[600]
                                }}>
                                <ListItemButton onClick={handleToggle(index)}>
                                    <ListItemAvatar>
                                        <b>{index + 1}.</b>
                                    </ListItemAvatar>
                                    <ListItemText primary={item.title} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Grid2>
                <Grid2 size={12}>
                    <Typography variant="body1">{checklist.explanation}</Typography>
                </Grid2>
                <Grid2 size={12} sx={{ textAlign: 'center' }}>
                    <Button variant="contained" color="primary" size="large" onClick={print} sx={{ margin: theme.spacing(2), display: 'none' }}>
                        Skriv ut
                    </Button>
                    <Button variant="outlined" size="large" onClick={reset} sx={{ margin: theme.spacing(2) }}>
                        Nullstill
                    </Button>
                </Grid2>
            </Grid2>
        </Container>
    );
};

export default Checklist;
