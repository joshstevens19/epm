import { AuthenticationApi } from "../api-wrappers";

export class Login {
    constructor(
        private _authenticationApi: AuthenticationApi
    ) {}

    /**
     * Authenticates the user
     * @param username The username
     * @param password The password
     */
    public async auth(username: string, password: string): Promise<void> {
        await this._authenticationApi.login(username, password);
    }
}