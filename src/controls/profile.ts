import { ProfileApi } from "../api-wrappers";
import { IProfile } from "../interfaces/iprofile";
import { IUpdateProfileDetailsRequest } from "../interfaces/api-requests/iupdate-profile-details.request";
import { LocalEpmFiles } from "./local-epm-files";
import { IUpdateProfileDetailsResponse } from "../interfaces/api-reponses/iupdate-profile-details.response";

export class Profile {
    constructor(
        private _profileApi: ProfileApi,
        private _localEpmFilesControl: LocalEpmFiles,
    ) { }

    /**
     * Gets the users profile details
     */
    public async details(): Promise<IProfile> {
        return this._profileApi.details();
    }

    /**
     * Updates a users profile details
     * @param profile the new profile details
     */
    public async updateDetails(profile: IUpdateProfileDetailsRequest): Promise<void> {
        const response: IUpdateProfileDetailsResponse = await this._profileApi.updateDetails(profile);
        await this._localEpmFilesControl.saveAuthenticationToken(response.jwtToken);
    }

    public deleteProfile() {
        // think about how this will work
        // npm make you email support, feels wrong to do that
    }
}