import React from 'react';

interface ButtonProps {
  children: React.ReactNode | undefined;
  className?: string;
  onClick?: Function;
  color?: 'blue' | 'gray';
  borderless?: boolean;
}

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const blueButtonStyles =
  'text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800';
const grayButtonStyles =
  'border border-gray-200 bg-gray-200 text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700';
const Button = ({
  children,
  className,
  onClick,
  borderless = false,
  color = 'gray'
}: ButtonProps) => {
  const classes = classNames(
    'text-sm font-medium px-2.5 px-5 focus:ring-4 mr-2 mb-2 rounded-lg',
    color === 'blue' && blueButtonStyles,
    color === 'gray' && grayButtonStyles,
    borderless && 'border-0',
    className ?? ''
  );

  return (
    <button className={classes} onClick={() => onClick && onClick()}>
      {children}
    </button>
  );
};

export default Button;
