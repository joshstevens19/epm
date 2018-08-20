import * as rp from "request-promise";
import { CommonPropertiesApi } from "./common.api";

export class PingApi {
    public static ENDPOINT = "/ping";

    /**
     * Sees if epm server is alive
     */
    public async alive(): Promise<boolean> {
        try {
            await rp.get(CommonPropertiesApi.buildApiUrlEndpoint(PingApi.ENDPOINT));
        } catch(error) {
            return false;
        }

        return true;
    }
}