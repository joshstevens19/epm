import { Package } from ".";
import { Install } from "./install";
import { EthereumPmJson } from "./ethereum-pm-json";

export class Update {
    constructor(
        private _packageControl: Package,
        private _installControl: Install,
        private _ethereumPmJsonControl: EthereumPmJson,
    ) { }

    /**
     * Updates the package to its latest version
     * @param packageName The package name 
     */
    public async updatePackage(packageName: string): Promise<void> {
        const latestVersion: string = await this._packageControl.getLatestVersionForPackage(packageName);

        const installedDependencies = await this._ethereumPmJsonControl.getDependencies();

        if (installedDependencies[packageName] !== latestVersion) {
            await this._installControl.installPackage(`${packageName}@${latestVersion}`);
        } else {
            throw new Error(`Already have the lastest '${packageName}' package installed`);
        }
    }
}