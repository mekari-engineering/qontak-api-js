import * as crypto from "crypto";
import qs from "qs";
import { URL } from "url";

export function generateHmacAuth(
  clientId: string,
  clientSecret: string,
  method: string,
  fullUrl: string
) {
  // Ensure we extract only the path (e.g., "/qontak/chat/v1/broadcast/whatsapp")
  const parsedUrl = new URL(fullUrl);

  const parsedParams = qs.parse(parsedUrl.search, { ignoreQueryPrefix: true });
  const fixedQuery = qs.stringify(parsedParams, { arrayFormat: "brackets" });
  const decodedQuery = decodeURIComponent(fixedQuery);
  const requestPath = parsedUrl.pathname + (decodedQuery ? `?${decodedQuery}` : '');
  const dateString = new Date().toUTCString();
  const requestLine = `${method.toUpperCase()} ${requestPath} HTTP/1.1`;
  console.log("request line", requestLine)
  const signatureString = `date: ${dateString}\n${requestLine}`;
  const hmac = crypto.createHmac("sha256", clientSecret);
  hmac.update(signatureString);
  const signature = hmac.digest("base64");

  return {
    authorization: `hmac username="${clientId}", algorithm="hmac-sha256", headers="date request-line", signature="${signature}"`,
    date: dateString,
  };
}
