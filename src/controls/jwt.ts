import * as fs from "fs-extra";
import { Locations } from "../common/locations";
import { LocalEpmFiles } from "./local-epm-files";
import { IJwtDetails } from "../interfaces/ijwt-details";

export class Jwt {
    constructor(
        private _localEpmFiles: LocalEpmFiles,
    ) { }

    /**
     * Gets the JWT token
     */
    public async getJwtToken(): Promise<string | null> {
        if (this._localEpmFiles.authenticationFileExists()) {
            const jwtDetails: IJwtDetails = JSON.parse(await fs.readFile(Locations.epmUserHomeAuthenticationFileLocation, 'utf8')) as IJwtDetails;

            return jwtDetails.jwtToken;
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