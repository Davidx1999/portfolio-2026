import React from 'react';

/**
 * PageCurtainContent
 * Ensures page content remains stable and grounded behind the curtain transition
 * without scale distortion, horizontal shifting, or color flash.
 */
export function PageCurtainContent({ children, className = '', id = 'page-content', ...props }) {
  return (
    <div
      id={id}
      className={`page-curtain__content w-full relative z-0 ${className}`}
      style={{
        transform: 'none',
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export default PageCurtainContent;
