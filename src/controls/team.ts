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
    public async CreateTeam(teamName: string, _private: boolean = false): Promise<void> {
        await this._teamApi.createTeam(teamName, _private);
    }

    public async DeleteTeam(teamName: string) {

    }

    /**
     * Adds a user to a team
     * @param teamName The team name
     * @param newUser The new user username
     * @param isAdmin If the new user should be added as a admin
     */
    public async AddUser(teamName: string, newUser: string, isAdmin: boolean): Promise<void> {
        await this._teamApi.addUser(teamName, newUser, isAdmin);
    }

    public async RemoveUser(teamName: string, username: string) {

    }

    public async GetAllTeams() {

    }
}