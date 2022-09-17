interface CardProps {
  children: JSX.Element[] | JSX.Element;
  maxWidth: "md" | "lg" | "xl" | "2xl" | "4xl";
}

const Card = ({children, maxWidth = "md"}: CardProps) => (
  <div className={`bg-gray-800 shadow-md p-6 rounded-lg max-w-${maxWidth} w-full`}>{children}</div>
);

export default Card;
