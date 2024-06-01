'use client';

import { useState, ReactNode } from 'react';

interface CustomDetailsProps {
  children: React.ReactNode;
  title: React.ReactNode;
  defaultOpen?: boolean;
}

function CustomDetails({ children, title, defaultOpen = false }: CustomDetailsProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div onClick={handleToggle} className='d-flex align-items-center'
        style={{ cursor: 'pointer' } as React.CSSProperties}
      >
        {isOpen ? 
        <i className='bi bi-caret-down-fill me-2 h3'></i> : 
        <i className='bi bi-caret-right-fill me-2 h3'></i>}
        {title}
      </div>
      {isOpen && children}
    </div>
  );
};

export default CustomDetails;