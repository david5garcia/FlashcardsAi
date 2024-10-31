"use client";
import { trpc } from "@/app/_trpc/client";
import Button from "@/components/shared/button";
import Card from "@/components/shared/card";
import InputError from "@/components/shared/inputError";
import registerFormZod, {
  RegisterForm
} from "@/model/zod/auth/register/registerForm.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerFormZod)
  });

  const registerMutation = trpc.register.registerUser.useMutation({
    onSuccess: (response) => {
      toast.success(response.message, { autoClose: 10000 });
    },
    onError: (error) => {
      toast.error(error.message);
      console.error(error);
    }
  });

  const onSubmit: SubmitHandler<RegisterForm> = (data) => {
    const res = registerMutation.mutate(data);
    console.log(res);
  };

  return (
    <Card className="max-w-96 mx-auto p-6 mt-4 flex flex-col gap-6">
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
        <Button className="mx-auto">Submit</Button>
      </form>
      <ToastContainer />
    </Card>
  );
};

export default Register;
