import * as chalk from "chalk";
import { CommandTypes } from "./enums/command-types";
import { Usage } from "./usage";
import { Ascii } from "./ascii";

export class LogHandler {
    private static readonly _requiredMessage: string = 'error: missing required argument';

    /**
     * Logs a command error
     * @param error The error string
     * @param commandType The command type 
     */
    public static logCommandError(error: string, commandType: CommandTypes): void {
        console.log(chalk.default.redBright(Ascii.error))
        this.break();
        this.logWithPadding(chalk.default.red(`epm error: - ${error}`))
        this.break();
        this.logUsages(commandType);
    }

    /**
     * Logs the usages 
     * @param commandType The command type
     * @param filter The filter for usages 
     */
    public static logUsages(commandType: CommandTypes, filter?: string): void {
        const usage = Usage.getUsageForCommandTypeUsage(commandType, filter);
        if (usage.length > 0) {
            this.logWithPadding("Usages: ")
            this.break();
            this.logWithPadding(usage);
        }
    }

    /**
     * Log error
     * @param error The error message
     * @param addLineBreaks If a line breaks should render 
     */
    public static logError(error: string, addLineBreaks = false): void {
        if (addLineBreaks) {
            this.break();
        }

        this.logWithPadding(error);

        if (addLineBreaks) {
            this.break();
        }
    }

    /**
     * Log generic error
     * @param commandType Command type
     * @param addLineBreaks If a line break should render 
     */
    public static logGenericError(commandType: CommandTypes, addLineBreaks = false): void {
        if (addLineBreaks) {
            this.break();
        }

        this.logWithPadding(`error: not a valid command for ${commandType}`);
    
        if (addLineBreaks) {
            this.break();
        }
    }

    /**
     * Break in the console
     */
    public static break() {
        console.log("");
    }

    /**
     * Logs the missing required argument
     * @param _arguments The array of arguments 
     */
    public static logMissingRequiredArguments(_arguments: string[]): void {
        this.break();
        for (let a = 0; a < _arguments.length; a++) {
            this.logError(this.buildRequiredMessage(_arguments[a]));
        }
        this.break();
    }

    /**
     * Builds the required message
     * @param argument The argument 
     */
    public static buildRequiredMessage(argument: string): string {
        return `${this._requiredMessage} '${argument}'`;
    }

    /**
     * Logs message with padding
     * @param message 
     */
    public static logWithPadding(message: string): void {
        console.log("  " + message);
    }
}