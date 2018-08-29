import * as fs from "fs-extra";
import { Locations } from "../common/locations";

export class LocalEpmFiles {

    public async saveAuthenticationToken(jwtToken: string): Promise<void> {
        // create epm authenticaton folder if it does not exist
        this.createEpmLocalAuthenticationFolder();

        const authenticationBody = {
            jwtToken,
            createdOn: new Date(),
        }

        await fs.writeFile(Locations.epmUserHomeAuthenticationFileLocation, JSON.stringify(authenticationBody, null, 4));
    }

    /**
     * Creates the epm local folder (if it does not already exist)
     */
    private createEpmLocalFolder(): void {
        const epmLocation = Locations.epmUserHomeDir;
        if (!fs.existsSync(epmLocation)) {
            fs.mkdirSync(epmLocation);
        }
    }

    /**
     * Creates the epm local authentication folder (if it does not already exist)
     */
    private createEpmLocalAuthenticationFolder(): void {
        this.createEpmLocalFolder();
        const epmAuthenticationFolder = Locations.epmUserHomeDirAuthenticationLocation;
        if (!fs.existsSync(epmAuthenticationFolder)) {
            fs.mkdirpSync(epmAuthenticationFolder);
        }
    }
}