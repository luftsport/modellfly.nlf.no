import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isToday from 'dayjs/plugin/isToday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import localeData from 'dayjs/plugin/localeData';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import minMax from 'dayjs/plugin/minMax';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';
import weekday from 'dayjs/plugin/weekday';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Routes from './components/Routes';

if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'development') {
    console.log = function () {};
    console.warn = function () {};
}

const routes = Routes();
const router = createBrowserRouter(routes);

const configureDayJs = (): void => {
    dayjs.extend(relativeTime);
    dayjs.extend(customParseFormat);
    dayjs.extend(advancedFormat);
    dayjs.extend(isBetween);
    dayjs.extend(isSameOrBefore);
    dayjs.extend(isSameOrAfter);
    dayjs.extend(isToday);
    dayjs.extend(isTomorrow);
    dayjs.extend(localeData);
    dayjs.extend(updateLocale);
    dayjs.extend(localizedFormat);
    dayjs.extend(duration);
    dayjs.extend(timezone);
    dayjs.extend(weekday);
    dayjs.extend(minMax);
    dayjs.extend(utc);
    dayjs.locale('nb');

    dayjs.updateLocale('en', {
        weekStart: 1,
        months: ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember']
    });
};

const App = (): React.ReactElement => {
    configureDayJs();

    return <RouterProvider router={router} />;
};

export default App;
