import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "QuieTravel",
      credentials: {
        name: { label: "Nome", type: "text", placeholder: "Come ti chiami?" },
      },
      async authorize(credentials) {
        if (!credentials?.name || credentials.name.trim().length === 0) {
          return null;
        }

        // Find or create user
        const email = `user-${credentials.name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}@quiettravel.app`;

        let user = await prisma.user.findFirst({
          where: {
            email: {
              startsWith: `user-${credentials.name.toLowerCase().replace(/\s+/g, "-")}`,
            },
          },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              name: credentials.name,
              email,
            },
          });

          // Create initial stats
          await prisma.userStats.create({
            data: {
              userId: user.id,
            },
          });
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
