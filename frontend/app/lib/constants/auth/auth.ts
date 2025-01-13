import { signIn } from "next-auth/react";
import { SignInPayload } from "./auth.types";

export const loggingInUser = async (payload: SignInPayload) => {
    return await signIn("credentials", payload);
};

export const USER_ROUTE = "/api/v1/user"