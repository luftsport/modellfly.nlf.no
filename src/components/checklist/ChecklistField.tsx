import { FormControl, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

const ChecklistField = ({ field }: { field: any }): React.ReactElement => {
    const [value, setValue] = useState<any>('');
    const [valueDate, setValueDate] = useState<any>(dayjs());

    useEffect(() => {
        if (field.type !== 'text') {
            return;
        }

        const stored = localStorage.getItem(`checklist-field-${field.title.replaceAll(' ', '-').toLowerCase()}`);
        if (stored) {
            setValue(stored);
        }
    }, [field]);

    useEffect(() => {
        if (field.type !== 'text' || value === undefined) {
            return;
        }

        localStorage.setItem(`checklist-field-${field.title.replaceAll(' ', '-').toLowerCase()}`, value);
    }, [field, value]);

    if (!field) {
        return <></>;
    }

    switch (field.type) {
        case 'text':
            return (
                <>
                    <div className="hidden-print">
                        <FormControl fullWidth>
                            <TextField fullWidth label={field.title} variant="outlined" value={value} onChange={(e) => setValue(e.target.value)} />
                        </FormControl>
                    </div>
                    <div className="hidden-screen">
                        {field.title}: <strong>{value}</strong>
                    </div>
                </>
            );
        case 'date':
            return (
                <>
                    <div className="hidden-print">
                        <DatePicker label={field.title} value={valueDate} onChange={(newValue) => setValueDate(newValue)} />
                    </div>
                    <div className="hidden-screen">
                        {field.title}: <strong>{valueDate?.format('YYYY-MM-DD')}</strong>
                    </div>
                </>
            );
        case 'today':
            return (
                <div>
                    {field.title}: <strong>{valueDate?.format('YYYY-MM-DD')}</strong>
                </div>
            );
        default:
            return <></>;
    }
};

export default ChecklistField;
