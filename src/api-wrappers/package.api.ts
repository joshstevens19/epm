import * as rp from "request-promise";
import { IPackageFile } from "../interfaces/ipackage-file";
import { IPackageNameAndVersion } from "../interfaces/ipackage-name-and-version";
import { CommonApi } from "./common.api";

export class PackageApi {
    private static ENDPOINT = "/packages";
    private static OWNER_ENDPOINT = "/owner"
    private static IS_OWNER_ENDPOINT = "/isowner"

    /**
     * Gets the package files from the package name and version passed in
     * @param packageNameAndVersion The package name and version
     */
    public async packageFiles(packageNameAndVersion: IPackageNameAndVersion): Promise<IPackageFile[]> {
        if (!packageNameAndVersion.version) {
            throw new Error("you must supply a version");
        }
        // need to start using version for API calls as well as latest
        const packageFiles = JSON.parse(await rp.get(this.latestPackageEndPoint(packageNameAndVersion.name))) as IPackageFile[];
        return packageFiles;
    }

    /**
     * This will return the package owners name
     * Should return profile details of the user i think 
     * once that has been completed 
     */
    public async packageOwner(packageName: string, jwtToken: string): Promise<string> {
        const options = {
            uri: this.ownerOfPackageEndPoint(packageName),
            qa: {
                jwtToken,
            }
        }
        
        return await rp.get(options);
    }

    /**
     * Checks if the package is owned by the authenticated user
     * @param jwtToken The JWT token
     */
    public async isPackageOwner(packageName: string, jwtToken: string): Promise<boolean> {
        const options = {
            uri: this.isOwnerOfPackageEndPoint(packageName),
            qs: {
                jwtToken,
            }
        }

        return await rp.get(options);
    }

    private ownerOfPackageEndPoint(packageName: string): string {
        const endpointPath: string = `${PackageApi.ENDPOINT}/${packageName}/${PackageApi.OWNER_ENDPOINT}`;
        return CommonApi.buildApiUrlEndpoint(endpointPath);
    }

    /**
     * Builds the is owner of package endpoint
     * @param packageName The package name
     * @param jwtToken The authentication token
     */
    private isOwnerOfPackageEndPoint(packageName: string): string {
        const endpointPath: string = `${PackageApi.ENDPOINT}/${packageName}/${PackageApi.IS_OWNER_ENDPOINT}`;
        return CommonApi.buildApiUrlEndpoint(endpointPath);
    }

    /**
     * Builds the latest package install API call
     * @param packageName The package name
     */
    private latestPackageEndPoint(packageName: string): string {
        const endpointPath: string = `${PackageApi.ENDPOINT}/${packageName}`
        return CommonApi.buildApiUrlEndpoint(endpointPath)
    }

    /**
     * Builds the version package install API call
     * @param packageNameAndVersion The package and version
     */
    private versionPackageEndPoint(packageNameAndVersion: IPackageNameAndVersion): string {
        const endpointPath: string = `${PackageApi.ENDPOINT}/${packageNameAndVersion.name}/${packageNameAndVersion.version}`;
        return CommonApi.buildApiUrlEndpoint(endpointPath);
    }
}