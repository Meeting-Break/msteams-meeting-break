import { Context, getContext } from "@microsoft/teams-js"

export default function TeamsContextService(timeout = 10000)  {
    return function () : Promise<Context> {
        return new Promise((resolve, reject) => {
            let shouldReject = true;
            getContext((teamsContext) => {
                shouldReject = false;
                resolve(teamsContext);
            });
            setTimeout(() => {
                if (shouldReject) {
                    console.error("Error getting context: Timeout. Make sure you are running the app within teams context and have initialized the sdk");
                    reject("Error getting context: Timeout");
                }
            }, timeout);
        });
    }
}
