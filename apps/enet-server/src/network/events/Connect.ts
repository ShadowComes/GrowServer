import { IEvent } from "@/abstracts/IEvent";
import { Peer } from "@/core/Peer";
import type { Server } from "@/core/Server";
import { Debug, ThrowError } from "@/decorators";
import type { Database } from "@growserver/db";
import logger from "@growserver/logger";
import { TextPacket } from "growtopia.js";

export default class EventConnect extends IEvent {
  public name: string = "connect";
  constructor() {
    super();
  }

  @Debug()
  @ThrowError("Failed to call Connect event")
  public async execute(serverID: number, server: Server, database: Database, netID: number) {
    logger.info(`[S-${serverID}] Connected netID: ${netID}`);

    const peer = new Peer(server, netID);
    this.sendHelloPacket(peer);
  }

  @Debug()
  @ThrowError("Failed to send HelloPacket to client")
  private async sendHelloPacket(peer: Peer) {
    return peer.send(TextPacket.from(0x1));
  }
}
