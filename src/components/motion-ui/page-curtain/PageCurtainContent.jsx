import React from 'react';

/**
 * PageCurtainContent
 * Ensures page content remains stable and grounded during curtain transitions
 * without distortion or unexpected shifts.
 */
export function PageCurtainContent({ children, className = '', id = 'page-curtain-content', ...props }) {
  return (
    <div
      id={id}
      className={`page-curtain__content w-full relative z-0 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default PageCurtainContent;
