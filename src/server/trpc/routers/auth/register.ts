import { PublicError } from "@/model/trpc/publicError";
import registerFormZod from "@/model/zod/auth/register/registerForm.zod";
import { registerService } from "@/server/services/auth/register.service";
import { publicProcedure, router } from "../../trpc";

export const registerRouter = router({
  registerUser: publicProcedure
    .input(registerFormZod)
    .mutation(async ({ input }) => {
      try {
        await registerService.createUser(input.email, input.password);
      } catch (error) {
        console.error(error);
        if (error instanceof PublicError) {
          throw error;
        }
        throw new Error("Error registering user");
      }

      return {
        message: "User registered, email sent to verify account"
      };
    })
});
