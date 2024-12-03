import { PublicError } from "@/model/trpc/publicError";
import { ChangePasswordFormSchema } from "@/model/zod/auth/changePassword/changePassword.zod";
import { userService } from "@/server/services/auth/user.service";
import { string, z } from "zod";
import { publicProcedure, router } from "../../trpc";

export const userRouter = router({
  resetPassword: publicProcedure
    .input(z.object({ email: string().email() }))
    .mutation(async ({ input }) => {
      try {
        await userService.startResetPasswordProcess(input.email);
      } catch (error) {
        console.error(error);
        if (error instanceof PublicError) {
          throw error;
        }
        throw new Error("Error resetting password");
      }
      return { message: "Password reset email sent" };
    }),
  changePassword: publicProcedure
    .input(ChangePasswordFormSchema)
    .mutation(async ({ input }) => {
      try {
        await userService.changePassword(input.password, input.token);
      } catch (error) {
        console.error(error);
        if (error instanceof PublicError) {
          throw error;
        }
        throw new Error("Error changing password");
      }
      return { message: "Changed password successfully!" };
    })
});
