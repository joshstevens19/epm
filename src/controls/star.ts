import { StarApi } from "../api-wrappers";
import { IStarredPackageResponse } from "../interfaces/api-reponses/istarred-packages.response";

export class Star {
    constructor(
        private _starApi: StarApi
    ) { }

    /**
     * Stars a package
     * @param packageName The package name
     */
    public async starPackage(packageName: string): Promise<void> {
        await this._starApi.starPackage(packageName);
    }

    /**
     * Unstars a package
     * @param packageName The package name 
     */
    public async unstarPackage(packageName: string): Promise<void> {
        await this._starApi.unstarPackage(packageName);
    }

    /**
     * Gets all the starred packages 
     */
    public async getAllStars(): Promise<IStarredPackageResponse> {
        return await this._starApi.getAllStars();
    }
}