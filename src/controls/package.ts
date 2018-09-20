import { IPackageNameAndVersion } from "../interfaces/ipackage-name-and-version";
import { PackageApi } from "../api-wrappers/package.api";
import { VersionApi } from "../api-wrappers/version.api";
import { IPackageFiles } from "../interfaces/ipackage-files";

export class Package {

    constructor(
        private _packageApi: PackageApi,
        private _versionApi: VersionApi,
    ) { }

    /**
     * Maybe needs renaming - splits packageName into a IPackageNameAndVersion
     * @param packageName The package encoded name i.e. ownerable@1.1.1 or ownerable
     */
    public getPackageNameAndVersion(packageName: string): IPackageNameAndVersion {
        const splitNameAndVersion = packageName.split("@");

        if (splitNameAndVersion.length === 2) {
            return {
                name: splitNameAndVersion[0],
                version: splitNameAndVersion[1],
            } as IPackageNameAndVersion
        } else {
            return {
                name: packageName
            } as IPackageNameAndVersion
        }
    }

    /**
     * Gets the lastest version for the package
     * @param packageName The package name
     */
    public async getLatestVersionForPackage(packageName: string): Promise<string> {
        return await this._versionApi.getLatestVersionForPackage(packageName);
    }

    /**
     * Gets the package files from s3 bucket
     * @param packageNameAndVersion The package name and version
     */
    public async getPackageFiles(packageNameAndVersion: IPackageNameAndVersion): Promise<IPackageFiles> {
        return await this._packageApi.packageFiles(packageNameAndVersion);
    }

    /**
     * Add a user to a package
     * @param packageName The package name
     * @param username The username
     */
    public async addUserToPackage(packageName: string, username: string): Promise<void> {
        return await this._packageApi.addUserToPackage(packageName, username);
    }

    /**
     * Removes a user from the package
     * @param packageName The package name
     * @param username The username
     */
    public async removeUserFromPackage(packageName: string, username: string): Promise<void> {
        return await this._packageApi.removeUserFromPackage(packageName, username);
    }
}