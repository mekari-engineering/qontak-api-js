import { ApiClient } from "../core/core";
import { OverrideContactName } from "../types/contact";

export class ContactApi {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  async getContactsList(contact_list_id: string): Promise<any> {
    return this.client.request("get", `/contacts/contact_lists/contacts/${contact_list_id}`);
  }

  async getContactListDetail(contact_list_id: string): Promise<any> {
    return this.client.request("get", `/contacts/contact_lists/${contact_list_id}`);
  }

  async overrideContactName(data: OverrideContactName): Promise<any> {
    return this.client.request("put", `/contacts/contact_lists/override_contact_by_upload`, data);
  }
}
