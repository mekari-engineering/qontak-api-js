import { ApiClient } from "../core/core";
import { createWhatsappHSMTemplate, createWhatsappTemplate, getListWhatsappTemplate, getWhatsappLanguages } from "../types/template";

export class TemplateApi {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  async getListTemplateCategory(): Promise<any> {
    return this.client.request("get", `/templates/category`);
  }

  async getListTemplateLanguage(): Promise<any> {
    return this.client.request("get", `/templates/language`);
  }

  async getListTemplateLanguages(data: getWhatsappLanguages): Promise<any> {
    return this.client.request("get", `/templates/languages`, data);
  }

  async getListWhatsappTemplate(data: getListWhatsappTemplate): Promise<any> {
    return this.client.request("get", `/templates/whatsapp`, data);
  }

  async createWhatsappTemplate(data: createWhatsappTemplate): Promise<any> {
    return this.client.request("post", `/templates/whatsapp`, data);
  }

  async getWhatsappTemplateById(template_id: string): Promise<any> {
    return this.client.request("get", `/templates/${template_id}/whatsapp`);
  }

  async createWhatsappHSMTemplate(data: createWhatsappHSMTemplate): Promise<any> {
    return this.client.request("post", `/templates/whatsapp/hsm_chat`, data);
  }
}
