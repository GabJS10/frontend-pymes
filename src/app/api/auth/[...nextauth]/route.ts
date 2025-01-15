import { BACKEND_URL } from "@/constants/constants";
import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials"


async function getNewToken(token:JWT) {

    const res = await fetch(`${BACKEND_URL}/auth/refresh/`, {
        method: "POST",
        headers: {
            authorization: `Refresh ${token.backendTokens.refreshToken}`,
            "Content-Type": "application/json",
        }
    });

    if (res.status === 401) {
        return token
    }

    const newToken = await res.json()

    return newToken
    
}

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email" },
                password: {  label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password) return null
                
                const res = await fetch(`${BACKEND_URL}/auth/login/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(credentials),
                });
                
                if (res.status === 401) {
                    console.log("credebcuas");
                    
                    return null;
                }

                const user = await res.json()
                 
                
                return user
            }
        })
              
    ],
    callbacks: {
        async jwt({ token, user }) {
            
            if(user) return {...token, ...user}
            
            if (new Date().getTime() < token.expiresIn) {
                return token
            }

            
            const newToken = await getNewToken(token)
            
            return {
                ...token,
                backendTokens:{
                    ...token.backendTokens,
                    token: newToken.token,
                },
                expiresIn: newToken.expiresIn
            }

        },

        async session({ session, token }) {
            session.user = token.user
            session.backendTokens = token.backendTokens
            session.expiresIn = token.expiresIn
            
            return session
        }

        
    },
    pages: {
        signIn: '/singIn',
    }
}

const handler = NextAuth(authOptions);

// Exporta las funciones HTTP necesarias
export { handler as GET, handler as POST };