const Card = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`${className} shadow-lg rounded-lg bg-white`}>
      {children}
    </div>
  );
};

export default Card;
