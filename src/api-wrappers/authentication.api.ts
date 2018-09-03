import * as rp from "request-promise";
import { CommonApi } from "./common.api";
import { HttpRequest } from "./http-request";
import { ILoginResponse } from "../interfaces/api-reponses/ilogin-response";
import { IRegister } from "../interfaces/iregister";
import { IRegisterResponse } from "../interfaces/api-reponses/iregister-response";

export class AuthenticationApi {
    private static readonly ENDPOINT = "/authentication";
    private static readonly LOGIN_ENDPOINT = "/login";
    private static readonly LOGOUT_ENDPOINT = "/logout";
    private static readonly REGISTER_ENDPOINT = "/register";
    
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
    public async login(username: string, password: string, rememberMe = false): Promise<ILoginResponse> {
        const body = {
            username,
            password,
            expiryMinutes: 30
        };

        if (rememberMe) {
            body.expiryMinutes = (60 * 24) * 365; // makes the token expiry minutes a year
        }

        const loginResponse = await this._httpRequest.post<ILoginResponse>(this.loginEndPoint, body);
        return loginResponse;
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
     * Registers a user to epom
     * @param user The users details
     */
    public async register(user: IRegister): Promise<IRegisterResponse> {
        const body = user;

        const registerResponse = await this._httpRequest.post<IRegisterResponse>(this.registerEndPoint, body)
        return registerResponse;
    }

    /**
     * Builds login endpoint 
     */
    private get loginEndPoint(): string {
        const endpointPath = `${AuthenticationApi.ENDPOINT}${AuthenticationApi.LOGIN_ENDPOINT}`;
        return CommonApi.buildApiUrlEndpoint(endpointPath);
    }

    /**
     * Builds register endpoint
     */
    private get registerEndPoint(): string {
        const endpointPath = `${AuthenticationApi.ENDPOINT}${AuthenticationApi.REGISTER_ENDPOINT}`;
        return CommonApi.buildApiUrlEndpoint(endpointPath);
    }
}