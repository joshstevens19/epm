import { EthereumPmJson } from "./ethereum-pm-json";
import { EthereumModules } from "./ethereum-modules";
import { IListDependencies } from "../interfaces/ilist-dependencies";

export class LS {
    constructor(
        private _ethereumPmJsonControl: EthereumPmJson,
        private _ethereumModulesControl: EthereumModules
    ) { }

    /**
     * Gets all the installed dependencies on the project
     * It also gets all the dependencies of dependencies 
     */
    public async installedDependencies(): Promise<IListDependencies[]> {
        const dependencies = await this._ethereumPmJsonControl.getDependencies();

        const listDependencies: IListDependencies[] = [];
        for (const dependency in dependencies) {
            if (this._ethereumModulesControl.ethereumModulePackageFolderExists(dependency)) {
                listDependencies.push({
                    "version": dependencies[dependency],
                    "packageName": dependency,
                    "dependencies": new Array(),
                });

                await this.installedModuleDependencies(dependency, listDependencies);
            }

        }

        return listDependencies;

    }
    
    /**
     * Gets all the installed module dependencies (recursive)
     * @param packageName Package name
     * @param listDependencies The current list of dependencies (ref) 
     */
    private async installedModuleDependencies(packageName: string, listDependencies: IListDependencies[]): Promise<void> {
        const dependencies = await this._ethereumPmJsonControl.getEthereumModulePackageDependencies(packageName);
        const resultObjectToPush = listDependencies.find(d => d.packageName === packageName);

        if (resultObjectToPush) {
            for (const dependency in dependencies) {
                if (this._ethereumModulesControl.ethereumModulePackageFolderExists(dependency)) {
                    resultObjectToPush.dependencies.push({
                        "version": dependencies[dependency],
                        "packageName": dependency,
                        "dependencies": new Array(),
                    });

                    await this.installedModuleDependencies(dependency, listDependencies);
                }
            }
        }
    }
}
