import _NextAuth from "next-auth";
import { _JWT } from "next-auth/jwt";

enum Roles {
    ADMIN = 'ADMIN',
    USER_BUSSINESS = 'USER_BUSSINESS',
    USER_CLIENT = 'USER_CLIENT',
}

declare module "next-auth" {
    interface Session {
        user: {
            id: number;
            userName: string;
            email: string;
            role: Roles[]
        };
        backendTokens: {
            token: string,
            refreshToken: string
        }
        expiresIn:number
    }

}



declare module "next-auth/jwt" {
    interface JWT {
        user: {
            id: number;
            userName: string;
            email: string;
            role: Roles[]
        };
        backendTokens: {
            token: string,
            refreshToken: string
        }
        expiresIn:number
    }
}