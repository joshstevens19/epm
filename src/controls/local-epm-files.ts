import * as fs from "fs-extra";
import { Locations } from "../common/locations";
import { IPackageFile } from "../interfaces/ipackage-file";

export class LocalEpmFiles {

    /**
     * Saves the authentication token locally in `.epm` within the home dir
     * @param jwtToken 
     */
    public async saveAuthenticationToken(jwtToken: string): Promise<void> {
        this.createEpmLocalAuthenticationFolder();

        const authenticationBody = {
            jwtToken,
            createdOn: new Date(),
        }

        await fs.writeFile(Locations.epmUserHomeAuthenticationFileLocation, JSON.stringify(authenticationBody, null, 4));
    }

    /**
     * Saves the packages locally in `.epm` within the home dir
     * @param packageFiles The package files
     * @param packageName The package name
     */
    public async savePackageFilesToLocal(packageFiles: IPackageFile[], packageName: string, version: string): Promise<void> {
        if (!this.packageVersionAlreadyInstalledLocally(packageName,version)) {
            this.createEpmLocalPackagesFolder();
            this.createEpmLocalPackageFolderAndVersion(packageName, version);

            for (let p = 0; p < packageFiles.length; p++) {
                const location = `${Locations.epmUserHomeLocalPackageVersionLocation(packageName, version)}\\${packageFiles[p].fileName}`;
                await fs.writeFile(location, packageFiles[p].fileContent);
            }
        }   
    }

    /**
     * Checks to see if a package already exists in the local files (we do not want to touch API if we do not have too)
     * @param packageName The package name
     * @param packageVersion The package version 
     */
    public packageVersionAlreadyInstalledLocally(packageName: string, packageVersion: string): boolean {
        const location = `${Locations.epmUserHomeLocalPackageVersionLocation(packageName, packageVersion)}`;
        return fs.existsSync(location);
    }

    /**
     * Creates the epm local folder (if it does not already exist)
     */
    private createEpmLocalFolder(): void {
        const epmLocation = Locations.epmUserHomeDir;
        if (!fs.existsSync(epmLocation)) {
            fs.mkdirSync(epmLocation);
        }
    }

    /**
     * Creates the epm local authentication folder (if it does not already exist)
     */
    private createEpmLocalAuthenticationFolder(): void {
        this.createEpmLocalFolder();
        const epmAuthenticationFolder = Locations.epmUserHomeDirAuthenticationLocation;
        if (!fs.existsSync(epmAuthenticationFolder)) {
            fs.mkdirSync(epmAuthenticationFolder);
        }
    }

    /**
     * Creates the epm local packages folder (if it does not already exist)
     */
    private createEpmLocalPackagesFolder(): void {
        const localPackageLocation = Locations.epmUserHomeLocalPackagesLocation;

        if (!fs.existsSync(localPackageLocation)) {
            fs.mkdirSync(localPackageLocation);
        }
    }

    /**
     * Creates the epm local package folder (if it does not already exist)
     * @param packageName The package name
     */
    private createEpmLocalPackageFolderAndVersion(packageName: string, packageVersion: string): void {
        // make sure the local packages folder has been created 
        this.createEpmLocalPackagesFolder();

        const packageLocation = Locations.epmUserHomeLocalPackageLocation(packageName);

        if (!fs.existsSync(packageLocation)) {
            fs.mkdirSync(packageLocation);
        }

        const versionLocation = Locations.epmUserHomeLocalPackageVersionLocation(packageName, packageVersion);

        if (!fs.existsSync(versionLocation)) {
            fs.mkdirSync(versionLocation);
        }
    }
}