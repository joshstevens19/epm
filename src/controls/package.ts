import * as fs from "fs-extra";
import { IPackageNameAndVersion } from "../interfaces/ipackage-name-and-version";

// CURRENTLY DONE FOR DEV REASON, WILL BE MOVING OVER TO A API WHICH HOLDS 
// ALL THE INFO ABOUT THE PACKAGES
export class Package {

    public static tempPackageLocation = "test-packages";

    constructor() { }

    public getPackageNameAndVersion(packageName: string): IPackageNameAndVersion {
        const splitNameAndVersion = packageName.split("@");

        if (splitNameAndVersion.length === 2) {
            return {
                name: splitNameAndVersion[0],
                version: splitNameAndVersion[1],
            } as IPackageNameAndVersion
        } else {
            return {
                name: packageName
            } as IPackageNameAndVersion
        }
    }

    public getAllVersionPackages(packageName: string): string[] {
        // this logic will get replaced by a database once database decision is made 
        // for now its reading from a folder instead 
        return fs.readdirSync(this.buildTempPackagePath(packageName)) || [];
    }

    public packageVersionExists(packageNameAndVersion: IPackageNameAndVersion): boolean {
        if (!packageNameAndVersion.version) {
            throw new Error("you must supply a version");
        }

        return fs.existsSync(this.buildTempPackagePathWithVersion(packageNameAndVersion));
    }

    public getLatestVersionForPackage(packageName: string): string {
        const allPackages = this.getAllVersionPackages(packageName);
        console.log(allPackages);
        if (allPackages.length > 0) {
            console.log(allPackages);
            return allPackages[allPackages.length -1];
        } else {
            throw new Error("ERROR FOR NOW");
        }
    }

    public buildTempPackagePath(packageName: string) {
        return Package.tempPackageLocation + "\\" + packageName;
    }

    public buildTempPackagePathWithVersion(packageNameAndVersion: IPackageNameAndVersion) {
        if (!packageNameAndVersion.version) {
            throw new Error("you must supply a version");
        }
        return Package.tempPackageLocation + "\\" + packageNameAndVersion.name + "\\" + packageNameAndVersion.version
    }
}