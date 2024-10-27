"use client";
import InputError from "@/components/shared/inputError";
import registerFormZod from "@/model/zod/auth/register/registerForm.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(registerFormZod)
  });

  console.log(errors);

  const onSubmit = (e: any) => {
    console.log(e);
  };

  return (
    <div className="max-w-96 shadow-lg rounded-lg mx-auto p-6 mt-4 flex flex-col gap-6">
      <h1 className="text-3xl mx-auto">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <InputError
          type="email"
          id="email"
          register={register}
          label={"Email"}
          error={errors.email?.message}
        />
        <InputError
          type="password"
          id="password"
          register={register}
          label={"Password"}
          error={errors.password?.message}
        />
        <InputError
          type="password"
          id="confirmPassword"
          register={register}
          label={"Confirm Password"}
          error={errors.confirmPassword?.message}
        />
        <button className="bg-blue-600 w-32 py-3 rounded-lg text-white hover:bg-blue-800 mx-auto">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
