import { TextFieldVariants } from "@mui/material";
import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  UseFormRegister
} from "react-hook-form";
import Input from "./input";

type InputErrorProps = {
  id: string;
  label: string;
  variant?: TextFieldVariants;
  type?: string;
  register?: UseFormRegister<FieldValues>;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
};

const InputError = ({
  id,
  label,
  variant = "outlined",
  type = "text",
  register,
  error
}: InputErrorProps) => {
  return (
    <div className="flex flex-col gap-1">
      <Input
        id={id}
        label={label}
        variant={variant}
        type={type}
        register={register}
      />
      {error && <p className=" text-xs text-red-500">{String(error)}</p>}
    </div>
  );
};

export default InputError;
