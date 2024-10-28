import registerFormZod from "@/model/zod/auth/register/registerForm.zod";
import { publicProcedure, router } from "../../trpc";

export const registerRouter = router({
  registerUser: publicProcedure.input(registerFormZod).mutation(async ({ input }) => {
    console.log(input);
    return input;
  })
});
