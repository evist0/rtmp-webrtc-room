import { makeAutoObservable } from "mobx";
import { EventModel } from "../../models/EventModel";

export enum StreamType {
  RTMP = "RTMP",
  WebRTC = "WebRTC",
}

export class StudioStore {
  roomId?: string;

  streamType: StreamType = StreamType.WebRTC;

  constructor() {
    makeAutoObservable(this);
  }

  get invitationLink() {
    return `${window.location.origin}/room/${this.roomId}`;
  }

  get rtmpLink() {
    return `rtmp://${window.location.host}/live`;
  }

  async createEvent(event: EventModel) {
    try {
      const response = await fetch("/api/rooms/createEvent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });
      const responseBody = await response.json();

      this.roomId = responseBody.roomId;
      this.streamType = event.streamType;
    } catch (e) {
      console.log(e);
    }
  }
}
