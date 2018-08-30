import { IPackageFile } from "./ipackage-file";

export interface IPackageFiles {
    version: string;
    packageName: string;
    files: IPackageFile[];
}