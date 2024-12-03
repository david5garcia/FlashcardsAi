"use client";
import { trpc } from "@/app/_trpc/client";
import Button from "@/components/shared/button";
import Card from "@/components/shared/card";
import InputError from "@/components/shared/inputError";
import {
  ChangePasswordForm,
  ChangePasswordFormSchema
} from "@/model/zod/auth/changePassword/changePassword.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

const ChangePassword = () => {
  const { token } = useParams<{ token: string }>();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ChangePasswordForm>({
    resolver: zodResolver(ChangePasswordFormSchema),
    defaultValues: {
      token: token
    }
  });

  const changePasswordMutation = trpc.user.changePassword.useMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<ChangePasswordForm> = (data) => {
    changePasswordMutation.mutate(data, {
      onSuccess: () => {
        router.push("/login?status=resetPasswordSuccess");
      },
      onError: (error) => {
        toast.error(error.message);
        console.error(error);
      }
    });
  };

  return (
    <Card className="max-w-96 mx-auto p-6 mt-4 flex flex-col gap-6 bg-white items-center">
      <h1 className="text-3xl mx-auto">Reset password</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-full"
      >
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

export default ChangePassword;
