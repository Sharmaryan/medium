import 'next-auth'

declare module 'next-auth' {
    interface User {
        token: string
    }
    interface Session {
        user: {
            token: string
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string
    }
  }