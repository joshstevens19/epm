import * as rp from "request-promise";
import { CommonApi } from "./common.api";
import { HttpRequest } from "./http-request";

export class VersionApi {

    public static ENDPOINT = "/versions";
    public static LATEST_VERSION_ENDPOINT = "/latest";

    constructor(
        private _httpRequest: HttpRequest,
    ) {}

    /**
     * Gets the latest version for a package
     * @param packageName The package name
     */
    public async getLatestVersionForPackage(packageName: string): Promise<string> {
        const uri = this.latestVersionPackageEndPoint(packageName);
        return await this._httpRequest.get<string>(uri, true);
    }

    /**
     * Build the latest version package endpoint
     * @param packageName The package name
     */
    private latestVersionPackageEndPoint(packageName: string): string {
        const endpointPath: string = `${VersionApi.ENDPOINT}/${packageName}/${VersionApi.LATEST_VERSION_ENDPOINT}`
        return CommonApi.buildApiUrlEndpoint(endpointPath)
    }
}