import { useState, useEffect } from "react";

import Script from 'next/script';

import css from '../styles/theme.util.module.css';
import style from 'styles/header.module.css'

interface SetThemeProps {}

const SetTheme: React.FC<SetThemeProps> = () => {
    const [theme, setTheme] = useState<string | undefined>();

    const toggleTheme = () => {
        const themes: string[] = ['light', 'dark'];
        const currentIndex = themes.indexOf(theme as string);
        const nextTheme = themes[(currentIndex + 1) % themes.length];
        setTheme(nextTheme);
    };

    const buttonIcon = () => {

        switch (theme) {
            case 'dark':
                return 'Dark';
            case 'light':
                return 'Light';
            default:
                return '';
        }
    };

    const maybeTheme = () => {
        const themeLocalStorage = localStorage.getItem('theme');
        const themeSystem = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        return themeLocalStorage ?? themeSystem;
    };

    useEffect(() => {
        (document.querySelector(':root') as Element & HTMLElement).dataset.theme = theme ?? maybeTheme();
        localStorage.setItem('theme', theme ?? maybeTheme());

        const useSetTheme = (e: MediaQueryListEvent) => {
            setTheme(e.matches ? 'dark' : 'light');
        };

        const watchSysTheme = window.matchMedia('(prefers-color-scheme: dark)');

        watchSysTheme.addEventListener('change', useSetTheme);

        return () => {
            watchSysTheme.removeEventListener('change', useSetTheme);
        };
    }, [theme]);

    return (
        <>
            <button key="themeToggle" onClick={toggleTheme} data-theme={theme} className={css.toggle}>
                <i className={`bi ${theme === 'dark' ? 'bi-moon' : 'bi-sun'} me-1 ${style.navbarText} ${css.upwardIcon}`}></i>
            </button>
        </>
    );
};

export default SetTheme;
