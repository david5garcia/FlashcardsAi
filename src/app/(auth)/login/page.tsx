"use client";
import Button from "@/components/shared/button";
import Card from "@/components/shared/card";
import InputError from "@/components/shared/inputError";
import loginFormZod, { LoginForm } from "@/model/zod/auth/login/loginForm.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

const Login = ({ searchParams }: { searchParams: Record<string, string> }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>({
    resolver: zodResolver(loginFormZod),
    defaultValues: { email: searchParams.email, password: "" }
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false
    });
    if (!res || res.error) {
      toast.error("Invalid email or password");
      return;
    }
    router.replace("/");
  };

  return (
    <Card className="max-w-96 mx-auto p-6 mt-4 flex flex-col gap-6">
      <h1 className="text-3xl mx-auto">Login</h1>
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
        <Button className="mx-auto">Submit</Button>
      </form>
      <ToastContainer />
    </Card>
  );
};

export default Login;
