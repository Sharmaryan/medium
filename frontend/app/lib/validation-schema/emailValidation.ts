import { validator } from "./zod";

export const emailValidation = () => {
    return validator.string().email()
}