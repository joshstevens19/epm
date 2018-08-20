export class CommonPropertiesApi {
    // read from a config file in once live
    private static readonly API_ROOT = "http://localhost:49936/api";
    private static readonly VERSION_1 = "/v1";
    private static readonly LATEST_VERSION = CommonPropertiesApi.VERSION_1;

    /**
     * Gets the api root api endpoint
     */
    public static get apiEndpint() {
        return this.API_ROOT;
    }

    /**
     * Gets the latest version of the API
     */
    public static get apiLatestVersion() {
        return this.LATEST_VERSION;
    }

    /**
     * Builds up the api url endpoint 
     * @param endpointPath Your endpoint path (include query strings if you want)
     */
    public static buildApiUrlEndpoint(endpointPath: string) {
        return this.apiEndpint + endpointPath;
    }
}