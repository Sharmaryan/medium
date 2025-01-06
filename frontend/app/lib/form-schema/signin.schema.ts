import { emailValidation, passwordValidation } from "../validation-schema";
import { validator } from "../validation-schema/zod";

export const SignInSchema = validator.object({
    email: emailValidation(),
    password: passwordValidation(),
});