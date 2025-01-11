import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { USER_ROUTE } from "./constants/auth/auth";
import { postReq } from "./axios-helpers/apiClient";
import { isAxiosError } from "axios";

export const NEXT_AUTH: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'signin',
            credentials: {
                email: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    const payload = { email: credentials?.email, password: credentials?.password }
                    const response = await postReq<{ id: string, email: string, jwt: string }>(`${USER_ROUTE}/signin`, payload)
                    return { id: response.data.id, email: response.data?.email, token: response.data.jwt }
                }
                catch (err) {
                    if (isAxiosError(err)) {
                        throw new Error(err?.response?.data.msg)
                    }
                    return null
                }
            }
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.token
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user.token = token.accessToken ?? ''
            }
            return session
        },

    },
    pages: {
        signIn: '/signin'
    },
}