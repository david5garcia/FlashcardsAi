import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const Card = React.forwardRef<
  HTMLDivElement,
  CardProps
>(({ children, className, style }, ref) => {
  return (
    <div ref={ref} style={style} className={`${className} shadow-xl rounded-lg bg-white`}>
      {children}
    </div>
  );
});

export default Card;
