import * as fs from "fs-extra";
import { GenericConsts } from "../consts/generic.consts";

export class EpmIgnore {
    constructor() { }

    public epmIgnoreFileExists(): boolean {
        return fs.existsSync(GenericConsts.epmIgnoreFileName)
    }

    public gitIgnoreFileExists(): boolean {
        return fs.existsSync(GenericConsts.gitIgnoreFileName);
    }

    public async epmIgnoreFiles(): Promise<string[]> {
        if (this.epmIgnoreFileExists()) {
            let file = (await fs.readFile(GenericConsts.epmIgnoreFileName, 'utf8')).toString();
            //file = file.replace(/\s/g,' ');

            // need to remove all white space and tab space to get file names
            // ********TO DO*******
            const files = file.split(" ");

            if (!files.includes(GenericConsts.epmModulesFolderName)) {
                files.push(GenericConsts.epmModulesFolderName);
            }

            return files;
        } else {
            if (this.gitIgnoreFileExists()) {
                let file = fs.readdirSync(GenericConsts.gitIgnoreFileName).toString();
                // use the git ignore file if there is no overide 
                // need to remove all white space and tab space to get file names

                // TO DO

                return [];
            }
            
            return [];
        }
    }
}