import { PackageApi } from "../api-wrappers";

export class Deprecate {
    
    constructor(
        private _packageApi: PackageApi,
    ) { }

    /**
     * Deprecate a package 
     */
    public async deprecatePackage(packageName: string): Promise<void> {
        await this._packageApi.deprecatePackage(packageName);
    }

    /**
     * Undeprecates a package 
     */
    public async undeprecatePackage(packageName: string): Promise<void> {
        await this._packageApi.undeprecatePackage(packageName);
    }
    
}