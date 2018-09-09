import * as rp from "request-promise";
import { IProfile } from "../interfaces/iprofile";
import { CommonApi } from "./common.api";
import { HttpRequest } from ".";
import { IUpdateProfileDetailsRequest } from "../interfaces/api-requests/iupdate-profile-details.request";
import { IUpdateProfileDetailsResponse } from "../interfaces/api-reponses/iupdate-profile-details.response";

export class ProfileApi {
    private static readonly ENDPOINT = "/profile";

    constructor(
        private _httpRequest: HttpRequest,
    ) { }
    
    /**
     * The details for the logged in users profile
     */
    public async details(): Promise<IProfile> {
        const endpoint: string = CommonApi.buildApiUrlEndpoint(ProfileApi.ENDPOINT);
        return await this._httpRequest.get<IProfile>(endpoint);
    }

    /**
     * Updating the profile details for the logged in user
     * @param profile The profile details to update too
     */
    public async updateDetails(profile: IUpdateProfileDetailsRequest): Promise<IUpdateProfileDetailsResponse> {
        const endpoint: string = CommonApi.buildApiUrlEndpoint(ProfileApi.ENDPOINT);
        
        return await this._httpRequest.put<IUpdateProfileDetailsResponse>(endpoint, profile);
    }
}