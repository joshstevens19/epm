import { AuthenticationApi } from "../api-wrappers";
import { LocalEpmFiles } from "./local-epm-files";
import { ILoginResponse } from "../interfaces/api-reponses/ilogin-response";

export class Login {
    constructor(
        private _authenticationApi: AuthenticationApi,
        private _localEpmFiles: LocalEpmFiles
    ) { }

    /**
     * Authenticates the user
     * @param username The username
     * @param password The password
     */
    public async authenticate(username: string, password: string, rememberMe = false): Promise<void> {
        const loginResponse: ILoginResponse = await this._authenticationApi.login(username, password, rememberMe);

        await this._localEpmFiles.saveAuthenticationToken(loginResponse.token);
    }
}