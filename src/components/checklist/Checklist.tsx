import PrintIcon from '@mui/icons-material/Print';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Alert, Button, Checkbox, Grid2, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper, Typography, useMediaQuery } from '@mui/material';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import filenamify from 'filenamify';
// @ts-ignore
import html2pdf from 'html2pdf.js';
import React, { useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import ChecklistData from '../../data/checklists.json';
import { setTitle } from '../../tools/setTitle';
import ChecklistIcon from '../common/ChecklistIcon';
import ChecklistField from './ChecklistField';

const Checklist = (): React.ReactElement => {
    const { slug } = useParams();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { defaultMatches: true });

    const checklist = useMemo(() => ChecklistData.filter((c) => c.slug === slug).at(0), [slug]);

    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef });

    const [checked, setChecked] = React.useState<number[]>([]);
    const completed = checked.length === checklist?.checklist.length;

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

    const print = () => {
        reactToPrintFn();
    };

    const savePdf = async () => {
        const doc = document.getElementById('checklist-container');
        if (!doc) {
            return;
        }

        doc.classList.add('pdf-print');
        if (theme.palette.mode === 'dark') {
            doc.classList.add('checklist-container-dark');
        }

        await html2pdf()
            .set({
                pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
                html2canvas: { backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : '#ffffff' }
            })
            .from(doc)
            .save(`${filenamify(checklist?.title ?? 'Sjekkliste')}-${dayjs().format('YYYY-MM-DD-HHmm')}.pdf`);

        doc.classList.remove('pdf-print');
        doc.classList.remove('checklist-container-dark');
    };

    const reset = () => {
        setChecked([]);
    };

    if (!checklist) {
        return <Alert severity="error">Sjekkliste ikke funnet</Alert>;
    }

    return (
        <Container maxWidth="lg" sx={{ padding: 0 }} id="checklist-container">
            <Grid2
                container
                spacing={theme.spacing(2)}
                component={Paper}
                ref={contentRef}
                elevation={isMobile ? 0 : 1}
                sx={{ backgroundColor: isMobile ? theme.palette.background.default : undefined }}>
                <Grid2 size={12} paddingLeft={theme.spacing(2)} paddingRight={theme.spacing(2)}>
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{ color: theme.palette.text.primary, marginTop: theme.spacing(1), marginBottom: theme.spacing(2) }}>
                        <ChecklistIcon checklist={checklist} /> {checklist?.title}
                    </Typography>
                </Grid2>
                {checklist.fields?.length > 0 && (
                    <Grid2 size={12} paddingLeft={theme.spacing(2)} paddingRight={theme.spacing(2)}>
                        <Grid2 container spacing={theme.spacing(2)}>
                            {checklist.fields.map((field, index) => (
                                <Grid2 key={index} size={12}>
                                    <ChecklistField field={field} />
                                </Grid2>
                            ))}
                        </Grid2>
                    </Grid2>
                )}
                <Grid2 size={12} px={{ xs: 0, sm: 2 }}>
                    <List>
                        <ListItem
                            secondaryAction={<div style={{ marginRight: theme.spacing(2) }}>JA</div>}
                            sx={{
                                borderBottom: '1px solid',
                                borderBottomColor: theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[600],
                                backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[800],
                                fontWeight: 'bold',
                                breakInside: 'avoid',
                                breakBefore: 'auto'
                            }}>
                            <ListItemAvatar>&nbsp;</ListItemAvatar>
                            <ListItemText primary="Sjekkpunkt" slotProps={{ primary: { sx: { fontWeight: 'bold' } } }} />
                        </ListItem>
                        {checklist?.checklist.map((item, index) => (
                            <ListItem
                                className="checklist-item"
                                key={item.title}
                                secondaryAction={
                                    <Checkbox
                                        edge="end"
                                        onChange={handleToggle(index)}
                                        color="success"
                                        checked={checked.includes(index)}
                                        sx={{ marginRight: theme.spacing(1) }}
                                    />
                                }
                                sx={{
                                    borderBottom: '1px solid',
                                    borderBottomColor: theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[600]
                                }}>
                                <ListItemButton onClick={handleToggle(index)}>
                                    <ListItemAvatar>
                                        <b>{index + 1}.</b>
                                    </ListItemAvatar>
                                    <ListItemText primary={item.title} sx={{ paddingRight: theme.spacing(2) }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Grid2>
                {completed && (
                    <Grid2 size={12} paddingLeft={theme.spacing(2)} paddingRight={theme.spacing(2)}>
                        <Alert severity="success">Sjekkliste fullført</Alert>
                    </Grid2>
                )}
                <Grid2 size={12} paddingLeft={theme.spacing(2)} paddingRight={theme.spacing(2)}>
                    <Typography variant="body1">{checklist.explanation}</Typography>
                </Grid2>
                <Grid2 size={12} sx={{ textAlign: 'center' }} paddingLeft={theme.spacing(2)} paddingRight={theme.spacing(2)}>
                    <div className="hidden-print">
                        <Button
                            startIcon={<PrintIcon />}
                            variant="contained"
                            color={completed ? 'success' : 'warning'}
                            size="large"
                            onClick={print}
                            sx={{ margin: theme.spacing(2) }}>
                            Skriv ut
                        </Button>
                        <Button
                            startIcon={<SaveAltIcon />}
                            variant="contained"
                            color={completed ? 'success' : 'warning'}
                            size="large"
                            onClick={savePdf}
                            sx={{ margin: theme.spacing(2) }}>
                            Lagre PDF
                        </Button>
                        <Button variant="outlined" size="large" onClick={reset} sx={{ margin: theme.spacing(2) }}>
                            Nullstill
                        </Button>
                    </div>
                </Grid2>
            </Grid2>
        </Container>
    );
};

export default Checklist;
