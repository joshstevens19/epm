import { IPackageNameAndVersion } from "../interfaces/ipackage-name-and-version";
import { CommonApi } from "./common.api";
import { HttpRequest } from "./http-request";
import { IPackageFiles } from "../interfaces/ipackage-files";

export class PackageApi {
    private static ENDPOINT = "/packages";
    private static OWNER_ENDPOINT = "/owner"
    private static IS_OWNER_ENDPOINT = "/isowner";
    private static ADD_ADMIN_ENDPOINT = "/admin";
    private static DEPRECATE_ENDPOINT = "/deprecate";
    private static UNDEPRECATE_ENDPOINT = "undeprecate";

    constructor(
        private _httpRequest: HttpRequest,
    ) { }

    /**
     * Gets the package files from the package name and version passed in
     * @param packageNameAndVersion The package name and version
     */
    public async packageFiles(packageNameAndVersion: IPackageNameAndVersion): Promise<IPackageFiles> {
        let uri = null;

        if (!packageNameAndVersion.version) {
            uri = this.latestPackageEndPoint(packageNameAndVersion.name);
        } else {
            uri = this.versionPackageEndPoint(packageNameAndVersion);
        }

        return await this._httpRequest.get<IPackageFiles>(uri);
    }

    /**
     * Uploads a package 
     * @param packageFiles The package files
     */
    public async uploadPackage(packageFiles: IPackageFiles): Promise<void> {
        const uri: string = this.rootPackageEndPoint;
        const body = {
            packageName: packageFiles.packageName,
            packageVersion: packageFiles.version,
            packageFiles: packageFiles.files,
        }
        
        await this._httpRequest.postVoid(uri, body);
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

    /**
     * Adds a admin user to a package (giving them admin permissions)
     * @param packageName The package name
     * @param username The username
     */
    public async addAdminToPackage(packageName: string, username: string): Promise<void> {
        const endpoint: string = this.addAdminToPackageEndPoint();

        const body = {
            packageName,
            username
        }

        return await this._httpRequest.postVoid(endpoint, body);
    }

    /**
     * Deprecates the package
     * @param packageName The package name
     */
    public async deprecatePackage(packageName: string): Promise<void> {
        const endpoint: string = this.deprecateEndpoint();

        const body = {
            packageName,
        }

        return await this._httpRequest.postVoid(endpoint, body);
    }

     /**
     * Undeprecates the package
     * @param packageName The package name
     */
    public async undeprecatePackage(packageName: string): Promise<void> {
        const endpoint: string = this.undeprecateEndpoint();

        const body = {
            packageName,
        }

        return await this._httpRequest.postVoid(endpoint, body);
    }

    /**
     * Builds the deprecate endpoint
     */
    private deprecateEndpoint(): string {
        const endpoint: string = `${PackageApi.ENDPOINT}${PackageApi.DEPRECATE_ENDPOINT}`;
        return CommonApi.buildApiUrlEndpoint(endpoint);
    }

    /**
     * Builds the undeprecate endpoint
     */
    private undeprecateEndpoint(): string {
        const endpoint: string = `${PackageApi.ENDPOINT}${PackageApi.UNDEPRECATE_ENDPOINT}`;
        return CommonApi.buildApiUrlEndpoint(endpoint);
    }

    /**
     * Builds the add admin to package endpoint
     */
    private addAdminToPackageEndPoint(): string {
        const endpoint: string = `${PackageApi.ENDPOINT}${PackageApi.ADD_ADMIN_ENDPOINT}`;
        return CommonApi.buildApiUrlEndpoint(endpoint);
    }

    /**
     * 
     * @param packageName 
     */
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

    /**
     * Builds the package upload endpoint 
     */
    private get rootPackageEndPoint(): string {
        return CommonApi.buildApiUrlEndpoint(PackageApi.ENDPOINT);
    }
}