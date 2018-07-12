import * as fs from "fs";
import { Core } from "../controls/core";
import { IDependencies } from "../interfaces/idependencies";

export class LS {

    private _core = new Core();

    constructor() { }

    public async dependencies() {
        return await this._core.packages();
    }
}