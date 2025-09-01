/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/require-await */


import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { prisma } from "@/lib/prisma";

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "email", type: "text" },
				password: { label: "password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) {
					throw new Error("Invalid credentials");
				}
			const user = await prisma.user.findUnique({
				where: {
						email: credentials.email,
					},
			});
				if (!user?.hashedPassword) {
					throw new Error("Invalid credentials");
				}
				const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);
				if (!isCorrectPassword) {
					throw new Error("Invalid credentials");
				}
				return user;
			},
		}),
	],
	debug: process.env.NODE_ENV === "development",
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET,
callbacks: {
  redirect({ url, baseUrl }) {
    if (url.startsWith(baseUrl)) return url;
    return baseUrl;
  },
  // eslint-disable-next-line @typescript-eslint/require-await
  async session({ session }) {
    return session;
  },
  // eslint-disable-next-line @typescript-eslint/require-await
  async jwt({ token, account }) {
    if (account) token.account = account;
    return token;
  },
}


};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
