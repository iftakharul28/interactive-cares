import { loginSchema } from "@/helper/auth";
import GoogleProvider from "next-auth/providers/google";
import { comparePassword } from "@/helper/bcrypt";
import { prisma } from "@/helper/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.userId = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.userId;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "admin@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "******",
        },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await loginSchema.parseAsync(credentials);
          const result = await prisma.user.findUnique({
            where: { email },
          });
          if (!result) return null;
          const isValidPassword = comparePassword(password, result?.password || "");
          if (!isValidPassword) return null;
          return {
            id: Math.floor(Math.random() * 20).toString(),
            email: result?.email,
            name: result?.name,
          };
        } catch {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};
export default NextAuth(authOptions);
