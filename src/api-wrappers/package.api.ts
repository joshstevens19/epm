import { IPackageNameAndVersion } from "../interfaces/ipackage-name-and-version";
import { CommonApi } from "./common.api";
import { HttpRequest } from "./http-request";
import { IPackageFiles } from "../interfaces/ipackage-files";

export class PackageApi {
    private static ENDPOINT = "/packages";
    private static OWNER_ENDPOINT = "/owner"
    private static IS_OWNER_ENDPOINT = "/isowner"

    constructor(
        private _httpRequest: HttpRequest,
    ) { }

    /**
     * Gets the package files from the package name and version passed in
     * @param packageNameAndVersion The package name and version
     */
    public async packageFiles(packageNameAndVersion: IPackageNameAndVersion): Promise<IPackageFiles> {
        if (!packageNameAndVersion.version) {
            throw new Error("you must supply a version");
        }

        const uri = this.latestPackageEndPoint(packageNameAndVersion.name);
        return await this._httpRequest.get<IPackageFiles>(uri);
    }

    /**
     * This will return the package owners name
     * Should return profile details of the user i think 
     * once that has been completed 
     */
    public async packageOwner(packageName: string): Promise<string> {
        const uri = this.ownerOfPackageEndPoint(packageName);
        return await this._httpRequest.get<string>(uri);
    }

    /**
     * Checks if the package is owned by the authenticated user
     */
    public async isPackageOwner(packageName: string): Promise<boolean> {
        const uri = this.isOwnerOfPackageEndPoint(packageName);
        return await this._httpRequest.get<boolean>(uri);
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