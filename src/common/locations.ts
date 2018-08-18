import { GenericConsts } from "../consts/generic.consts";

export class Locations {

    constructor() {}

    /**
     * Gets the ethereum-pm.json location
     */
    public static get epmPackageJsonLocation(): string {
        return `${GenericConsts.root}${GenericConsts.epmJsonName}`; 
    }

    /**
     * Gets the ethereum_modules location
     */
    public static get epmModulesLocation(): string {
        return `${GenericConsts.root}${GenericConsts.epmModulesFolderName}`;
    }

    /**
     * Gets the ethereum_modules package location
     * @param packageName The package name
     */
    public static epmModulesPackageLocation(packageName: string): string {
        return `${this.epmModulesLocation}\\${packageName}`;
    }

    /**
     * Gets the ethereum_modules package ethereum-pm.json location
     * @param packageName The package name
     */
    public static epmModulePackageEthereumPmJson(packageName: string): string {
        return `${this.epmModulesLocation}\\${packageName}\\${GenericConsts.epmJsonName}`;
    }
}