import * as rp from "request-promise";
import { CommonApi } from "./common.api";
import { HttpRequest } from "./http-request";

export class AuthenticationApi {
    private static readonly ENDPOINT = "/authentication";
    private static readonly LOGIN_ENDPOINT = "/login";
    private static readonly LOGOUT_ENDPOINT = "/logout";
    
    // this should be moved to the profile API
    private static readonly WHO_AM_I = "/whoami";

    constructor(
        private _httpRequest: HttpRequest,
    ) { }

    /**
     * Logins the user into epm
     * This will return a token at some point which will be stored
     * in the users files to authenticate for a certain amount of time
     * @param username The username
     * @param password The password
     * @param rememberMe This will make the token last for a year on the users computer
     */
    public async login(username: string, password: string, rememberMe = false): Promise<string> {
        const body = {
            username,
            password,
            expiryMinutes: 30
        };

        if (rememberMe) {
            body.expiryMinutes = (60 * 24) * 365; // makes the token expiry minutes a year
        }

        const jwtToken = await this._httpRequest.post<string>(this.loginEndPoint, body, true);
        return jwtToken;
    }

    /**
     * Logs the user out
     */
    public async logout(): Promise<void> {
        // probably should invalidate the token
        // this for now may just delete the token
        // which is stored in the users files
        // so may not need a API call
    }

    /**
     * Builds login endpoint 
     */
    private get loginEndPoint(): string {
        const endpointPath = `${AuthenticationApi.ENDPOINT}${AuthenticationApi.LOGIN_ENDPOINT}`;
        return CommonApi.buildApiUrlEndpoint(endpointPath);
    }
}