import { TextField, TextFieldVariants } from "@mui/material";
import type { Path, UseFormRegister } from "react-hook-form";

type InputProps<T extends Record<string, unknown>> = {
  id: Path<T>;
  label: string;
  variant?: TextFieldVariants;
  type?: string;
  register?: UseFormRegister<T>;
};

const Input = <T extends Record<string, unknown>>({
  id,
  label,
  variant = "outlined",
  type = "text",
  register
}: InputProps<T>) => {
  return (
    <TextField
      id={id}
      label={label}
      variant={variant}
      type={type}
      {...(register ? register(id) : {})}
    />
  );
};

export default Input;
