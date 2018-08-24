import * as rp from "request-promise";
import { HttpVerb } from "../enums/http-verbs";

export class HttpRequest {

    /**
     * Get Http request
     * @param uri The URI for the request
     * @param qa The 
     * @param passTokenToRequest If you want the JWT token to be passed through to the request
     */
    public async get<T>(uri: string, passTokenToRequest: boolean = false, queryParameters: any = null): Promise<T> {
        const options: any = {
            uri,
        }

        if (queryParameters) {
            options.qa = queryParameters;
        }

        const response = JSON.parse(await rp.get(options)) as T
        return response;
    }

    /**
     * Post Http request - if you want are expecting a return type
     * @param uri The URI for the request 
     * @param body The body for the request
     * @param passTokenToRequest If you want the JWT token to be passed through to the request
     */
    public async post<T>(uri: string, body: any, passTokenToRequest: boolean= false): Promise<T> {
        const options = this.buildPostOptions(uri, body, passTokenToRequest);
        
        const response = JSON.parse(await rp.post(options)) as T;
        return response;
    }

    /**
     * Post Http request - this will throw a exception if it is not successful
     * @param uri The URI for the request
     * @param body The body for the request
     * @param passTokenToRequest If you want the JWT token to be passed through to the request
     */
    public async postVoid(uri: string, body: any, passTokenToRequest: boolean = false): Promise<void> {
        const options = this.buildPostOptions(uri, body, passTokenToRequest);
        await rp.post(options);
    }

    /**
     * Put Http request - if you want are expecting a return type
     * @param uri The URI for the request 
     * @param body The body for the request
     * @param passTokenToRequest If you want the JWT token to be passed through to the request
     */
    public async put<T>(uri: string, body: any, passTokenToRequest: boolean = false): Promise<T> {
       const options = this.buildPutOptions(uri, body, passTokenToRequest);

       const response = JSON.parse(await rp.put(options)) as T;
       return response;
    }

    /**
     * Put Http request - this will throw a exception if it is not successful
     * @param uri The URI for the request
     * @param body The body for the request
     * @param passTokenToRequest If you want the JWT token to be passed through to the request
     */
    public async putVoid(uri: string, body: any, passTokenToRequest: boolean = false): Promise<void> {
        const options = this.buildPutOptions(uri, body, passTokenToRequest);
        await rp.put(options);
    }

    /**
     * Delete Http request - this will throw a exception if it is not successful
     * @param uri The URI for the request
     * @param body The body for the request
     * @param passTokenToRequest If you want the JWT token to be passed through to the request
     */
    public async delete<T>(uri: string, body: any, passTokenToRequest: boolean = false): Promise<T> {
        const options = this.buildDeleteOptions(uri, body, passTokenToRequest);

        const response = JSON.parse(await rp.delete(options)) as T;
        return response;
    }

    /**
     * Delete Http request - this will throw a exception if it is not successful
     * @param uri The URI for the request
     * @param body The body for the request
     * @param passTokenToRequest If you want the JWT token to be passed through to the request
     */
    public async deleteVoid(uri: string, body: any, passTokenToRequest: boolean = false): Promise<void> {
        const options = this.buildDeleteOptions(uri, body, passTokenToRequest);
        await rp.delete(options);
    }

    /**
     * Put Http request - this will throw a exception if it is not successful
     * @param uri The URI for the request
     * @param body The body for the request
     * @param passTokenToRequest If you want the JWT token to be passed through to the request
     */
    public async patch<T>(uri: string, body: any, passTokenToRequest: boolean = false): Promise<T> {
        const options = this.buildPatchOptions(uri, body, passTokenToRequest);

        const response = JSON.parse(await rp.patch(options)) as T;
        return response;
    }

    /**
     * patch Http request - this will throw a exception if it is not successful
     * @param uri The URI for the request
     * @param body The body for the request
     * @param passTokenToRequest If you want the JWT token to be passed through to the request
     */
    public async patchVoid(uri: string, body: any, passTokenToRequest: boolean = false): Promise<void> {
        const options = this.buildPatchOptions(uri, body, passTokenToRequest);
        await rp.patch(options);
    }

    /**
     * Builds the post options
     * @param uri The URI
     * @param body The body
     * @param passTokenToRequest If the request should contain the JWT token 
     */
    private buildPostOptions(uri: string, body: any, passTokenToRequest: boolean) {
        return {
            method: HttpVerb.POST,
            uri,
            body,
        }
    }

    /**
     * Builds the put options
     * @param uri The URI
     * @param body The body
     * @param passTokenToRequest If the request should contain the JWT token
     */
    private buildPutOptions(uri: string, body: any, passTokenToRequest: boolean) {
        return {
            method: HttpVerb.PUT,
            uri,
            body,
        }
    }

    /**
     * Build the delete options
     * @param uri The URI
     * @param body The body
     * @param passTokenToRequest If the request should contain the JWT token
     */
    private buildDeleteOptions(uri: string, body: any, passTokenToRequest: boolean) {
        return {
            method: HttpVerb.DELETE,
            uri,
            body,
        }
    }

    /**
     * Build the patch options
     * @param uri The URI
     * @param body The body
     * @param passTokenToRequest If the request should contain the JWT token
     */
    private buildPatchOptions(uri: string, body: any, passTokenToRequest: boolean) {
        return {
            method: HttpVerb.PATH,
            uri,
            body,
        }
    }
}