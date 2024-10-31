type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

const Button = ({
  children,
  className,
  type = "submit",
  onClick
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-[#4858cf] w-32 py-3 rounded-lg text-white hover:bg-[#3743a0] ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
