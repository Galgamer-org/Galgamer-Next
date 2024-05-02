'use client';
import { useEffect, useState } from 'react';
import style from '@/styles/return-top.module.css';
import cn from 'classnames';

const ReturnTopButton = () => {
  // state: 0 = hidden, 1 = sliding, 2 = shown
  const [showButton, setShowButton] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (scrollTop > 0 && showButton !== 2 && showButton !== 3) {
        setShowButton(1);
        setTimeout(() => {
          setShowButton(2);
        }, 50);
      } else if (scrollTop === 0 && showButton !== 0 && showButton !== 1) {
        setShowButton(1);
        setTimeout(() => {
          setShowButton(0);
        }, 500);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showButton]);


  const handleReturnTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {showButton !== 0 && (
        <button
          className={cn('box-shadow', style.returnTop, showButton === 1 ? style.slide : '')}
          onClick={handleReturnTop}
        >
          <i className="bi bi-caret-up-fill"></i>
        </button>
      )}
    </>
  );
};

export default ReturnTopButton;