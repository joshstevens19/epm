import { PingApi } from "../api-wrappers";
import { IDoctor } from "../interfaces/idoctor";
import { EpmMetaData } from "../consts/epm-metadata";
import { Version } from ".";
import { Ping } from "./ping";
import * as fs from "fs-extra";
import { Locations } from "../common/locations";

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

        const canRead = await this.canReadUserPath();
        doctorData.push(canRead);

        const canWrite = await this.canWriteUserPath();
        doctorData.push(canWrite);

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

    /**
     * Can write to the user path
     */
    private async canWriteUserPath(): Promise<IDoctor> {
        try {
            await fs.access(Locations.homeDir, fs.constants.W_OK);
        } catch(error) {
            return {
                check: "can write to user dir",
                value: "not ok",
                recommendation: "epm can not write to your home dir"
            } as IDoctor;
        }

        return {
            check: "can write to user dir",
            value: "ok"
        } as IDoctor;
    }

    /**
     * Can read the user path
     */
    private async canReadUserPath(): Promise<IDoctor> {
        try {
            await fs.access(Locations.homeDir, fs.constants.R_OK);
        } catch(error) {
            return {
                check: "can read user dir",
                value: "not ok",
                recommendation: "epm can not read from your home dir"
            } as IDoctor;
        }

        return {
            check: "can read user dir",
            value: "ok"
        } as IDoctor;
    }
}
