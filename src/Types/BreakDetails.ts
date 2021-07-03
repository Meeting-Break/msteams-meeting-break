import { Duration } from "./Duration";
import { MeetingDetails } from "./MeetingDetails";

export interface BreakDetails {
    meeting: MeetingDetails
    start: Date,
    duration: Duration,
    cancelled: boolean
}