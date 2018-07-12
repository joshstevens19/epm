import * as fs from "fs";
import * as util from "util";
import { GenericConsts } from "../consts/generic.consts";
import { IPackageNameAndVersion } from "../interfaces/ipackage-name-and-version";

export class Package {

    public static tempPackageLocation = "test-packages";

    constructor() { }

    public async alreadyInstalledPackages() {
        const JSONPackageDetails = await this.readPackageJson();

        return JSONPackageDetails.dependencies;
    }

    public async readPackageJson() {
        const readFile = util.promisify(fs.readFile);
        const data = await readFile(GenericConsts.epmJsonName);
        return JSON.parse(data.toString());
    }

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

    public async getAllVersionPackages(packageName: string): Promise<string[]> {
        // this logic will get replaced by a database once database decision is made 
        // for now its reading from a folder instead 

        const readDirectories = util.promisify(fs.readdir);
        return await readDirectories(Package.tempPackageLocation + "\\" + packageName) || [];
    }

    public packageVersionExists(packageName: string, version: string): boolean {
        return fs.existsSync(Package.tempPackageLocation + "\\" + packageName + "\\" + version);
    }
}