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
  if (typeof window !== "undefined") {
    ApiOptions.BASE = "https://localhost:44336";
    if (location.host) {
      var tenant = hostData.find((x) => x.host === location.host);
      if (tenant) {
        setCookie("__tenant", tenant.tenantId);
      }
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
