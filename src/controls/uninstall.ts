import { EthereumModules } from ".";
import { EthereumPmJson } from "./ethereum-pm-json";

export class Uninstall {
    constructor(
        private _ethereumModules: EthereumModules,
        private _ethereumPmJson: EthereumPmJson,
    ) {}

    /**
     * Uninstalls a package
     * - This removes it from the ethereum_modules
     * - This removes it from the dependencies in ethereum-pm.json
     * @param packageName The package name
     */
    public async uninstallPackage(packageName: string): Promise<void> {
        this._ethereumModules.removeEthereumModuleFolder(packageName);
        await this._ethereumPmJson.removeDependency(packageName);
    }
}