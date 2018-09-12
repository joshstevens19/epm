import { CommonApi } from "./common.api";
import { HttpRequest } from "./http-request";
import { IStarredPackageResponse } from "../interfaces/api-reponses/istarred-packages.response";
export class StarApi {
 
    private static readonly ENDPOINT = "/stars";

    constructor(
        private _httpRequest: HttpRequest
    ) { }

    /**
     * Stars the package if they are authenticated
     * @param packageName The package name
     */
    public async starPackage(packageName: string): Promise<void> {
        const uri = this.buildDefaultStarEndPoint();
        const body = {
            packageName
        }
        
        await this._httpRequest.postVoid(uri, body);
    }

    /**
     * Unstars the package for the user
     * @param packageName The package name
     */
    public async unstarPackage(packageName: string): Promise<void> {
        const uri = this.buildDefaultStarEndPoint();
        const body = {
            packageName
        }
        
        await this._httpRequest.deleteVoid(uri, body); 
    }

    /**
     * Gets all the starred projects for the logged in user
     */
    public async getAllStars(): Promise<IStarredPackageResponse> {
        const uri = this.buildDefaultStarEndPoint();

        return await this._httpRequest.get<IStarredPackageResponse>(uri);
    }

    /**
     * This builds the star project API endpoint
     * @param packageName The package name 
     */
    private buildDefaultStarEndPoint(): string {
        const endpointPath: string = `${StarApi.ENDPOINT}`;
        return CommonApi.buildApiUrlEndpoint(endpointPath);
    }
}