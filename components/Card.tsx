const Card = ({children}: {children: JSX.Element[] | JSX.Element}) => {
  return <div className={"bg-gray-800 shadow-md p-6 rounded-lg"}>{children}</div>;
};

export default Card;
