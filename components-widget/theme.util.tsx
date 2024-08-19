import { useState, useEffect } from "react";

import Script from 'next/script';
import Nav from 'react-bootstrap/Nav';


import css from '../styles/theme.util.module.css';
import style from 'styles/header.module.css'
import cn from 'classnames'
import { set } from "date-fns";
import { th } from "date-fns/locale";

interface SetThemeProps { }

const SetTheme: React.FC<SetThemeProps> = () => {
    const themes: string[] = ['light', 'dark'];
    const [theme, setTheme] = useState<string>(null);
    const [followSystem, setFollowSystem] = useState<boolean>(true);

    const toggleTheme = () => {
        const currentIndex = themes.indexOf(theme as string);
        const nextTheme = themes[(currentIndex + 1) % themes.length];
        setTheme(nextTheme);
        setFollowSystem(false);
        localStorage.setItem('theme', nextTheme);
    };

    // const getThemeNow = () => {
    //     // const themeSetByHTML = (document.querySelector(':root') as Element & HTMLElement).dataset.theme;
    //     const themeSystem = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    //     return theme ?? themeSystem;
    // };

    const getMainColor = function () : string {
        const rootElement = document.documentElement;
        const result = getComputedStyle(rootElement).getPropertyValue('--navbar-bg-color').trim();
        //console.log('Main color: ', result);
        return result;
    };

    const setMetaThemeColor = function (color: string) {
        const metaThemeColor = document.querySelector('meta[name=theme-color]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', color);
        } else {
            const meta = document.createElement('meta');
            meta.name = 'theme-color';
            meta.content = color;
            document.head.appendChild(meta);
        }
    };

    useEffect(() => {
        // setTheme(localStorage.getItem('theme') ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
        // read current theme from DOM and set is if followSystem is true
        const themeData = localStorage.getItem('theme');
        if (themeData) {
            setFollowSystem(false);
            setTheme(themeData);
        } else {
            setFollowSystem(true);
            setTheme((window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
        }

    }, []);

    useEffect(() => {
        if (theme) {
            (document.querySelector(':root') as Element & HTMLElement).dataset.userColorScheme = theme;
            setMetaThemeColor(getMainColor());
        }

        const useSetTheme = (e: MediaQueryListEvent) => {
            setTheme(e.matches ? 'dark' : 'light');
            setFollowSystem(true);
            localStorage.removeItem('theme');
            //console.log('Sytem theme changed to: ', e.matches ? 'dark' : 'light');
        };

        const watchSysTheme = window.matchMedia('(prefers-color-scheme: dark)');

        watchSysTheme.addEventListener('change', useSetTheme);

        return () => {
            watchSysTheme.removeEventListener('change', useSetTheme);
        };
    }, [theme]);

    let darkmode = '';
    if (followSystem) {
        darkmode = 'Follow System';
    } else {
        darkmode = theme === 'dark' ? 'On' : 'Off';
    }

    return (
        <>
            <Nav.Link key="themeToggle" onClick={toggleTheme} data-user-color-scheme={theme} className={cn(style.navbarText)}>
                <i className={`bi ${css.icon}`}></i> <span
                    className="d-lg-none"
                > Dark mode: {darkmode}</span>
            </Nav.Link>
        </>
    );
};

export default SetTheme;
