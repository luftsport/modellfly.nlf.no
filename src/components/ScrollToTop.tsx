import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = (): React.ReactElement => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Fugly hack, but it works
        document.getElementsByClassName('MuiContainer-root')[0].scrollTo(0, 0);
    }, [pathname]);

    return <></>;
};

export default ScrollToTop;
