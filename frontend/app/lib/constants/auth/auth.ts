import { signIn } from "next-auth/react";
import { SignInPayload } from "./auth.types";

export const loggingInUser = async (payload: SignInPayload) => {
    try {
        await signIn("credentials", payload);
    } catch (err) {
        console.log(err);
    }
};

export const USER_ROUTE = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user`