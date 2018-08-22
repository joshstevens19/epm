import { EthereumPmJson } from "./ethereum-pm-json";
import { InitErrorMessages } from "../error-messages/init-error-messages";

export class Init {
    constructor(
        private _ethereumPmJson: EthereumPmJson,
    ) { }

    /**
     * Initialises the project
     */
    public async initialiseProject(): Promise<void> {
        if (!this.hasBeenInitialised) {
            try {
                await this._ethereumPmJson.createEthereumPmJson();
            } catch (err) {
                throw new Error(err);
            }
        } else {
            throw new Error(InitErrorMessages.alreadyInitalised);
        }
    }

    /**
     * Checks to see if the project has already been initialised
     */
    public get hasBeenInitialised() {
        return this._ethereumPmJson.ethereumPmJsonExists()
    }
}