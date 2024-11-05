import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(req) {
				console.log(req);
				// Add logic here to look up the user from the credentials supplied
				const user = {
					id: Math.random().toString().slice(2, 23),
					email: req?.email || null,
					password: req?.password || null,
				};

				if (user) {
					// Any object returned will be saved in `user` property of the JWT
					return user;
				} else {
					// If you return null then an error will be displayed advising the user to check their details.
					return null;

					// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
				}
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID!,
			clientSecret: process.env.GOOGLE_SECRET!,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
			profile(profile) {
				return {
					id: profile.sub,
					name: profile.name,
					email: profile.email,
					image: profile.picture,
				};
			},
		}),
		GithubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
			allowDangerousEmailAccountLinking: true,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
			profile(profile) {
				return {
					id: profile.id.toString(),
					name: profile.name || profile.login,
					email: profile.email,
					image: profile.avatar_url,
				};
			},
		}),
	],
	pages: {
		signIn: "/auth/signin",
		signOut: "/auth/signout",
	},
	callbacks: {
		async jwt({ token, user, account }) {
			if (user) {
				token.id = user.id;
				token.accType = account?.provider! || "";
			}
			console.log(token);
			return token;
		},
		async session({ session, token }) {
			if (token?.id) {
				// session.user.name = token.name;
				// session.user.id = token.id.toString();
				// session.user.accType = token.accType || "";
			}
			return session;
		},
	},
	session: {
		strategy: "jwt",
		maxAge: 60 * 60 * 24 * 5,
	},
	secret: process.env.NEXTAUTH_SECRET!,
};
