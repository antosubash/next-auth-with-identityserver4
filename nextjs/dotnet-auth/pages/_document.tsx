import { getCookie } from "cookies-next";
import Document, { DocumentContext, DocumentInitialProps } from "next/document";
import { OpenAPI as ApiOptions } from "../generated/api";
import { getAuthOptions, getServerSession } from "../lib/utils";
class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    var host = ctx?.req?.headers.host;
    if (host) {
      ApiOptions.BASE = "https://localhost:44336";
      ApiOptions.HEADERS = async () => {
        var tenant = getCookie("__tenant", { req: ctx.req });
        return {
          "__tenant": tenant,
        } as Record<string, string>;
      };
    } 
    return initialProps;
  }
}

export default MyDocument;
