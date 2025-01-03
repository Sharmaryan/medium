import { signIn } from "next-auth/react";
import { SignInPayload } from "./constants.types";

export const loggingInUser = async (payload: SignInPayload) => {
    try {
        await signIn("credentials", payload);
    } catch (err) {
        console.log(err);
    }
};