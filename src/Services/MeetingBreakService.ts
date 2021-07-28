import axios from "axios";
import { ParticipantDetailsPayload } from "../Types/API/ParticipantDetailsPayload";
import { BreakDetails } from "../Types/BreakDetails";
import { Duration } from "../Types/Duration";
import { MeetingID } from "../Types/MeetingID";
import { Participant } from "../Types/Participant";
import { ParticipantID } from "../Types/ParticipantID";
import { Role } from "../Types/Role";
import { TenantID } from "../Types/TenantID";

export class MeetingBreakService {
    private apiBaseUrl = process.env.NODE_ENV === "development" ? "https://msteams-meeting-break-bot.eu.ngrok.io/" :"https://api.meetingbreak.app/"

    public async getParticipantDetails(meetingId: MeetingID, participantId: ParticipantID, tenantId: TenantID) {
        const sendParticipantDetailsRequest = await axios.post(`${this.apiBaseUrl}api/sendParticipantDetails`,{
            meetingId: meetingId.value,
            participantId: participantId.value,
            tenantId: tenantId.value
        })
        const participantDetails = sendParticipantDetailsRequest.data as ParticipantDetailsPayload
        const participant: Participant = {
            name: participantDetails.user.name,
            role: participantDetails.meeting.role as Role
        }
        return participant
    }

    public async setBreak(breakDetails: BreakDetails) {
        await axios.post(`${this.apiBaseUrl}api/setBreakDetails`, breakDetails)
    }

    public async getBreak(meetingId: MeetingID) {
        const getBreakRequest = await axios.get(`${this.apiBaseUrl}api/getBreakDetails?meetingId=${encodeURIComponent(meetingId.value)}`)
        let breakDetails = getBreakRequest.data as BreakDetails | undefined
        if (!breakDetails) {
            return breakDetails
        }
        breakDetails.start = new Date(getBreakRequest.data.start)
        breakDetails.duration = new Duration(getBreakRequest.data.duration.minutes, getBreakRequest.data.duration.seconds)
        return breakDetails
    }
}