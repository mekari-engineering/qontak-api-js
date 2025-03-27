import { CursorDirection, OrderBy, OrderDirection, TargetChannel } from "./general";

export interface IntegrationList {
  target_channel?: TargetChannel
  all?: boolean
  query?: string; 
  offset?: string;
  limit?: number;
  cursor?: string;
  cursor_direction?: CursorDirection
  order_by?: OrderBy
  order_direction?: OrderDirection
  }