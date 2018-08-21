import { AuthenticationApi } from "../api-wrappers";

export class Logout {

    constructor(
        private _authenticationApi: AuthenticationApi
    ) {}

    /**
     * unauthenticates the users session
     * this means any private packages or commands which
     * you need to be logged in for will now ask for
     * authentication
     */
    public unauth(): void {
        // need to clear the token stored on the users profile
        // not sure if we should invalidate the token we created 
        // for them as it is short living anyway?!
    }
}