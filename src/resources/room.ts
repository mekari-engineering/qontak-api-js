import { ApiClient } from "../core/core";
import { AsignAnotherAgent, AssignableAgentRoom, RenameRoom, RoomList, RoomSpecifInfo, TagRoom, UpdateRoomAutoResolve } from "../types/room";

export class RoomApi {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  async getListRoom(data: RoomList): Promise<any> {
    return this.client.request("get", `/rooms`, data);
  }

  async getListExpiredRoom(): Promise<any> {
    return this.client.request("get", `/rooms/list/expired`);
  }

  async getAssignableAgentRoom(room_id: string, data: AssignableAgentRoom): Promise<any> {
    return this.client.request("get", `/rooms/${room_id}/agents/assignable`, data);
  }

  async getRoomSpecificInfo(data: RoomSpecifInfo): Promise<any> {
    return this.client.request("get", `/rooms/specific/info`, data);
  }

  async getDetailRoom(room_id: string): Promise<any> {
    return this.client.request("get", `/rooms/${room_id}`);
  }

  async getRoomParticipant(room_id: string): Promise<any> {
    return this.client.request("get", `/rooms/${room_id}/participants`);
  }

  async getRoomHistories(room_id: string): Promise<any> {
    return this.client.request("get", `/rooms/${room_id}/histories`);
  }

  async updateRoomAutoResolve(room_id: string, data: UpdateRoomAutoResolve): Promise<any> {
    return this.client.request("put", `/rooms/${room_id}/histories`, data);
  }

  async makAllReadMessage(room_id: string): Promise<any> {
    return this.client.request("put", `/rooms/${room_id}/mark_all_as_read`);
  }

  async renameRoom(room_id: string, data: RenameRoom): Promise<any> {
    return this.client.request("put", `/rooms/${room_id}/mark_all_as_read`, data);
  }

  async resolveExpiredRoom(): Promise<any> {
    return this.client.request("put", `/rooms/resolve_expired`);
  }

  async markRoomAsResolved(room_id: string): Promise<any> {
    return this.client.request("put", `/rooms/${room_id}/resolve`);
  }

  async allowAgentAsignAnotherAgent(data: AsignAnotherAgent): Promise<any> {
    return this.client.request("put", `/rooms/agent_assign_another_agent`, data);
  }

  async agentAutoTakeOverRoom(): Promise<any> {
    return this.client.request("post", `/rooms/auto_takeover`);
  }

  async agentHandoverRoom(room_id: string, agent_id: string): Promise<any> {
    return this.client.request("post", `/rooms/${room_id}/agents/${agent_id}`);
  }

  async unassignAgent(room_id: string, agent_id: string): Promise<any> {
    return this.client.request("delete", `/rooms/${room_id}/agents/${agent_id}`);
  }

  async tagRoom(room_id: string, data: TagRoom): Promise<any> {
    return this.client.request("post", `/rooms/${room_id}/tags`, data);
  }

  async untagRoom(room_id: string): Promise<any> {
    return this.client.request("delete", `/rooms/${room_id}/tags`);
  }

  async agentTakeOverRoom(room_id: string): Promise<any> {
    return this.client.request("post", `/rooms/${room_id}/takeover`);
  }

  async botAssignRoundRobin(room_id: string): Promise<any> {
    return this.client.request("post", `/rooms/${room_id}/assign_round_robin`);
  }
}
