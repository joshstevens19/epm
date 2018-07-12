import * as fs from "fs-extra";
import * as util from "util";
import * as path from "path";
import { Iinit } from "../interfaces/iinit";
import { GenericConsts } from "../consts/generic.consts";
import { IEthereumPMJson } from "../interfaces/iethereum-pm-json";

export class Init implements Iinit {
    private _basicEpmJson: IEthereumPMJson = require('../../json/basic-ethereum-pm.json');

    constructor() { }

    public async initialiseProject() {
        try {
            await fs.writeFile(GenericConsts.epmJsonName, this.basicEthereumPmJson);
        } catch(err) {
            throw new Error(err);
        }
    }

    public get basicEthereumPmJson() {
        const projectName = path.resolve(__dirname);
        this._basicEpmJson.name = projectName;
        return JSON.stringify(this._basicEpmJson);
    }

    public get hasBeenInitialised() {
        return fs.existsSync("./" + GenericConsts.epmJsonName)
    }
}