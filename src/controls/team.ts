import { TeamApi } from "../api-wrappers";

export class Team {
    
    constructor(
        private _teamApi: TeamApi
    ) { }

    /**
     * Creates a team
     * @param teamName The team name
     * @param _private If the team should be private
     */
    public async createTeam(teamName: string, _private: boolean = false): Promise<void> {
        await this._teamApi.createTeam(teamName, _private);
    }

    /**
     * Adds a user to a team
     * @param teamName The team name
     * @param newUser The new user username
     * @param isAdmin If the new user should be added as a admin
     */
    public async addUser(teamName: string, newUser: string, isAdmin: boolean): Promise<void> {
        await this._teamApi.addUser(teamName, newUser, isAdmin);
    }

    /**
     * Removes a user from a team
     * @param teamName The team name
     * @param username The username
     */
    public async removeUser(teamName: string, username: string): Promise<void> {
        await this._teamApi.removeUser(teamName, username);
    }
    
    /**
     * Revoke admins permissions in a team
     * @param teamName The team name
     * @param username The username 
     */
    public async revokeAdminPermission(teamName: string, username: string): Promise<void> {
        await this._teamApi.revokeAdminPermission(teamName, username);
    }

    /**
     * Gives a user admin permission
     * @param teamName The team name
     * @param username The username for the new admin user
     */
    public async giveAdminPermission(teamName: string, username: string): Promise<void> {
        await this._teamApi.giveAdminPermission(teamName, username);
    }

    /**
     * Transfers the owner of the team
     * @param teamName The team name
     * @param username The username for the new owner 
     */
    public async transferTeamOwner(teamName: string, username: string): Promise<void> {
        await this._teamApi.transferTeamOwner(teamName, username);
    }
}