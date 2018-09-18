import { PackageApi } from "../api-wrappers";

export class Unpublish {
    constructor(
        private _packageApi: PackageApi
    ) { }

    /**
     * Unpublished a package
     * @param packageName The package name
     */
    public async main(packageName: string): Promise<void> {
        await this._packageApi.unpublishPackage(packageName);
    }
}