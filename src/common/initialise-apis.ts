import { PingApi } from "../api-wrappers/ping.api";
import { PackageApi } from "../api-wrappers/package.api";
import { VersionApi } from "../api-wrappers/version.api";

export class InitialiseApis {
    private static _pingApi: PingApi;
    private static _packageApi: PackageApi;
    private static _versionApi: VersionApi;

    public static get pingApi(): PingApi {
        if (InitialiseApis._pingApi) {
            return InitialiseApis._pingApi;
        }

        return InitialiseApis._pingApi = new PingApi();
    }

    public static get packageApi(): PackageApi {
        if (InitialiseApis._packageApi) {
            return InitialiseApis._packageApi;
        }

        return InitialiseApis._packageApi = new PackageApi();
    }

    public static get versionApi(): VersionApi {
        if (InitialiseApis._versionApi) {
            return InitialiseApis._versionApi;
        }

        return InitialiseApis._versionApi = new VersionApi();
    }
}