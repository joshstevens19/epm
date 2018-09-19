import { GenericConsts } from "../consts/generic.consts";
import * as os from "os";

export class Locations {

    constructor() { }

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

    /**
     * Gets the epm home dir location for the user
     */
    public static get epmUserHomeDir(): string {
        return `${this.homeDir}\\.epm`;
    }

    /**
     * Gets the home dir location
     */
    public static get homeDir(): string {
        return os.homedir();
    }

    /**
     * Gets the epm home dir authentication folder for the user
     */
    public static get epmUserHomeDirAuthenticationLocation(): string {
        return `${this.epmUserHomeDir}\\authentication`;
    }

    /**
     * Gets the authentication file location
     */
    public static get epmUserHomeAuthenticationFileLocation(): string {
        return `${this.epmUserHomeDirAuthenticationLocation}\\${GenericConsts.jwtLocalFileName}`; 
    }

    /**
     * Gets the locally stored packages location
     */
    public static get epmUserHomeLocalPackagesLocation(): string {
        return `${this.epmUserHomeDir}\\packages`;
    }

    /**
     * Gets the locally stored package location
     * @param packageName The package name
     */
    public static epmUserHomeLocalPackageLocation(packageName: string): string {
        return `${this.epmUserHomeLocalPackagesLocation}\\${packageName}`;
    }

    /**
     * Gets the locally store package version location
     * @param packageName 
     * @param packageVersion 
     */
    public static epmUserHomeLocalPackageVersionLocation(packageName: string, packageVersion: string): string {
        return `${Locations.epmUserHomeLocalPackageLocation(packageName)}\\${packageVersion}`;
    }
 }