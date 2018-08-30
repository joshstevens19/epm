import { AuthenticationApi } from "../api-wrappers";
import { LocalEpmFiles } from "./local-epm-files";

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
        const jwtToken = await this._authenticationApi.login(username, password, rememberMe);
    
        this._localEpmFiles.saveAuthenticationToken(jwtToken);
    }
}