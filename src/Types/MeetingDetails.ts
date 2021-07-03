import { MeetingID } from "./MeetingID";
import { Participant } from "./Participant";

export interface MeetingDetails {
    id: MeetingID
    participants?: [Participant]
}