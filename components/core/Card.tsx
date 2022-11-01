interface CardProps {
  children: JSX.Element[] | JSX.Element;
  maxWidth?: 'md' | 'lg' | 'xl' | '2xl' | '4xl';
  className?: string;
}

const Card = ({children, maxWidth = 'md', className = ''}: CardProps) => (
  <div
    className={`max-w-${maxWidth} w-full rounded-lg bg-gray-800 p-6 shadow-md ${className}`}>
    {children}
  </div>
);

export default Card;
