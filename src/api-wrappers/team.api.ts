import { CommonApi } from "./common.api";
import { HttpRequest } from ".";

export class TeamApi {
    public static ENDPOINT = "/teams";
    private static USER_ENDPOINT = "/users";
    private static ADMIN_USER_ENDPOINT = TeamApi.USER_ENDPOINT + "/admin";
    private static TRANSFER_OWNER = "/transfer";

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
        const uri = this.userTeamEndpoint;
        const body = {
            teamName,
            newUser,
            isAdmin
        }

        await this._httpRequest.postVoid(uri, body);
    }

    /**
     * Remove user from a team
     * This will completey remove this user 
     * @param teamName The team name
     * @param username The username in which you want to remove
     */
    public async removeUser(teamName: string, username: string): Promise<void> {
        const uri = this.userTeamEndpoint;
        const body = {
            teamName,
            username,
        }

        await this._httpRequest.deleteVoid(uri, body);
    }

    /**
     * Revoke admins permissions in a team
     * @param teamName The team name
     * @param username The username 
     */
    public async revokeAdminPermission(teamName: string, username: string): Promise<void> {
        const uri = this.adminUserTeamEndpoint;
        const body = {
            teamName,
            username
        }

        await this._httpRequest.deleteVoid(uri, body);
    }

    /**
     * Gives a user admin permission
     * @param teamName The team name
     * @param username The username for the new admin user
     */
    public async giveAdminPermission(teamName: string, username: string): Promise<void> {
        const uri = this.adminUserTeamEndpoint;
        const body = {
            teamName,
            username
        }

        await this._httpRequest.postVoid(uri, body);
    }

    /**
     * Transfers the owner of the team
     * @param teamName The team name
     * @param username The username for the new owner 
     */
    public async transferTeamOwner(teamName: string, username: string): Promise<void> {
        const uri = this.transferTeamOwnerEndpoint;
        const body = {
            teamName,
            username
        }

        await this._httpRequest.postVoid(uri, body);
    }

    /**
     * Transfers the team owner 
     */
    private get transferTeamOwnerEndpoint(): string {
        const endpointPath: string = `${TeamApi.ENDPOINT}${TeamApi.TRANSFER_OWNER}`;
        return CommonApi.buildApiUrlEndpoint(endpointPath);
    }

    /**
     * Builds the user to team endpoint
     */
    private get userTeamEndpoint(): string {
        const endpointPath: string = `${TeamApi.ENDPOINT}${TeamApi.USER_ENDPOINT}`;
        return CommonApi.buildApiUrlEndpoint(endpointPath); 
    }

    /**
     * Builds the admin user team endpoint
     */
    private get adminUserTeamEndpoint(): string {
        const endpointPath: string = `${TeamApi.ENDPOINT}${TeamApi.ADMIN_USER_ENDPOINT}`;
        return CommonApi.buildApiUrlEndpoint(endpointPath);
    }

}