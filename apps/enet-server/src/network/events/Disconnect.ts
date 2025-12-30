import { IEvent } from "@/abstracts/IEvent";
import type { Server } from "@/core/Server";
import { Debug, ThrowError } from "@/decorators";
import type { Database } from "@growserver/db";
import logger from "@growserver/logger";

export default class EventDisconnect extends IEvent {
  public name: string = "disconnect";
  constructor() {
    super();
  }

  @Debug()
  @ThrowError("Failed to call Disconnect event")
  public async execute(serverID: number, server: Server, database: Database, netID: number) {
    logger.info(`[S-${serverID}] Disconnected netID: ${netID}`);
  }
}
