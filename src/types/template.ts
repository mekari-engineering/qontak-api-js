import { Category, CursorDirection, OrderBy, OrderDirection, TemplateStatus, UserRole } from "./general";

export type Enabled = true | false

export interface getWhatsappLanguages {
  query?: string; 
  offset?: string
  limit?: string
  cursor?: string;
  cursor_direction?: CursorDirection
  order_by?: OrderBy
  order_direction?: OrderDirection
  role?: UserRole
  is_counted?: boolean
  }

  export interface getListWhatsappTemplate {
    query?: string; 
    offset?: string
    limit?: string
    cursor?: string;
    cursor_direction?: CursorDirection
    order_by?: OrderBy
    order_direction?: OrderDirection
    status?: string
    hsm_chat?: boolean
    is_counted?: boolean
    excluded_category?: Category[]
    category?: Category[]
    statuses?: TemplateStatus[]
}

export interface Example {
  body_text: string[];
  header_text: string[];
  header_handle: string[];
}

export interface Button {
  type: string;
  text: string;
  url: string;
  phone_number: string;
  otp_type: string;
  example: string[];
}

export interface Component {
  type: string;
  text: string;
  format: string;
  add_security_recommendation: boolean;
  code_expiration_minutes: number;
  example: Example;
  buttons: Button[];
}

export interface Attribute {
  components: Component[];
  language: string;
}

export interface createWhatsappTemplate {
  name: string;
  category: string;
  attributes: Attribute[];
}


export interface HSMComponent {
  type: string;
  text: string;
  format: string;
}

export interface HSMAttribute {
  components: HSMComponent[];
  language: string;
}

export interface createWhatsappHSMTemplate {
  name: string;
  category: string;
  attributes: HSMAttribute[];
}