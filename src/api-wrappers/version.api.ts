import * as rp from "request-promise";
import { CommonApi } from "./common.api";

export class VersionApi {

    public static ENDPOINT = "/versions";
    public static LATEST_VERSION_ENDPOINT = "/latest";

    /**
     * Gets the latest version for a package
     * @param packageName The package name
     */
    public async getLatestVersionForPackage(packageName: string): Promise<string> {
        const version = JSON.parse(await rp.get(this.latestVersionPackageEndPoint(packageName)));
        return version.latestVersion;
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