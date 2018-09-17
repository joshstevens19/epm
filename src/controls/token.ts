import { Jwt } from "./jwt";

export class Token {
    constructor(
        private _jwtControl: Jwt
    ) { }

    /**
     * Gets the current JWT token
     * - use jwt.io to unpact it or the API to see your claims
     */
    public async getCurrentJwtToken(): Promise<string | null> {
        return await this._jwtControl.getJwtToken();
    }

    /**
     * Gets the current JWT token created on date
     */
    public async getCurrentJwtTokenCreatedOnDate(): Promise<Date | null> {
        return await this._jwtControl.getJwtCreatedOnDate();
    }

    /**
     * Gets the current decoded JWT token
     * This was chosen to be a `any` for a reason
     */
    public async getCurrentDecodedJwt(): Promise<any> {
        return await this._jwtControl.decodeJwt();
    }

    /**
     * Gets the current jwt token expiry date
     */
    public async getCurrentJwtTokenExpiryDate(): Promise<Date | null> {
        return await this._jwtControl.getJwtExpiryDate();
    }
}