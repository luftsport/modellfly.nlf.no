import RefreshIcon from '@mui/icons-material/Refresh';
import { Button, Snackbar } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import Package from '../../package.json';
import { useDevMode } from '../hooks/useDevMode';

const VersionCheck = (): React.ReactElement => {
    const devMode = useDevMode();

    const versionCheckInterval = 1000 * 60; // Every minute

    const [newVersionAvailable, setNewVersionAvailable] = useState(false);
    const [newVersion, setNewVersion] = useState('');

    const fetchServerVersion = useCallback(
        () =>
            fetch(`/version.json?${Date.now()}`, {
                cache: 'no-store'
            })
                .then((res) => {
                    return res.json();
                })
                .then((data: { version: string }) => {
                    setNewVersionAvailable(!devMode && data.version !== Package.version);
                    setNewVersion(data.version);
                    return data.version;
                })
                .catch((e) => {
                    console.error(e);
                    reload();
                }),
        [devMode]
    );

    useEffect(() => {
        fetchServerVersion();

        const timer = setInterval(() => {
            fetchServerVersion();
        }, versionCheckInterval);

        return () => clearInterval(timer);
    }, [fetchServerVersion, versionCheckInterval]);

    const reload = () => {
        location.reload();
    };

    return (
        <Snackbar
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            open={newVersionAvailable}
            message={`En ny versjon er tilgjengelig (v. ${newVersion})`}
            action={
                <Button variant="outlined" color="inherit" startIcon={<RefreshIcon />} onClick={reload}>
                    Oppdater
                </Button>
            }
        />
    );
};

export default VersionCheck;
