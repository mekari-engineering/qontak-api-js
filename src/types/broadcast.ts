import { CursorDirection, OrderBy, OrderDirection, TargetChannel } from "./general"

export type IsCounted = true | false
export type ExecuteTypes = "immediately" | "specific" | "campaign_plan"

export interface GetBroadcastList {
    query?: string; 
    offset?: string;
    limit?: number;
    cursor?: string;
    cursor_direction?: CursorDirection
    order_by?: OrderBy
    order_direction?: OrderDirection
    is_counted?: IsCounted
    category?: string
    start_date?: string
    end_date?: string
    target_channel?: TargetChannel[]
    execute_types?: ExecuteTypes[]

  }