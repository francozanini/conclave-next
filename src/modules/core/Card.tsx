interface CardProps {
  children: JSX.Element[] | JSX.Element;
  maxWidth?: 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '8xl' | 'fit';
  className?: string;
}

const maxWidthClasses = {
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '4xl': 'max-w-4xl',
  '8xl': 'max-w-8xl',
  fit: 'max-w-fit'
};

const Card = ({children, maxWidth = 'md', className = ''}: CardProps) => {
  const _maxWidth = maxWidthClasses[maxWidth];

  return (
    <div
      className={`${_maxWidth} w-full rounded-lg bg-gray-800 p-6 shadow-md ${className}`}>
      {children}
    </div>
  );
};

export default Card;
