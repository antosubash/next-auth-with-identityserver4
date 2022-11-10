import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { setCookie } from 'cookies-next'
function MyApp({ Component, pageProps : { session, ...pageProps } }: AppProps) {
  setCookie("next-auth.issuer", "https://localhost:44336");
  return <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
}

export default MyApp
