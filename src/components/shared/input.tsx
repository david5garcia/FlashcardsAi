import { TextField, TextFieldVariants } from "@mui/material";
import type { FieldValues, UseFormRegister } from "react-hook-form";

type InputProps = {
  id: string;
  label: string;
  variant?: TextFieldVariants;
  type?: string;
  register?: UseFormRegister<FieldValues>;
};

const Input = ({
  id,
  label,
  variant = "outlined",
  type = "text",
  register
}: InputProps) => {
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
