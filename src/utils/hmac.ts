import * as crypto from "crypto";
import { URL } from "url";

export function generateHmacAuth(
  clientId: string,
  clientSecret: string,
  method: string,
  fullUrl: string
) {
  // Ensure we extract only the path (e.g., "/qontak/chat/v1/broadcast/whatsapp")
  const parsedUrl = new URL(fullUrl);
  const requestPath = parsedUrl.pathname + parsedUrl.search; // Includes query parameters

  const dateString = new Date().toUTCString();
  const requestLine = `${method.toUpperCase()} ${requestPath} HTTP/1.1`;

  const signatureString = `date: ${dateString}\n${requestLine}`;
  const hmac = crypto.createHmac("sha256", clientSecret);
  hmac.update(signatureString);
  const signature = hmac.digest("base64");

  return {
    authorization: `hmac username="${clientId}", algorithm="hmac-sha256", headers="date request-line", signature="${signature}"`,
    date: dateString,
  };
}
