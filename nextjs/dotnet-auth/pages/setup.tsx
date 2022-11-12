import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { hostData } from "../data/HostData";

export default function Setup() {
  var router = useRouter();
  useEffect(() => {
    var tenant = hostData.find((x) => x.host === location.host);
    if (tenant) {
      setCookie("__tenant", tenant.tenantId);
      router.push("/");
    }
  }, [router]);
  return <></>;
}
