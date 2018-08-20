import * as rp from "request-promise";
import { PingApi } from "../api-wrappers/ping.api";

export class Ping {
    constructor(
        private _pingApi: PingApi
    ) { }

    /**
     * Checks if the server is alive
     */
    public async alive(): Promise<boolean> {
        return await this._pingApi.alive();
    }
}