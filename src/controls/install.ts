import * as fs from "fs-extra";
import * as util from "util";
import { Package } from "./package";
import { IPackageNameAndVersion } from "../interfaces/ipackage-name-and-version";

export class Install {
    constructor(private _packageControl: Package) { }

    public async installPackage(packageName: string): Promise<void> {
        const packageNameAndVersion: IPackageNameAndVersion = this._packageControl.getPackageNameAndVersion(packageName);

        // install the latest package
        if (!packageNameAndVersion.version) {
            await this._packageControl.getAllVersionPackages(packageNameAndVersion.name);
        }

        console.log(packageNameAndVersion.name);
        console.log(packageNameAndVersion.version);
        console.log(__dirname);

        const dir = "./ethereum_modules";
        const packageDir = dir + "//" + packageNameAndVersion.name;

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        } 

        if (!fs.existsSync(packageDir)) {
            fs.mkdirSync(packageDir)
        }

        // WILL RESOLVE TO USE PATH FOR LINX BOXES AND __dirname - do not worry 
        // just getting the concept there first
        if (!this.versionAlreadyInstalled(packageNameAndVersion)) {
            let source = Package.tempPackageLocation + "\\" + packageNameAndVersion.name + "\\" + packageNameAndVersion.version
            let destination = "ethereum_modules\\" + packageNameAndVersion.name + "\\" + packageNameAndVersion.version;

            fs.copy(source, destination)
                .then(() => console.log('Copy completed!'))
                .catch(err => {
                    console.log('An error occured while copying the folder.')
                    return console.error(err)
                })
        } else {
            throw new Error("Package version has already been installed");
        }
    }

    public installPackages(): void {
        // need to write logic
    }

    // going to change this so it has a parent property and no versions in the ethereum_modules
    public versionAlreadyInstalled(packageNameAndVersion: IPackageNameAndVersion): boolean {
        if (packageNameAndVersion.version) {
            return fs.existsSync("ethereum_modules\\" + packageNameAndVersion.name + "\\" + packageNameAndVersion.version);
        } else {
            return false;
        }
    }
}