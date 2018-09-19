import { PingApi } from "../api-wrappers";
import { IDoctor } from "../interfaces/idoctor";
import { EpmMetaData } from "../consts/epm-metadata";
import { Version } from ".";
import { Ping } from "./ping";

export class Doctor {
    constructor(
        private _versionControl: Version,
        private _pingControl: Ping,
    ) { }

    /**
     * Checks that everything is installed and available
     */
    public async checkEverythingIsAvailable(): Promise<IDoctor[]> {
        const doctorData: IDoctor[] = [];

        const pingData = await this.tryPing();
        doctorData.push(pingData);

        const epmVersionData = this.epmVersion();
        doctorData.push(epmVersionData);

        return doctorData;
    }

    /**
     * Trys to ping the api
     */
    private async tryPing(): Promise<IDoctor> {
        const alive = await this._pingControl.alive();
        if (alive) {
            return {
                check: "epm ping",
                value: "200 - OK",
                recommandation: null
            } as IDoctor;
        } else {
            return {
                check: "epm ping",
                value: "500 - not OK"
            } as IDoctor
        }
    }

    /**
     * Checks the epm version
     */
    private epmVersion(): IDoctor {
        // create endpoint which can see the latest version of the package vs current 
        const lversion = "1.0.3";
        const lastestVersion = this._versionControl.parseSemanticVersion(lversion); // hard coded version will come from the DB
        const currentVersion = this._versionControl.parseSemanticVersion(EpmMetaData.epmVersion);

        if (this._versionControl.isBiggerThenVersion(currentVersion, lastestVersion)) {
            return {
                check: "epm -v",
                value: `v${EpmMetaData.epmVersion}`,
                recommendation: `Use epm v${lversion}`
            } as IDoctor
        }

        // if it is not bigger it must = the same 
        return {
            check: "epm-v",
            value: `v${EpmMetaData.epmVersion}`,
        } as IDoctor;
    }
}
