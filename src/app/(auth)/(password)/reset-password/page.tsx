"use client";
import { trpc } from "@/app/_trpc/client";
import Button from "@/components/shared/button";
import Card from "@/components/shared/card";
import InputError from "@/components/shared/inputError";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { z } from "zod";

const ResetPasswordFormSchema = z.object({
  email: z.string().email()
});
type ResetPasswordForm = z.infer<typeof ResetPasswordFormSchema>;

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(ResetPasswordFormSchema)
  });

  const resetPasswordMutation = trpc.user.resetPassword.useMutation();

  const onSubmit: SubmitHandler<ResetPasswordForm> = (data) => {
    resetPasswordMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Password reset email sent");
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
          type="email"
          id="email"
          register={register}
          label={"Email"}
          error={errors.email?.message}
        />
        <Button className="mx-auto">Submit</Button>
      </form>
      <ToastContainer />
    </Card>
  );
};

export default ResetPassword;
