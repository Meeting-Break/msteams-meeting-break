import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { BreakDetails } from "../Types/BreakDetails";
import { MeetingID } from "../Types/MeetingID";

export class MeetingBreakService {
    private azureStorageSASUrl = "https://meetingbreakstorage.blob.core.windows.net/?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacuptfx&se=3000-07-04T01:24:35Z&st=2021-07-03T17:24:35Z&spr=https&sig=VpGZeJwhOAJSzgJmjDHInhzBbHs2kh8eAO7Ls0iGUng%3D"
    private meetingBreaksContainerClient: ContainerClient

    constructor() {
        const blobServiceClient = new BlobServiceClient(this.azureStorageSASUrl)
        this.meetingBreaksContainerClient = blobServiceClient.getContainerClient("meeting-breaks")
    }

    public async upload(breakDetails: BreakDetails) {
        const breakDetailsJson = JSON.stringify(breakDetails)
        const blockBlobContainer = this.meetingBreaksContainerClient.getBlockBlobClient(`${breakDetails.meeting.id.value}.json`)
        await blockBlobContainer.upload(breakDetailsJson, breakDetailsJson.length)
    }

    public async download(id: MeetingID) {
        const blockBlobContainer = this.meetingBreaksContainerClient.getBlockBlobClient(`${id.value}.json`)
        const data = await (await (await blockBlobContainer.download()).blobBody)?.text()
        if (!data)
            return;
        return JSON.parse(data);
    }
}