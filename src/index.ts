import { ApiClient, ApiClientConfig } from "./core/core";
import { BroadcastApi } from "./resources/broadcast";
import { ContactBlockApi } from "./resources/contact_block";
import { ContactApi } from "./resources/contact";
import { IntegrationApi } from "./resources/integration";
import { RoomApi } from "./resources/room";
import { UserApi } from "./resources/user";
import { FileUploaderApi } from "./resources/file_uploader";
import { TemplateApi } from "./resources/template";

export class QontakClient {
  public broadcast: BroadcastApi;
  public contact: ContactApi;
  public contact_block: ContactBlockApi;
  public integration: IntegrationApi;
  public room: RoomApi;
  public user: UserApi;
  public file_uploader: FileUploaderApi;
  public template: TemplateApi;

  constructor(config: ApiClientConfig) {
    if (!config) {
      throw new Error('Config is required');
    }

    if (!config.clientId) {
      throw new Error('clientId is required');
    }

    if (!config.clientSecret) {
      throw new Error('clientSecret is required');
    }

    const apiClient = new ApiClient(config);
    this.broadcast = new BroadcastApi(apiClient);
    this.contact = new ContactApi(apiClient);
    this.contact_block = new ContactBlockApi(apiClient);
    this.integration = new IntegrationApi(apiClient);
    this.room = new RoomApi(apiClient);
    this.user = new UserApi(apiClient);
    this.file_uploader = new FileUploaderApi(apiClient);
    this.template = new TemplateApi(apiClient);
  }
}
