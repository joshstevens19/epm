import * as fs from "fs";
import * as util from "util";
import * as path from "path";
import { Iinit } from "../interfaces/iinit";
import { GenericConsts } from "../consts/generic.consts";
import { IEthereumPMJson } from "../interfaces/iethereum-pm-json";

export class Init implements Iinit {
    private _basicEthereumPmJson: IEthereumPMJson = require('../../json/basic-ethereum-pm.json');

    constructor() { }

    public async initialiseProject() {
        try {
            const writeFile = util.promisify(fs.writeFile);
            await writeFile(GenericConsts.ethereumPMJsonName, this.basicEthereumPmJson);
        } catch(err) {
            throw new Error(err);
        }
    }

    public get basicEthereumPmJson() {
        const projectName = path.resolve(__dirname);
        this._basicEthereumPmJson.name = projectName;
        return JSON.stringify(this._basicEthereumPmJson);
    }

}