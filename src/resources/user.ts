import { ApiClient } from "../core/core";
import { OverrideContactName } from "../types/contact";
import { getListUser } from "../types/user";

export class UserApi {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  async getListUser(data: getListUser): Promise<any> {
    return this.client.request("get", `/users`, data);
  }
}
