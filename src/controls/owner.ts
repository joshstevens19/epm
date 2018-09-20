import { PackageApi } from "../api-wrappers";
import { IAdminUsersResponse } from "../interfaces/api-reponses/iadmin-users-response";

export class Owner {
    constructor(
        private _packageApi: PackageApi,
    ) { }

    /**
     * Transfer the owner of a package
     * @param packageName 
     * @param username 
     */
    public async transferOwnerOfPackage(packageName: string, username: string): Promise<void> {
        return await this._packageApi.transferOwnerOfPackage(packageName, username);
    }

    /**
     * Add admin user to package
     * @param packageName 
     */
    public async addAdmin(packageName: string, username: string): Promise<void> {
        return await this._packageApi.addAdminToPackage(packageName, username);
    }

    /**
     * Removes admins permission
     * @param packageName The package name
     * @param username The username 
     */
    public async removeAdminPermission(packageName: string, username: string): Promise<void> {
        return await this._packageApi.removeAdminPermission(packageName, username);
    }

    /**
     * Gets all the admins for the package
     * @param packageName The package name
     * @param username The username 
     */
    public async getAdminUsers(packageName: string): Promise<IAdminUsersResponse> {
        return await this._packageApi.getAdminUsers(packageName);
    }
}