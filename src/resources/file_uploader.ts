import { ApiClient } from "../core/core";
import { FileUpload } from "../types/file_uploader";

export class FileUploaderApi {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  async uploadFile(data: FileUpload): Promise<any> {
    const formData = new FormData();
    formData.append("file", data.file);
    return this.client.request("post", `/file_uploader`, formData, {
      "Content-Type": "multipart/form-data",
    });
  }
}
