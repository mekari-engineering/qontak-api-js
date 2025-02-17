export type CursorDirection = "after" | "before"
export type OrderBy = "created_at" | "updated_at"
export type OrderDirection = "asc" | "desc"
export type IsCounted = true | false
export type TargetChannel = "wa" | "email" | "sms" | "wa_cloud" | "fb" | "ig"
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