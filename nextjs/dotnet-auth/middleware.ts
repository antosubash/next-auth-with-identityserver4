import { withAuth } from "next-auth/middleware"
import { NextRequest, NextResponse } from "next/server";

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth(
  function middleware(request: NextRequest) {
     console.log("middleware.ts: response.url: ", request.url);
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        console.log("middleware.ts: response.url: ", req.url);
        console.log("middleware.ts: response.url: ", token);
        // /admin requires admin role, but /me only requires the user to be logged in.
        return req.nextUrl.pathname !== "/admin" || token?.userRole === "admin";
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|favicon.ico).*)",
  ],
};