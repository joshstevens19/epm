import * as fs from "fs-extra";
import { IPackageNameAndVersion } from "../interfaces/ipackage-name-and-version";
import { Init, Package, EthereumPmJson, EthereumModules } from ".";
import { InitErrorMessages } from "../error-messages/init-error-messages";
import { GenericConsts } from "../consts/generic.consts";
import { IEthereumPMJson } from "../interfaces/iethereum-pm-json";
import { Locations } from "../common/locations";
import * as rp from "request-promise";
import { IPackageFile } from "../interfaces/ipackage-file";

export class Install {
    constructor(
        private _packageControl: Package,
        private _initControl: Init,
        private _ethereumPmJsonControl: EthereumPmJson,
        private _ethereumModulesControl: EthereumModules
    ) { }

    /**
     * Downloads and install the package requests
     * This will insert the package into ethereum_modules and install
     * any dependencies 
     * @param packageName The package which wants to be installed
     */
    public async installPackage(packageName: string): Promise<void> {
        if (this._initControl.hasBeenInitialised) {
            const packageNameAndVersion: IPackageNameAndVersion = this._packageControl.getPackageNameAndVersion(packageName);
            // console.log(__dirname);

            // make sure all the folders are created if it is a first install 
            // of this package
            this._ethereumModulesControl.createEthereumModulePackageFolder(packageNameAndVersion.name);

            // WILL RESOLVE TO USE PATH FOR LINX BOXES AND __dirname - do not worry 
            // just getting the concept there first
            if (!(await this._ethereumModulesControl.versionAlreadyInstalled(packageNameAndVersion))) {
                // if package is not defined then get the latest one
                if (!packageNameAndVersion.version) {
                    try {
                        packageNameAndVersion.version = await this._packageControl.getLatestVersionForPackage(packageNameAndVersion.name);
                    } catch (error) {
                        return Promise.reject("COULD NOT FIND ANY PACKAGES");
                    }
                }

                // const destination = Locations.epmModulesPackageLocation(packageNameAndVersion.name);
                const packageFiles: IPackageFile[] = await this._packageControl.getPackageFiles(packageNameAndVersion);
                const destination = Locations.epmModulesPackageLocation(packageNameAndVersion.name);

                for (let p = 0; p < packageFiles.length; p++) {
                    await fs.writeFile(`${destination}\\${packageFiles[p].fileName}`, packageFiles[p].fileContent);
                }

                await this._ethereumPmJsonControl.addDependency(packageNameAndVersion);
                await this.installDependenciesFromEthereumPm(destination + "\\" + GenericConsts.epmJsonName);
            } else {
                // still want to add the dependency as they may have it installed 
                // but removed it out of their ethereum-pm.json file
                await this._ethereumPmJsonControl.addDependency(packageNameAndVersion);
            }

            // if version has alreay been installed make it look like it has installed it
            // again - version will not be able to edited once submitted, to edit the 
            // codebase you have to go up a version therefore to avoid confusion throwing
            // a error here just make it look like it has been successful

        } else {
            return Promise.reject(new Error(InitErrorMessages.notInitalised));
        }
    }

    /**
     * Installs all the packages from ethereum-pm.json and it's dependencies
     */
    public async installPackages(): Promise<void> {
        if (this._initControl.hasBeenInitialised) {
            await this.installDependenciesFromEthereumPm(Locations.epmPackageJsonLocation);
        } else {
            return Promise.reject(new Error(InitErrorMessages.notInitalised));
        }
    }

    /**
     * Installs the dependencies from the ethereum-pm.json 
     * executes when user calls epm install 
     * @param location The location of the ethereum-pm.json file (it could be in ethereum_modules)
     */
    private async installDependenciesFromEthereumPm(location: string): Promise<void> {
        const ethereumPmJson: IEthereumPMJson = JSON.parse(await fs.readFile(location, 'utf8'));

        for (const dependency in ethereumPmJson.dependencies) {
            const packageName = dependency + "@" + ethereumPmJson.dependencies[dependency];
            await this.installPackage(packageName);
        }
    }
}