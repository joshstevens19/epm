import * as rp from "request-promise";
import { IPackageNameAndVersion } from "../interfaces/ipackage-name-and-version";
import { IPackageFile } from "../interfaces/ipackage-file";

// CURRENTLY DONE FOR DEV REASON, WILL BE MOVING OVER TO A API WHICH HOLDS 
// ALL THE INFO ABOUT THE PACKAGES
export class Package {

    // will go into a config eventually at the moment it is 
    // the port i have running for epm-api
    // MAYBE MOVE THESE ENDPOINTS!! - MAYBE SOME STATIC BUILDERS TO BUILD THEM UP ;)
    public static API_ROOT = "http://localhost:49936/api";
    public static API_VERSIONS = '/versions';
    public static API_PACKAGES = '/packages';

    public static API_VERSIONS_ENDPOINT = Package.API_ROOT + Package.API_VERSIONS;
    public static API_PACKAGES_ENDPOINT = Package.API_ROOT + Package.API_PACKAGES;

    constructor() { }

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
        const version = JSON.parse(await rp.get(`${Package.API_VERSIONS_ENDPOINT}/${packageName}/latest`));
        return version.latestVersion;
    }

    /**
     * Gets the package files from s3 bucket
     * @param packageNameAndVersion The package name and version
     */
    public async getPackageFiles(packageNameAndVersion: IPackageNameAndVersion): Promise<IPackageFile[]> {
        if (!packageNameAndVersion.version) {
            throw new Error("you must supply a version");
        }

        const packageFiles = JSON.parse(await rp.get(`${Package.API_PACKAGES_ENDPOINT}/${packageNameAndVersion.name}/latest`)) as IPackageFile[];
        return packageFiles;
    }
}