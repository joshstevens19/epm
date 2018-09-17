import * as fs from "fs-extra";
import { Locations } from "../common/locations";
import { LocalEpmFiles } from "./local-epm-files";
import { IJwtDetails } from "../interfaces/ijwt-details";
import * as jwt_decode from "jwt-decode";

export class Jwt {
    constructor(
        private _localEpmFiles: LocalEpmFiles,
    ) { }

    /**
     * Gets the JWT token
     */
    public async getJwtToken(): Promise<string | null> {
        if (this._localEpmFiles.authenticationFileExists()) {
            const jwtDetails: IJwtDetails = await this.getJwtDetails();

            return jwtDetails.jwtToken;
        }

        return null;
    }

    /**
     * Get the created on date for the JWT
     */
    public async getJwtCreatedOnDate(): Promise<Date | null> {
        if (this._localEpmFiles.authenticationFileExists()) {
            const jwtDetails: IJwtDetails = await this.getJwtDetails();

            return jwtDetails.createdOn;
        }

        return null;
    }

    /**
     * Gets the jwt details 
     */
    public async getJwtDetails(): Promise<IJwtDetails> {
        return JSON.parse(await fs.readFile(Locations.epmUserHomeAuthenticationFileLocation, 'utf8')) as IJwtDetails;
    }

    /**
     * Returns the decoded JWT token
     * This was chosen to be a `any` for a reason
     */
    public async decodeJwt(): Promise<any> {
        const jwtToken = await this.getJwtToken();
        if (jwtToken !== null) {
            return jwt_decode(jwtToken);
        }

        return null;
    }

    /**
     * Get JWT token expiry date (it could be in the pass)
     * This does not validate if the token is correct 
     */
    public async getJwtExpiryDate(): Promise<Date | null> {
        const jwtUnpacked = await this.decodeJwt();
        if (jwtUnpacked !== null) {
            return new Date(jwtUnpacked.exp * 1e3);
        }

        return null;
    }

    /**
     * Removes the authentication file from the users computer 
     */
    public async deleteJwtAuthentication(): Promise<void> {
        if (this._localEpmFiles.authenticationFileExists()) {
            fs.remove(Locations.epmUserHomeAuthenticationFileLocation);
        }
    }
}