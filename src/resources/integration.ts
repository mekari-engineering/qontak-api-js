import { ApiClient } from "../core/core";
import { IntegrationList } from "../types/integration";

export class IntegrationApi {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  async getIntegrationList(data: IntegrationList): Promise<any> {
    return this.client.request("get", `/integrations`, data);
  }

  async getIntegrationById(integration_id: string): Promise<any> {
    return this.client.request("get", `/integrations/${integration_id}`);
  }

}
