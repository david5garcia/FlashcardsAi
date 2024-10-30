import { TextFieldVariants } from "@mui/material";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  Path,
  UseFormRegister
} from "react-hook-form";
import Input from "./input";

type InputErrorProps<T extends Record<string, any>> = {
  id: Path<T>;
  label: string;
  variant?: TextFieldVariants;
  type?: string;
  register?: UseFormRegister<T>;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
};

const InputError = <T extends Record<string, any>>({
  id,
  label,
  variant = "outlined",
  type = "text",
  register,
  error
}: InputErrorProps<T>) => {
  return (
    <div className="flex flex-col gap-1">
      <Input
        id={id}
        label={label}
        variant={variant}
        type={type}
        register={register}
      />
      {error && <p className="text-xs text-red-500">{String(error)}</p>}
    </div>
  );
};

export default InputError;
