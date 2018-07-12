import * as fs from "fs";
import * as util from "util";
import { GenericConsts } from "../consts/generic.consts";
import { ICore } from "../interfaces/icore";

export class Core implements ICore {

    constructor() {
        
    }

    public async packages() {
        const JSONPackageDetails = await this.readPackageJson();

        return JSONPackageDetails.dependencies;
    }

    public async readPackageJson() {        
        const readFile = util.promisify(fs.readFile);
        const data = await readFile(GenericConsts.ethereumPMJsonName);
        return JSON.parse(data.toString());
    }
}