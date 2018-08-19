import * as fs from "fs-extra";
import { GenericConsts } from "../consts/generic.consts";
import { Locations } from "../common/locations";
import { EthereumPmJson } from ".";
import { IPackageNameAndVersion } from "../interfaces/ipackage-name-and-version";

export class EthereumModules {

    constructor(
        private _ethereumPmJson: EthereumPmJson,
    ) { }

    /**
     * Creates the ethereum_modules package name folder if it
     * does not exist within the current project
     * @param packageName The package name
     */
    public createEthereumModulePackageFolder(packageName: string): void {
        // create the ethereum modules folder
        this.createEthereumModulesFolder();

        // build the location up for the package in ethereum modules
        const packageDir = Locations.epmModulesPackageLocation(packageName);
        if (!fs.existsSync(packageDir)) {
            fs.mkdirSync(packageDir)
        }
    }

    /**
     * Checks if a ethereum_modules package folder exists
     * @param packageName The package name
     */
    public ethereumModulePackageFolderExists(packageName: string): boolean {
        return fs.existsSync(Locations.epmModulesPackageLocation(packageName))
    }

    /**
     * Creates the ethereum_modules folder
     */
    public createEthereumModulesFolder(): void {
        if (!this.ethereumModulesFolderExists()) {
            fs.mkdirSync(GenericConsts.epmModulesFolderName);
        }
    }

    /**
     * Checks if the ethereum_modules folder exists
     */
    public ethereumModulesFolderExists(): boolean {
        return fs.existsSync(GenericConsts.epmModulesFolderName);
    }

    /**
     * Deletes a ethereum_module package folder (normally from a uninstall)
     * @param packageName The package name
     */
    public removeEthereumModuleFolder(packageName: string): void {
        if (this.ethereumModulePackageFolderExists(packageName)) {
            this.deleteEthereumModuleFolderItems(Locations.epmModulesPackageLocation(packageName));
        }
    }

    /**
     * Delete all items from a ethereum_modules package folder
     * --- maybe make async later on
     * @param path The path to the folder
     */
    private deleteEthereumModuleFolderItems(path: string): void {
        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach((file, index) => {
                const curPath = path + "/" + file;
                if (fs.lstatSync(curPath).isDirectory()) {
                    this.deleteEthereumModuleFolderItems(curPath);
                } else {
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    }

    /**
     * Checks if the package and its version is already installed 
     * @param packageNameAndVersion 
     */
    public async versionAlreadyInstalled(packageNameAndVersion: IPackageNameAndVersion): Promise<boolean> {
        if (packageNameAndVersion.version) {
            try {
                const packageVersion = await this._ethereumPmJson.getEthereumModulePackageVersion(packageNameAndVersion.name);
                return packageNameAndVersion.version === packageVersion;
            } catch (error) {
                // mute the error here as no package file has been found so the version is not already installed
                return false;
            }
        } else {
            return false;
        }
    }
}