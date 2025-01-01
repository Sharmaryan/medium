import axios from "axios";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
export const NEXT_AUTH:AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const payload = {email: credentials?.email, password: credentials?.password}
                axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/signup`)
                console.log(payload)
                return null
            }
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:'/signin'
    },
}