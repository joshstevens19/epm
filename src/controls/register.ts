import { IRegister } from "../interfaces/iregister";
import { IRegisterResponse } from "../interfaces/api-reponses/iregister-response";
import { AuthenticationApi } from "../api-wrappers";
import { LocalEpmFiles } from ".";

export class Register {
    constructor(
        private _authenticationApi: AuthenticationApi,
        private _localEpmFiles: LocalEpmFiles
    ) { }

    /**
     * Creates a user
     * @param user The user details 
     */
    public async createUser(user: IRegister): Promise<void> {
        const registerResponse: IRegisterResponse = await this._authenticationApi.register(user);

        await this._localEpmFiles.saveAuthenticationToken(registerResponse.token);
    }
}