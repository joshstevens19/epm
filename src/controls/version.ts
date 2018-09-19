import { EthereumPmJson } from "./ethereum-pm-json";
import { VersionBump } from "../enums/version-bump";
import { ISemanticVersion } from "../interfaces/isemantic-version";

export class Version {
    constructor(
        private _ethereumPmJsonControl: EthereumPmJson,
    ) { }

    /**
     * Bumps the version of the package 
     * @param versionBumpType The version bump type
     * @param version The version string 
     */
    public async bumpVersion(versionBumpType: VersionBump, version: string | null = null): Promise<void> {
        if (VersionBump.dynamic === versionBumpType &&
            version === null) {
            throw new Error("Version number should be supplied");
        }

        const ethereumPm = await this._ethereumPmJsonControl.getEthereumPmJsonFile();

        if (versionBumpType !== VersionBump.dynamic) {
            const semanticVersion: ISemanticVersion = this.parseSemanticVersion(ethereumPm.version);

            if (this.isValidSemanticVersion(semanticVersion)) {
                if (!semanticVersion) {
                    return;
                }

                switch (versionBumpType) {
                    case VersionBump.major:
                        semanticVersion.major++;
                        break;
                    case VersionBump.minor:
                        semanticVersion.minor++;
                        break;
                    case VersionBump.patch:
                        semanticVersion.patch++;
                        break;
                }

                ethereumPm.version = this.buildSemanticVersionToString(semanticVersion);
            } else {
                throw new Error("Your version number in ethereum-pm.json is not a valid version number, must be `major.minor.patch` i.e. 1.0.0");
            }
        } else {
            const semanticVersion: ISemanticVersion = this.parseSemanticVersion(version as string);
            if (this.isValidSemanticVersion(semanticVersion)) {
                ethereumPm.version = this.buildSemanticVersionToString(semanticVersion);
            } else {
                throw new Error("You did not supply a valid version number, must be `major.minor.patch` i.e. 1.0.0")
            }
        }

        await this._ethereumPmJsonControl.saveEthereumPm(ethereumPm);
    }

    /**
     * Parses the semantic version interface 
     * @param version The unparsed version number
     */
    public parseSemanticVersion(version: string): ISemanticVersion {
        // for now expect a semantic full value
        // probably need to do some checks before release
        const versionSplit = version.split('.');
        const semanticVersion = {
            major: Number(versionSplit[0]),
            minor: Number(versionSplit[1]),
            patch: Number(versionSplit[2]),
        } as ISemanticVersion

        if (!this.isValidSemanticVersion(semanticVersion)) {
            throw new Error("The semantic version is invalid");
        }

        return semanticVersion;
    }

    /**
     * Builds the semantic version 
     * @param semanticVersion The semantic version interface 
     */
    public buildSemanticVersionToString(semanticVersion: ISemanticVersion): string {
        return `${semanticVersion.major}.${semanticVersion.minor}.${semanticVersion.patch}`;
    }

    /**
     * Checka if the semantic version is valid
     * @param semanticVersion The semnatic version 
     */
    public isValidSemanticVersion(semanticVersion: ISemanticVersion): boolean {
        return (!isNaN(semanticVersion.major) &&
            !isNaN(semanticVersion.minor) &&
            !isNaN(semanticVersion.patch))
    }

    /**
     * Compares 1 version with another
     * @param version The version 
     * @param isBiggerVersion The version which should be bigger 
     */
    public isBiggerThenVersion(version: ISemanticVersion, biggerVersion: ISemanticVersion): boolean {
        if (biggerVersion.major > version.major) return true;
        if (biggerVersion.major < version.major) return false;

        if (biggerVersion.minor > version.minor) return true;
        if (biggerVersion.minor < version.minor) return false;

        if (biggerVersion.patch > version.patch) return true;
        if (biggerVersion.patch < version.patch) return false;

        return false;
    }
}