import * as rp from "request-promise";
import { IProfile } from "../interfaces/iprofile";
import { CommonApi } from "./common.api";

export class ProfileApi {
    private static readonly ENDPOINT = "/profile";
    
    /**
     * The details for the logged in users profile
     * @param jwtToken The JWT authentication token
     */
    public async details(jwtToken: string): Promise<IProfile> {
        const endpoint: string = CommonApi.buildApiUrlEndpoint(ProfileApi.ENDPOINT);
        return JSON.parse(await rp.get(endpoint)) as IProfile;
    }

    /**
     * Updating the profile details for the logged in user
     * @param profile The profile details to update too
     * @param jwtToken The JWT authentication token
     */
    public async updateDetails(profile: IProfile, jwtToken: string): Promise<void> {
        // to do
    }
}