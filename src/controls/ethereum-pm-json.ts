import * as fs from "fs-extra";
import * as path from "path";
import { IEthereumPMJson } from "../interfaces/iethereum-pm-json";
import { Locations } from "../common/locations";
import { IPackageNameAndVersion } from "../interfaces/ipackage-name-and-version";
import { GenericConsts } from "../consts/generic.consts";

export class EthereumPmJson {
    private _basicEpmJson: IEthereumPMJson = require('../../json/basic-ethereum-pm.json');

    constructor() { }

    /**
     * Creates the basic ethereum-pm.json file
     */
    public async createEthereumPmJson(): Promise<void> {
        const projectName = path.resolve(__dirname);
        this._basicEpmJson.name = projectName;

        try {
            await fs.writeFile(Locations.epmPackageJsonLocation, JSON.stringify(this._basicEpmJson, null, 4));
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
     * Checks if the ethereum-pm.json exists 
     */
    public ethereumPmJsonExists(): boolean {
        return fs.existsSync(Locations.epmPackageJsonLocation)
    }

    /**
     * Checks if the package ethereum-pm.json exists in the ethereum_modules
     * @param packageName 
     */
    public ethereumModulesPackageEthereumPmJsonExists(packageName: string): boolean {
        return fs.existsSync(Locations.epmModulePackageEthereumPmJson(packageName))
    }

    /**
     * Gets the ethereum-pm json file 
     */
    public async getEthereumPmJsonFile(): Promise<IEthereumPMJson> {
        const ethereumPmJson: IEthereumPMJson = JSON.parse(await fs.readFile(Locations.epmPackageJsonLocation, 'utf8'));
        return ethereumPmJson;
    }

    /**
     * Gets the ethereum-pm json file from ethereum_modules for a package
     * @param packageName The package name
     */
    public async getEthereumModulesPackageEthereumJsonFile(packageName: string): Promise<IEthereumPMJson> {
        const ethereumPmJson: IEthereumPMJson = JSON.parse(await fs.readFile(Locations.epmModulePackageEthereumPmJson(packageName), 'utf8'));
        return ethereumPmJson;
    }

    /**
     * Gets the ethereum-pm.json version file from ethereum_modules for a package
     * @param packageName 
     */
    public async getEthereumModulePackageVersion(packageName: string): Promise<string> {
        const ethereumPmJson: IEthereumPMJson = await this.getEthereumModulesPackageEthereumJsonFile(packageName);
        return ethereumPmJson.version;
    }

    /**
     * Get the dependencies for the package json file
     */
    public async getDependencies(): Promise<any> {
        const ethereumPmJson: IEthereumPMJson = await this.getEthereumPmJsonFile();
        return ethereumPmJson.dependencies;
    }

    /**
     * Gest the dependencies for a ethereum module package
     * @param packageName The package name
     */
    public async getEthereumModulePackageDependencies(packageName: string): Promise<any> {
        const ethereumPmJson: IEthereumPMJson = await this.getEthereumModulesPackageEthereumJsonFile(packageName);
        return ethereumPmJson.dependencies;
    }

    /**
     * Gets the dependencies for the packages and 
     * complies them into a package string
     */
    public async getDependenciesAsPackageStrings(): Promise<string[]> {
        const dependencies = await this.getDependencies();
        const packages: string[] = [];

        // loop through all the dependencies and build up a installable name
        for (const dependency in dependencies) {
            const packageName = `${dependency}@${dependencies[dependency]}`;
            packages.push(packageName);
        }

        return packages;
    }

    /**
     * Adds the installed dependency into the ethereum-pm.json
     * @param packageNameAndVersion - The package name and version to add to the JSON file
     */
    public async addDependency(packageNameAndVersion: IPackageNameAndVersion): Promise<void> {
        const ethereumPmJson: IEthereumPMJson = await this.getEthereumPmJsonFile();

        // check to make sure package object name + version does not already exist in the file
        if (!ethereumPmJson.dependencies[packageNameAndVersion.name]
            || (ethereumPmJson.dependencies[packageNameAndVersion.name] 
                && ethereumPmJson.dependencies[packageNameAndVersion.name] !== packageNameAndVersion.version)) {
            ethereumPmJson.dependencies[packageNameAndVersion.name] = packageNameAndVersion.version;
            await this.saveEthereumPm(ethereumPmJson);
        }
    }

    /**
     * Removes a dependency out of the etherum-pm.json file
     * @param packageName The package name
     */
    public async removeDependency(packageName: string): Promise<void> {
        const ethereumPmJson: IEthereumPMJson = await this.getEthereumPmJsonFile();

        // check to make sure package object name does not already exist in the file
        if (ethereumPmJson.dependencies[packageName]) {
            delete ethereumPmJson.dependencies[packageName];
            await this.saveEthereumPm(ethereumPmJson);
        }
    }

    /**
     * This saves the updated ethereum-pm.json onto the users project
     * @param ethereumPmJson The new ethereum-pm.json file to update
     */
    public async saveEthereumPm(ethereumPmJson: IEthereumPMJson): Promise<void> {
        await fs.writeFile(GenericConsts.epmJsonName, JSON.stringify(ethereumPmJson, null, 4));
    }
}