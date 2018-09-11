import { CommonApi } from "./common.api";
import { HttpRequest } from ".";

export class TeamApi {
    public static ENDPOINT = "/teams";
    private static ADD_USER_ENDPOINT = "/users";

    constructor(
        private _httpRequest: HttpRequest,
    ) { }

    /**
     * Creates a team
     * @param teamName The team name
     * @param _private If the team is private
     */
    public async createTeam(teamName: string, _private: boolean): Promise<void> {
        const uri = CommonApi.buildApiUrlEndpoint(TeamApi.ENDPOINT);
        const body = {
            teamName,
            private: _private,
        }

        await this._httpRequest.postVoid(uri, body);
    }

    /**
     * Adds a user to a team
     * @param teamName The team name
     * @param newUser The new user username
     * @param isAdmin If the new user should be added as a admin
     */
    public async addUser(teamName: string, newUser: string, isAdmin: boolean): Promise<void> {
        const uri = this.addUserToTeamEndpoint;
        const body = {
            teamName,
            newUser,
            isAdmin
        }

        await this._httpRequest.postVoid(uri, body);
    }

    /**
     * Builds the add user to team endpoint
     */
    private get addUserToTeamEndpoint(): string {
        const endpointPath: string = `${TeamApi.ENDPOINT}${TeamApi.ADD_USER_ENDPOINT}`;
        return CommonApi.buildApiUrlEndpoint(endpointPath); 
    }

}