import { EthereumPmJson, EthereumModules } from ".";
import { Package } from "./package";
import { IPackageNameAndVersion } from "../interfaces/ipackage-name-and-version";

export class Outdated {

    constructor(
        private _ethereumPmJsonControl: EthereumPmJson,
        private _packageControl: Package,
    ) {}

    /**
     * Returns a list of all the outdated packages which have been installed
     */
    public async checkForOutdatedPackages(): Promise<IPackageNameAndVersion[]> {
        const dependencies = await this._ethereumPmJsonControl.getDependencies();

        const outdatedPackages: IPackageNameAndVersion[] = [];

        for (const dependency in dependencies) {
            const latestVersion = this._packageControl.getLatestVersionForPackage(dependency);
            if (latestVersion !== dependencies[dependency])
            outdatedPackages.push({
                name: dependency,
                version: latestVersion
            })
        } 

        return outdatedPackages;
    }
}