import registerFormZod from "@/model/zod/auth/register/registerForm.zod";
import { registerService } from "@/server/services/auth/register.service";
import { z } from "zod";
import { publicProcedure, router } from "../../trpc";
import { PublicError } from "@/model/trpc/publicError";

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
