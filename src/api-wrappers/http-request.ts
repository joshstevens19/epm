import * as rp from "request-promise";
import { HttpVerb } from "../enums/http-verbs";
import { Jwt } from "../controls/jwt";

export class HttpRequest {

    constructor(
        private _jwtControl: Jwt
    ) { }

    /**
     * Get Http request
     * @param uri The URI for the request
     * @param qa The 
     * @param passTokenToRequest If you want the JWT token to be passed through to the request
     */
    public async get<T>(uri: string, queryParameters: any = null): Promise<T> {
        const options = await this.buildGetOptions(queryParameters);

        const response = JSON.parse(await rp.get(uri, options)) as T
        return response;
    }

    /**
     * Post Http request - if you want are expecting a return type
     * @param uri The URI for the request 
     * @param body The body for the request
     * @param passTokenToRequest If you want the JWT token to be passed through to the request
     */
    public async post<T>(uri: string, body: any): Promise<T> {
        const options = await this.buildPostOptions(uri, body);
        
        const response = await rp.post(options) as T;

        return response;
    }

    /**
     * Post Http request - this will throw a exception if it is not successful
     * @param uri The URI for the request
     * @param body The body for the request
     * @param passTokenToRequest If you want the JWT token to be passed through to the request
     */
    public async postVoid(uri: string, body: any): Promise<void> {
        const options = await this.buildPostOptions(uri, body);
        await rp.post(uri, options);
    }

    /**
     * Put Http request - if you want are expecting a return type
     * @param uri The URI for the request 
     * @param body The body for the request
     * @param passTokenToRequest If you want the JWT token to be passed through to the request
     */
    public async put<T>(uri: string, body: any): Promise<T> {
       const options = await this.buildPutOptions(uri, body);

       const response = JSON.parse(await rp.put(options)) as T;
       return response;
    }

    /**
     * Put Http request - this will throw a exception if it is not successful
     * @param uri The URI for the request
     * @param body The body for the request
     * @param passTokenToRequest If you want the JWT token to be passed through to the request
     */
    public async putVoid(uri: string, body: any): Promise<void> {
        const options = await this.buildPutOptions(uri, body);
        await rp.put(options);
    }

    /**
     * Delete Http request - this will throw a exception if it is not successful
     * @param uri The URI for the request
     * @param body The body for the request
     * @param passTokenToRequest If you want the JWT token to be passed through to the request
     */
    public async delete<T>(uri: string, body: any): Promise<T> {
        const options = await this.buildDeleteOptions(uri, body);

        const response = JSON.parse(await rp.delete(options)) as T;
        return response;
    }

    /**
     * Delete Http request - this will throw a exception if it is not successful
     * @param uri The URI for the request
     * @param body The body for the request
     * @param passTokenToRequest If you want the JWT token to be passed through to the request
     */
    public async deleteVoid(uri: string, body: any): Promise<void> {
        const options = await this.buildDeleteOptions(uri, body);
        await rp.delete(uri, options);
    }

    /**
     * Put Http request - this will throw a exception if it is not successful
     * @param uri The URI for the request
     * @param body The body for the request
     * @param passTokenToRequest If you want the JWT token to be passed through to the request
     */
    public async patch<T>(uri: string, body: any): Promise<T> {
        const options = await this.buildPatchOptions(uri, body);

        const response = JSON.parse(await rp.patch(options)) as T;
        return response;
    }

    /**
     * patch Http request - this will throw a exception if it is not successful
     * @param uri The URI for the request
     * @param body The body for the request
     * @param passTokenToRequest If you want the JWT token to be passed through to the request
     */
    public async patchVoid(uri: string, body: any): Promise<void> {
        const options = await this.buildPatchOptions(uri, body);
        await rp.patch(options);
    }

    /**
     * Adds the bearer token to the options request
     * @param options 
     */
    private async addAuthenicationToOptions(options: any): Promise<any> {
        const jwtToken = await this._jwtControl.getJwtToken();

        if (jwtToken) {
            options.auth = {
                'bearer': jwtToken
            }
        }

        return options;
    }

    /**
     * Builds the get options
     * @param uri The URI
     * @param passTokenToRequest If the request should contain the JWT token
     */
    private async buildGetOptions(queryParameters: any) {
        const options: any = {
            method: HttpVerb.GET,
        }

        if (queryParameters) {
            options.qa = queryParameters;
        }

        return await this.addAuthenicationToOptions(options);
    }

    /**
     * Builds the post options
     * @param uri The URI
     * @param body The body
     * @param passTokenToRequest If the request should contain the JWT token 
     */
    private async buildPostOptions(uri: string, body: any) {
        const options: any = {
            method: HttpVerb.POST,
            uri,
            body,
            json: true,
        }

        return await this.addAuthenicationToOptions(options);
    }

    /**
     * Builds the put options
     * @param uri The URI
     * @param body The body
     * @param passTokenToRequest If the request should contain the JWT token
     */
    private async buildPutOptions(uri: string, body: any) {
        const options: any = {
            method: HttpVerb.PUT,
            uri,
            body,
            json: true,
        }

        return await this.addAuthenicationToOptions(options);
    }

    /**
     * Build the delete options
     * @param uri The URI
     * @param body The body
     * @param passTokenToRequest If the request should contain the JWT token
     */
    private async buildDeleteOptions(uri: string, body: any) {
        const options: any = {
            method: HttpVerb.DELETE,
            uri,
            body,
            json: true,
        }

        return await this.addAuthenicationToOptions(options);
    }

    /**
     * Build the patch options
     * @param uri The URI
     * @param body The body
     * @param passTokenToRequest If the request should contain the JWT token
     */
    private async buildPatchOptions(uri: string, body: any) {
        const options: any = {
            method: HttpVerb.PATCH,
            uri,
            body,
            json: true,
        }

        return await this.addAuthenicationToOptions(options);
    }
}