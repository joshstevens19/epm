import { IPackageNameAndVersion } from "../interfaces/ipackage-name-and-version";
import { CommonApi } from "./common.api";
import { HttpRequest } from "./http-request";
import { IPackageFiles } from "../interfaces/ipackage-files";
import { IAdminUsersResponse } from "../interfaces/api-reponses/iadmin-users-response";

export class PackageApi {
    private static ENDPOINT = "/packages";
    private static OWNER_ENDPOINT = "/owner"
    private static IS_OWNER_ENDPOINT = "/isowner";
    private static ADMIN_ENDPOINT = "/admin";
    private static DEPRECATE_ENDPOINT = "/deprecate";
    private static TRANSFER_ENDPOINT = "transfer";
    private static UNDEPRECATE_ENDPOINT = "/undeprecate";
    private static USER_ENDPOINT = "user";
    private static UNPUBLISH_ENDPOINT = "/unpubish";

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
    public async publishPackage(packageFiles: IPackageFiles): Promise<void> {
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
        const endpoint: string = this.adminPackageEndPoint;

        const body = {
            packageName,
            username
        }

        return await this._httpRequest.postVoid(endpoint, body);
    }

    /**
     * Removes admin permissions for a user
     * @param packageName The package name
     * @param username The username
     */
    public async removeAdminPermission(packageName: string, username: string): Promise<void> {
        const endpoint: string = this.adminPackageEndPoint;

        const body = {
            packageName,
            username
        }

        return await this._httpRequest.deleteVoid(endpoint, body);
    }

    /**
     * Add a user to a package 
     * @param packageName The package name
     * @param username The username
     */
    public async addUserToPackage(packageName: string, username: string): Promise<void> {
        const endpoint: string = this.userPackageEndpoint;

        const body = {
            packageName,
            username
        }

        return await this._httpRequest.postVoid(endpoint, body);
    }

    /**
     * Remove a user from a package
     * @param packageName The package name
     * @param username The username
     */
    public async removeUserFromPackage(packageName:string, username:string): Promise<void> {
        const endpoint:string = this.userPackageEndpoint;

        const body = {
            packageName,
            username
        }

        return await this._httpRequest.deleteVoid(endpoint, body);
    }

    /**
     * Transfer owner of the package
     * @param packageName The package name
     * @param username The username
     */
    public async transferOwnerOfPackage(packageName: string, username: string): Promise<void> {
        const endpoint: string = this.transferPackageEndpoint;

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
        const endpoint: string = this.deprecateEndpoint;

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
        const endpoint: string = this.undeprecateEndpoint;

        const body = {
            packageName,
        }

        return await this._httpRequest.postVoid(endpoint, body);
    }

    /**
     * Unpublish a package
     * @param packageName The package name 
     */
    public async unpublishPackage(packageName: string): Promise<void> {
        const endpoint: string = this.unpublishEndpoint;
        const body = {
            packageName,
        }

        return await this._httpRequest.postVoid(endpoint, body);
    }

    /**
     * Gets the admin users
     * @param packageName The package name  
     */
    public async getAdminUsers(packageName: string): Promise<IAdminUsersResponse> {
        const endpoint: string = this.buildGetAdminUsersForPackageEndpoint(packageName);

        return await this._httpRequest.get<IAdminUsersResponse>(endpoint);
    }

    /**
     * Builds the unpublished endpoint
     */
    private get unpublishEndpoint(): string {
        const endpoint: string = `${PackageApi.ENDPOINT}${PackageApi.UNPUBLISH_ENDPOINT}`;
        return CommonApi.buildApiUrlEndpoint(endpoint);
    }

    /**
     * Builds up the user package endpoint
     */
    private get userPackageEndpoint(): string {
        const endpoint: string = `${PackageApi.ENDPOINT}${PackageApi.USER_ENDPOINT}`;
        return CommonApi.buildApiUrlEndpoint(endpoint);
    }

    /**
     * Builds the transfer package endpoint
     */
    private get transferPackageEndpoint(): string {
        const endpoint: string = `${PackageApi.ENDPOINT}${PackageApi.TRANSFER_ENDPOINT}`;
        return CommonApi.buildApiUrlEndpoint(endpoint);
    }

    /**
     * Builds the deprecate endpoint
     */
    private get deprecateEndpoint(): string {
        const endpoint: string = `${PackageApi.ENDPOINT}${PackageApi.DEPRECATE_ENDPOINT}`;
        return CommonApi.buildApiUrlEndpoint(endpoint);
    }

    /**
     * Builds the undeprecate endpoint
     */
    private get undeprecateEndpoint(): string {
        const endpoint: string = `${PackageApi.ENDPOINT}${PackageApi.UNDEPRECATE_ENDPOINT}`;
        return CommonApi.buildApiUrlEndpoint(endpoint);
    }

    /**
     * Builds the add admin to package endpoint
     */
    private get adminPackageEndPoint(): string {
        const endpoint: string = `${PackageApi.ENDPOINT}${PackageApi.ADMIN_ENDPOINT}`;
        return CommonApi.buildApiUrlEndpoint(endpoint);
    }

    /**
     * Build the get admin user endpoint
     * @param packageName 
     */
    private buildGetAdminUsersForPackageEndpoint(packageName: string): string {
        const endpoint: string = `${PackageApi.ENDPOINT}${packageName}`;
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