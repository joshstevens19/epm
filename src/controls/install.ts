import * as fs from "fs-extra";
import * as util from "util";
import { IPackageNameAndVersion } from "../interfaces/ipackage-name-and-version";
import { Init, Package } from ".";
import { InitErrorMessages } from "../error-messages/init-error-messages";
import { InstallErrorMessages } from "../error-messages/install-error-messages";
import { GenericConsts } from "../consts/generic.consts";

export class Install {
    constructor(
        private _packageControl: Package,
        private _initControl: Init
    ) { }

    public async installPackage(packageName: string): Promise<void> {
        if (this._initControl.hasBeenInitialised) {
            const packageNameAndVersion: IPackageNameAndVersion = this._packageControl.getPackageNameAndVersion(packageName);
            // console.log(__dirname);

            // make sure all the folders are greated if it is a first install 
            // of this package
            this.createModulesFolders(packageNameAndVersion.name);

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
            }
            
        } else {
            return Promise.reject(new Error(InitErrorMessages.notInitalised));
        }
    }

    public installPackages() {
        if (this._initControl.hasBeenInitialised) {
            // need to write logic
        } else {
            return Promise.reject(new Error(InitErrorMessages.notInitalised));
        }
    }

    public createModulesFolders(packageName: string): void {
        if (!fs.existsSync(GenericConsts.epmModulesFolderName)) {
            fs.mkdirSync(GenericConsts.epmModulesFolderName);
        }

        const packageDir = GenericConsts.epmModulesFolderName + "//" + packageName;

        if (!fs.existsSync(packageDir)) {
            fs.mkdirSync(packageDir)
        }
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