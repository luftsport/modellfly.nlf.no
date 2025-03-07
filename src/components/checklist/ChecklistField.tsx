import { FormControl, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const ChecklistField = ({ field }: { field: any }): React.ReactElement => {
    const [value, setValue] = useState<any>();

    useEffect(() => {
        if (field.type === 'date') {
            setValue(dayjs());
        }
    }, [field]);

    if (!field) {
        return <></>;
    }

    switch (field.type) {
        case 'text':
            return (
                <FormControl fullWidth>
                    <TextField fullWidth label={field.title} variant="outlined" value={value} onChange={(e) => setValue(e.target.value)} />
                </FormControl>
            );
        case 'date':
            return <DatePicker label={field.title} value={value} onChange={(newValue) => setValue(newValue)} />;
        default:
            return <></>;
    }
};

export default ChecklistField;
