import { CursorDirection, OrderBy, OrderDirection, RoomResponseStatus, RoomSession, RoomStatus, RoomTarget, ModelsRoomType, TargetChannel, RoomType } from "./general";


export interface RoomList {
  query?: string;
  status?: RoomStatus
  sessions?: RoomSession
  tags?: string[]
  user_ids?: string[]
  channels?: TargetChannel[]
  untagged?: boolean
  response_status?: RoomResponseStatus[]
  cursor?: string;
  cursor_direction?: CursorDirection
  type?: ModelsRoomType[]
  start_date?: string
  end_date?: string
  time_offset?: number
  offset?: string
  limit?: string
}

export interface AssignableAgentRoom {
  query?: string;
  offset?: string
  limit?: string
  cursor?: string;
  cursor_direction?: CursorDirection
  status?: RoomStatus
  sessions?: RoomSession
  tags?: string[]
  user_ids?: string[]
  channels?: TargetChannel[]
  untagged?: boolean
  response_status?: RoomResponseStatus[]
  type?: ModelsRoomType[]
  start_date?: string
  end_date?: string
  time_offset?: number
  order_by?: OrderBy
  order_direction?: OrderDirection
  is_online?: boolean
}


export interface RoomSpecifInfo {
  target: RoomTarget
  type?: RoomType
}

export interface UpdateRoomAutoResolve {
  is_dont_auto_resolve: boolean
}

export interface RenameRoom {
  name: string
}

export interface AsignAnotherAgent {
  enabled: boolean
}

export interface TagRoom {
  name: string
}