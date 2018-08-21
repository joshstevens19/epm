import { AuthenticationApi, PingApi, PackageApi, VersionApi } from "../api-wrappers";

export class InitialiseApis {
    private static _authenticationApi: AuthenticationApi;
    private static _pingApi: PingApi;
    private static _packageApi: PackageApi;
    private static _versionApi: VersionApi;

    public static get authenticationApi(): AuthenticationApi {
        if (InitialiseApis._authenticationApi) {
            return InitialiseApis._authenticationApi;
        }

        return InitialiseApis._authenticationApi = new AuthenticationApi();
    }

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