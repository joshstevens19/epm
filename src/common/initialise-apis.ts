import { AuthenticationApi, PingApi, PackageApi, VersionApi, HttpRequest } from "../api-wrappers";
import { InitialiseControls } from "./initialise-controls";

export class InitialiseApis {
    private static _httpRequest: HttpRequest;

    private static _authenticationApi: AuthenticationApi;
    private static _pingApi: PingApi;
    private static _packageApi: PackageApi;
    private static _versionApi: VersionApi;

    public static get authenticationApi(): AuthenticationApi {
        if (InitialiseApis._authenticationApi) {
            return InitialiseApis._authenticationApi;
        }

        return InitialiseApis._authenticationApi = new AuthenticationApi(this.httpRequest);
    }

    public static get pingApi(): PingApi {
        if (InitialiseApis._pingApi) {
            return InitialiseApis._pingApi;
        }

        return InitialiseApis._pingApi = new PingApi(this.httpRequest);
    }

    public static get packageApi(): PackageApi {
        if (InitialiseApis._packageApi) {
            return InitialiseApis._packageApi;
        }

        return InitialiseApis._packageApi = new PackageApi(this.httpRequest);
    }

    public static get versionApi(): VersionApi {
        if (InitialiseApis._versionApi) {
            return InitialiseApis._versionApi;
        }

        return InitialiseApis._versionApi = new VersionApi(this.httpRequest);
    }

    public static get httpRequest(): HttpRequest {
        if (InitialiseApis._httpRequest) {
            return InitialiseApis._httpRequest;
        }

        return InitialiseApis._httpRequest = new HttpRequest(InitialiseControls.jwtControl);
    }
}