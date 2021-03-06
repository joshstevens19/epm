import * as fs from "fs-extra";
import { EthereumPmJson } from ".";
import { EpmIgnore } from "./epm-ignore";
import { IPackageFiles } from "../interfaces/ipackage-files";
import { PackageApi } from "../api-wrappers";

export class Publish {
    constructor(
        private _ethereumPmJsonControl: EthereumPmJson,
        private _epmIgnoreControl: EpmIgnore,
        private _packageApi: PackageApi,
    ) { }

    /**
     * Uploads a package - (maybe change to publish)
     */
    public async publishPackage(): Promise<void> {
        const executedLocation = process.cwd();

        if (this._ethereumPmJsonControl.ethereumPmJsonExists()) {

            // can not be null as i have checked if the file exists 
            // still could not valid JSON so could throw a error
            const ethereumPmJson = await this._ethereumPmJsonControl.getEthereumPmJsonFile();

            if (this._ethereumPmJsonControl.ethereumPmJsonHasMandatoryFieldsValues(ethereumPmJson)) {
                const files = await fs.readdir(executedLocation);
                const uploadableFiles: IPackageFiles = {
                    version: ethereumPmJson.version,
                    packageName: ethereumPmJson.name,
                    files: [],
                };

                const ignoreFiles = await this._epmIgnoreControl.epmIgnoreFiles();

                for (let f = 0; f < files.length; f++) {
                    if (!ignoreFiles.includes(files[f])) {
                        const fileContent = await fs.readFile(files[f], 'utf8');

                        uploadableFiles.files.push({
                            fileName: files[f],
                            fileContent,
                        });
                    }
                }
                if (uploadableFiles.files.length) {
                    await this._packageApi.publishPackage(uploadableFiles);
                } else {
                    throw new Error("You have to have files which can be published to create a package");
                }

            } else {
                throw new Error("ethereum-pm.json has some invalid data");
            }

        } else {
            throw new Error(`No ethereum-pm.json present in executed location - ${executedLocation}`);
        }
    }
}