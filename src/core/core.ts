import axios, { AxiosInstance, AxiosError } from "axios";
import { generateHmacAuth } from "../utils/hmac"; // Import the HMAC function
import { URL } from "url"; 
import qs from "qs"

const BASE_URL = "https://api.mekari.com/qontak/chat/v1"; 

export interface ApiClientConfig {
  clientId: string;
  clientSecret: string;
}

export class ApiClient {
  private client: AxiosInstance;
  private clientId: string;
  private clientSecret: string;

  constructor(config: ApiClientConfig) {
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;

    this.client = axios.create({
      baseURL: BASE_URL,
      headers: { "Content-Type": "application/json" },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      (config) => {
        // Ensure we get the full URL
        let fullUrl = new URL(`${config.baseURL}${config.url}`).toString();

        if (config.params) {
          const queryString = qs.stringify(config.params, { addQueryPrefix: true });
          fullUrl += queryString; 
        }
        // Generate correct HMAC headers
        const { authorization, date } = generateHmacAuth(
          this.clientId,
          this.clientSecret,
          config.method || "GET",
          fullUrl
        );

        config.headers["Authorization"] = authorization;
        config.headers["Date"] = date;

        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  async request<T>(method: "get" | "post" | "put" | "delete", endpoint: string, data?: object): Promise<T> {
    const response = await this.client.request<T>({
      method,
      url: endpoint,
      ...(method === "get" ? { params: data } : { data }), // Send payload in body for POST/PUT
    });

    return response.data;
  }
}
