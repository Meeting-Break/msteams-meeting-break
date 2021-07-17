import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
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
    private azureStorageSASUrl = "https://meetingbreakstorage.blob.core.windows.net/?sv=2020-08-04&ss=b&srt=co&sp=rwlactfx&se=3000-07-05T01:14:41Z&st=2021-07-04T17:14:41Z&spr=https&sig=6WhG1J4caW%2FvRrBbzucTuAlmNfkVsNzg%2Fz8y0vKpJEg%3D"
    private apiBaseUrl = process.env.API_BASE_URL ?? "https://msteams-meeting-break-bot.eu.ngrok.io/"
    private meetingBreaksContainerClient: ContainerClient

    constructor() {
        const blobServiceClient = new BlobServiceClient(this.azureStorageSASUrl)
        this.meetingBreaksContainerClient = blobServiceClient.getContainerClient("meeting-breaks")
    }

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

    public async upload(breakDetails: BreakDetails) {
        const breakDetailsJson = JSON.stringify(breakDetails)
        const blockBlobContainer = this.meetingBreaksContainerClient.getBlockBlobClient(`${breakDetails.meeting.id.value}.json`)
        await blockBlobContainer.upload(breakDetailsJson, breakDetailsJson.length)
    }

    public async download(id: MeetingID) {
        try {
            const blobContainer = this.meetingBreaksContainerClient.getBlobClient(`${id.value}.json`)
            const data = await (await (await blobContainer.download()).blobBody)?.text()
            const parsedData = JSON.parse(data!);
            const breakDetails: BreakDetails = parsedData;
            breakDetails.start = new Date(parsedData.start)
            breakDetails.duration = new Duration(parsedData.duration.minutes, parsedData.duration.seconds)
            return breakDetails;
        } catch(e) {
            return undefined;
        }
    }
}