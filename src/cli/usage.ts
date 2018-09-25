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
            "epm audit [<package>]",
            "epm audit fix [<package>]",
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
        ];

    private static readonly doctorCommands: string[] =
        [
            "epm doctor",
        ]

    private static readonly documentCommands: string[] =
        [
            "epm document [<packageName>]",
        ]

    private static readonly hookCommands: string[] =
        [
            "epm hook ls [<package>]",
            "epm hook add <url> <secret>",
            "epm hook update <id> <url> [secret]",
            "epm hook rm <id>",
        ]

    private static readonly ignoreCommands: string[] =
        [
            "epm ignore [-l|--list]",
        ]

    private static readonly initCommands: string[] =
        [
            "epm init [<team>] [-c|--complete]"
        ]

    private static readonly installCommands: string[] =
        [
            "epm install",
            "epm install <package>",
            "epm install <package>@<version>"
        ]

    private static readonly loginCommands: string[] =
        [

        ];

    private static readonly lsCommands: string[] =
        [
            "epm ls",
            "epm ls <package>",
            "epm ls <package>@<version>",
        ]

    private static readonly orgCommands: string[] =
        [
            "epm org create",
            "epm org destroy <org>",
            "epm org adduser <org> <username>",
            "epm org rmuser <org> <username>",
            "epm org lsusers <org>",
            "epm org addteam <org>",
            "epm org rmteam <org> <team>",
            "epm org lsteams <org>",
            "epm org edit <org>",
        ]

    private static readonly outdatedCommands: string[] =
        [
            "epm outdated",
            "epm outdated <package>",
            "epm outdated <package>@<version>",
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
            case CommandTypes.document:
                if (!filter) {
                    return this.buildUsageString(this.documentCommands);
                }

                return this.buildUsageStringByFilter(this.doctorCommands, filter);
            case CommandTypes.hook:
                if (!filter) {
                    return this.buildUsageString(this.hookCommands);
                }

                return this.buildUsageStringByFilter(this.hookCommands, filter);
            case CommandTypes.ignore:
                if (!filter) {
                    return this.buildUsageString(this.ignoreCommands);
                }

                return this.buildUsageStringByFilter(this.ignoreCommands, filter);
            case CommandTypes.init:
                if (!filter) {
                    return this.buildUsageString(this.initCommands);
                }

                return this.buildUsageStringByFilter(this.initCommands, filter);
            case CommandTypes.install:
                if (!filter) {
                    return this.buildUsageString(this.installCommands);
                }

                return this.buildUsageStringByFilter(this.installCommands, filter);
            case CommandTypes.login:
                if (!filter) {
                    return this.buildUsageString(this.loginCommands);
                }

                return this.buildUsageStringByFilter(this.loginCommands, filter);
            case CommandTypes.ls:
                if (!filter) {
                    return this.buildUsageString(this.lsCommands);
                }

                return this.buildUsageStringByFilter(this.lsCommands, filter);
            case CommandTypes.org:
                if (!filter) {
                    return this.buildUsageString(this.orgCommands);
                }

                return this.buildUsageStringByFilter(this.orgCommands, filter);
            case CommandTypes.outdated:
                if (!filter) {
                    return this.buildUsageString(this.outdatedCommands);
                }

                return this.buildUsageStringByFilter(this.outdatedCommands, filter);
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