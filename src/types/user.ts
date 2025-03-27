import { CursorDirection, OrderBy, OrderDirection, UserRole } from "./general";

export type Enabled = true | false

export interface getListUser {
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