import * as chalk from "chalk";
import { CommandTypes } from "./enums/command-types";
import { Usage } from "./usage";
import { Ascii } from "./ascii";

export class LogHandler {
    private static readonly _requiredMessage: string = 'error: missing required argument';

    public static logCommandError(error: string, commandType: CommandTypes): void {
        console.log(chalk.default.redBright(Ascii.error))
        this.break();
        this.logWithPadding(chalk.default.red(`epm error: - ${error}`))
        this.break();
        this.logUsages(commandType);
    }

    public static logUsages(commandType: CommandTypes, filter?: string): void {
        const usage = Usage.getUsageForCommandTypeUsage(commandType, filter);
        if (usage.length > 0) {
            this.logWithPadding("Usages: ")
            this.break();
            this.logWithPadding(usage);
        }
    }

    public static logError(error: string, addLineBreaks = false): void {
        if (addLineBreaks) {
            this.break();
        }

        this.logWithPadding(error);

        if (addLineBreaks) {
            this.break();
        }
    }

    public static logGenericError(commandType: CommandTypes, addLineBreaks = false): void {
        if (addLineBreaks) {
            this.break();
        }

        this.logWithPadding(`error: not a valid command for ${commandType}`);
    
        if (addLineBreaks) {
            this.break();
        }
    }

    public static break() {
        console.log("");
    }

    public static logMissingRequiredArgument(_arguments: string[]): void {
        this.break();
        for (let a = 0; a < _arguments.length; a++) {
            this.logError(this.buildRequiredMessage(_arguments[a]));
        }
        this.break();
    }

    public static buildRequiredMessage(field: string): string {
        return `${this._requiredMessage} '${field}'`;
    }

    public static logWithPadding(message: string) {
        console.log("  " + message);
    }
}