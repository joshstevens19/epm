import { HttpRequest } from "./http-request";

export class SearchApi {
    constructor(
        private _httpRequest: HttpRequest
    ) { }

    // this will need to be a interface once written the backend search api
    // and decided on what the interface will return 
    public async queryByProjectName(projectName: string): Promise<void> {

    }
}