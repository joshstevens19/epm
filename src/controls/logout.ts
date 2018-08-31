import { AuthenticationApi } from "../api-wrappers";
import { Helpers } from "../common/helpers";
import { Locations } from "../common/locations";

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
    public unauthenticate(): void {
        Helpers.deleteFolderItems(Locations.epmUserHomeDirAuthenticationLocation);
    }
}