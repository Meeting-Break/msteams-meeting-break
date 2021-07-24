import { Duration } from "./Duration";
import { MeetingDetails } from "./MeetingDetails";
import { Participant } from "./Participant";

export interface BreakDetails {
    meeting: MeetingDetails;
    start: Date;
    duration: Duration;
    cancelled: boolean;
    createdBy: Participant;
}