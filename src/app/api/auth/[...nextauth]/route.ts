import NextAuth from "next-auth/next";
import { authOptions } from "@/app/utils/authOptions";


const handler = NextAuth(authOptions);

// Exporta las funciones HTTP necesarias
export { handler as GET, handler as POST };