import { CommandTypes } from "./enums/command-types";

export class Usage {
    private static readonly accessCommands: string[] =
        [
            "epm access public [<package>]",
            "epm access private [<package>]",
            "epm access grant <read-only|read-write> <scope:team> [<package>]",
            "epm access revoke <scope:team> [<package>]",
            "epm access ls [<user>|<scope>|<scope:team>]",
        ];

    private static readonly auditCommands: string[] =
        [
            "epm audit",
            "epm audit <package>",
            "epm audit fix",
            "epm audit fix <package>",
        ];

    private static readonly binCommands: string[] =
        [
            "epm bin",
            "epm bin --global",
        ];

    private static readonly cacheCommands: string[] =
        [
            "epm cache clean",
        ];

    private static readonly deprecateCommands: string[] =
        [
            "epm deprecate <package>[@<version>] <message>",
            "epm deprecate <package> <message>",
        ];

    private static readonly doctorCommands: string[] =
        [
            "epm doctor",
        ]

    /**
     * Gets the usage for command type
     * @param commandType 
     */
    public static getUsageForCommandTypeUsage(commandType: CommandTypes, filter?: string): string {
        switch (commandType) {
            case CommandTypes.access:
                if (!filter) {
                    return this.buildUsageString(this.accessCommands);
                }

                return this.buildUsageStringByFilter(this.accessCommands, filter);
            case CommandTypes.audit:
                if (!filter) {
                    return this.buildUsageString(this.auditCommands);
                }

                return this.buildUsageStringByFilter(this.arguments, filter);
            case CommandTypes.bin:
                if (!filter) {
                    return this.buildUsageString(this.binCommands);
                }

                return this.buildUsageStringByFilter(this.binCommands, filter);

            case CommandTypes.cache:
                if (!filter) {
                    return this.buildUsageString(this.cacheCommands);
                }

                return this.buildUsageStringByFilter(this.cacheCommands, filter);
            case CommandTypes.deprecate:
                if (!filter) {
                    return this.buildUsageString(this.deprecateCommands);
                }

                return this.buildUsageStringByFilter(this.deprecateCommands, filter);
            case CommandTypes.doctor:
                if (!filter) {
                    return this.buildUsageString(this.doctorCommands);
                }

                return this.buildUsageStringByFilter(this.doctorCommands, filter);
            default:
                // should never be default maybe throw a error
                return "";
        }
    }

    private static buildUsageString(commands: string[]): string {
        let usageCommands = ``;
        for (let c = 0; c < commands.length; c++) {
            if (usageCommands.length === 0) {
                usageCommands = commands[c];
            } else {
                usageCommands += `\n  ${commands[c]}`;
            }
        }

        return usageCommands;
    }

    private static buildUsageStringByFilter(commands: string[], filter: string): string {
        const filteredCommands = commands.filter(c => c.includes(filter));
        return this.buildUsageString(filteredCommands);
    }
}