import * as rp from "request-promise";
import { IPackageFile } from "../interfaces/ipackage-file";
import { IPackageNameAndVersion } from "../interfaces/ipackage-name-and-version";
import { CommonPropertiesApi } from "./common.api";

export class PackageApi {
    public static ENDPOINT = "/packages";

    /**
     * Gets the package files from the package name and version passed in
     * @param packageNameAndVersion The package name and version
     */
    public async packageFiles(packageNameAndVersion: IPackageNameAndVersion): Promise<IPackageFile[]> {
        if (!packageNameAndVersion.version) {
            throw new Error("you must supply a version");
        }
        // need to start using version for API calls as well as latest
        const packageFiles = JSON.parse(await rp.get(this.latestPackageEndPoint(packageNameAndVersion.name))) as IPackageFile[];
        return packageFiles;
    }

    /**
     * Builds the latest package install API call
     * @param packageName The package name
     */
    private latestPackageEndPoint(packageName: string): string {
        const endpointPath: string = `${PackageApi.ENDPOINT}/${packageName}`
        return CommonPropertiesApi.buildApiUrlEndpoint(endpointPath)
    }

    /**
     * Builds the version package install API call
     * @param packageNameAndVersion The package and version
     */
    private versionPackageEndPoint(packageNameAndVersion: IPackageNameAndVersion): string {
        const endpointPath: string = `${PackageApi.ENDPOINT}/${packageNameAndVersion.name}/${packageNameAndVersion.version}`;
        return CommonPropertiesApi.buildApiUrlEndpoint(endpointPath);
    }
}