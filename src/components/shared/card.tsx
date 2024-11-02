import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, style }, ref) => {
    return (
      <div
        ref={ref}
        style={style}
        className={`shadow-xl rounded-lg ${className}`}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
