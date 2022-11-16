import React from 'react';

interface ButtonProps {
  children: React.ReactNode | undefined;
  className?: string;
  onClick?: Function;
  color: 'blue' | 'gray';
}

const Button = ({
  children,
  className,
  onClick,
  color = 'gray'
}: ButtonProps) => {
  const classes =
    color === 'blue'
      ? 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
      : 'rounded-lg border border-gray-200 bg-gray-200 py-2.5 px-5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 ';

  return (
    <button
      className={`mr-2 mb-2 ${classes} ${className ?? ''}`}
      onClick={() => onClick && onClick()}>
      {children}
    </button>
  );
};

export default Button;
