import { ICore } from "../interfaces/icore";

export class Install {
    constructor(private _coreControl: ICore) { }

    public async installPackage(packageName: string, packageVersion: string): Promise<void> {
        console.log(this._coreControl);
    }
}