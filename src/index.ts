import { ApiClient, ApiClientConfig } from "./core/core";
import { BroadcastApi } from "./resources/broadcast";
import { ContactBlockApi } from "./resources/contact_block";
import { ContactApi } from "./resources/contacts";
export class QontakSDK {
  public broadcast: BroadcastApi;
  public contact: ContactApi;
  public contact_block: ContactBlockApi;


  constructor(config: ApiClientConfig) {
    const apiClient = new ApiClient(config);
    this.broadcast = new BroadcastApi(apiClient);
    this.contact = new ContactApi(apiClient);
    this.contact_block = new ContactBlockApi(apiClient)
  }
}
