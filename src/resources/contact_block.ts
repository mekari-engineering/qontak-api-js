import { ApiClient } from "../core/core";
import { BlockContactFromRoom, RemoveBlockContact } from "../types/contact_block";

export class ContactBlockApi {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  async blockContact(data: BlockContactFromRoom): Promise<any> {
    return this.client.request("post", `/contact_block`, data);
  }

  async removeBlockContact(data: RemoveBlockContact,contact_id: string): Promise<any> {
    return this.client.request("delete", `/contact_block/${contact_id}`, data);
  }
}
