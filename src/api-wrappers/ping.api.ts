import * as rp from "request-promise";
import { CommonApi } from "./common.api";
import { HttpRequest } from "./http-request";

export class PingApi {
    public static ENDPOINT = "/ping";

    constructor(
        private _httpRequest: HttpRequest
    ) { }

    /**
     * Sees if epm server is alive
     */
    public async alive(): Promise<boolean> {
        try {
            await this._httpRequest.get<boolean>(CommonApi.buildApiUrlEndpoint(PingApi.ENDPOINT));
        } catch(error) {
            return false;
        }

        return true;
    }
}