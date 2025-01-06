import { validator } from "./zod"

export const passwordValidation = () => {
    return validator.string()
        .min(8, { message: "Password is too short" })
        .max(20, { message: "Password is too long" })
        .refine((value) => /[a-z]/.test(value), {
            message: "Password must include at least one lowercase letter.",
        })
        .refine((value) => /[A-Z]/.test(value), {
            message: "Password must include at least one uppercase letter.",
        })
        .refine((value) => /\d/.test(value), {
            message: "Password must include at least one number.",
        })
        .refine((value) => /[@$!%*?&]/.test(value), {
            message: "Password must include at least one special character.",
        });
}

