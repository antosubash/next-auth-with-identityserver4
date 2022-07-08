import NextAuth from "next-auth";
import IdentityServer4Provider from "next-auth/providers/identity-server4";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    IdentityServer4Provider({
      id: "identity-server4",
      name: "IdentityServer4",
      authorization: {
        params: { scope: "openid profile email NextAuthApp" },
      },
      issuer: process.env.IdentityServer4_Issuer,
      clientId: process.env.IdentityServer4_CLIENT_ID,
      clientSecret: process.env.IdentityServer4_CLIENT_SECRET,
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.SECRET,
  },
  pages: {
    // signIn: '/auth/signin',  // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    // async redirect({ url, baseUrl }) { return baseUrl },
    async session({ session, token, user }) {
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
  events: {},
  // Enable debug messages in the console if you are having problems
  debug: true,
};

export default NextAuth(authOptions);
