import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { getCookie, setCookie } from "cookies-next";
import {
  AbpApplicationConfigurationService,
  OpenAPI as ApiOptions,
} from "../generated/api";
import { useEffect } from "react";
import { getTenant } from "../lib/utils";
import { hostData } from "../data/HostData";
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  setCookie("next-auth.issuer", "https://localhost:44336");
  if (typeof window !== "undefined") {
    ApiOptions.BASE = "https://localhost:44336";
    if (location.host) {
      var tenant = hostData.find((x) => x.host === location.host);
      if (tenant) {
        setCookie("__tenant", tenant.tenantId);
      }
      console.log("🚀 ~ file: _app.tsx ~ line 16 ~ MyApp ~ tenant", tenant);
    }

    // if (tenant) {
    //   ApiOptions.HEADERS = {
    //     __tenant: tenant,
    //   } as Record<string, string>;
    // }
  }
  useEffect(() => {
    AbpApplicationConfigurationService.abpApplicationConfigurationGet().then(
      (res) => {}
    );
  }, []);
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
