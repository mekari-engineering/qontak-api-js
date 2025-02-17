import { ApiClient } from "../core/core";
import { GetBroadcastList } from "../types/broadcast";

export class BroadcastApi {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  async getBroadcastList(data: GetBroadcastList): Promise<any> {
    return this.client.request("get", "/broadcasts/whatsapp", data);
  }

  async getBroadcastLog(broadcast_id: string): Promise<any> {
    return this.client.request("get", `/broadcasts/${broadcast_id}/whatsapp/log`);
  }

  async getBroadcastDetail(broadcast_id: string): Promise<any> {
    return this.client.request("get", `/broadcasts/${broadcast_id}/whatsapp`);
  }

  async createBroadcastDirect(data: string): Promise<any> {
    return this.client.request("post", `/broadcasts/whatsapp/direct}`);
  }
}
