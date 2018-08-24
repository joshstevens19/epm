import * as rp from "request-promise";
import { CommonApi } from "./common.api";
import { HttpRequest } from "./http-request";
export class StarApi {
 
    private static readonly ENDPOINT = "/star";

    constructor(
        private _httpRequest: HttpRequest
    ) { }

    /**
     * Stars the package if they are authenticated
     * @param packageName The package name
     */
    public async starPackage(packageName: string): Promise<void> {
        const uri = this.buildStarProjectEndPoint(packageName);
        const body = {
            package: packageName
        }


        await this._httpRequest.postVoid(uri, body, true);
    }

    /**
     * This builds the star project API endpoint
     * @param packageName The package name 
     */
    private buildStarProjectEndPoint(packageName: string): string {
        const endpointPath: string = `${StarApi.ENDPOINT}/${packageName}`;
        return CommonApi.buildApiUrlEndpoint(endpointPath);
    }
}