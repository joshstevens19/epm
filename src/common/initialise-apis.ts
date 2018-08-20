import { PingApi } from "../api-wrappers/ping.api";

export class InitialiseApis {
    private static _pingApi: PingApi;

    public static get pingApi(): PingApi {
        if (InitialiseApis._pingApi) {
            return InitialiseApis._pingApi;
        }

        return InitialiseApis._pingApi = new PingApi();
    }
}