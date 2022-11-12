import IdentityServer4Provider from "next-auth/providers/identity-server4";
import { NextAuthOptions, unstable_getServerSession } from "next-auth";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { getCookie } from "cookies-next";
import { hostData } from "../data/HostData";
export const getAuthOptions = (req: any, res: any) => {
  var issuer = getCookie("next-auth.issuer", { req, res }) as string;
  if (!issuer) throw new Error("issuer not found in cookies");
  const authOptions: NextAuthOptions = {
    providers: [
      IdentityServer4Provider({
        id: "identity-server4",
        name: "IdentityServer4",
        authorization: {
          params: { scope: "openid profile email NextAuthApp" },
        },
        issuer: issuer,
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
      async signIn() {
        return true;
      },
      async session({ session, token }) {
        session.accessToken = token.accessToken;
        return session;
      },
      async jwt({ token, account }) {
        if (account) {
          token.accessToken = account.access_token!;
        }
        return token;
      },
    },
    events: {},
    // Enable debug messages in the console if you are having problems
    debug: true,
  };

  return authOptions;
};

export const getServerSession = async (context: GetServerSidePropsContext) => {
  var authOptions = getAuthOptions(context.req, context.res);
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  return session;
};

export const getTenant = (host: string) => {
  var tenant = hostData.find((x) => x.host == host);
  if (!tenant) throw new Error("tenant not found");
  return tenant;
};
