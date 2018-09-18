import { 
        Audit, Build, EthereumPmJson, Init, LS, Install, Login, Logout, Outdated, 
        Owner, Ping, Profile, Repo, Search, Star, Uninstall, Update, Version, Package, 
        EthereumModules, LocalEpmFiles, Publish, Register, EpmIgnore, Team, Deprecate, Token, Unpublish 
       } from "../controls";

import { InitialiseApis } from "./initialise-apis";
import { Jwt } from "../controls/jwt";

export class InitialiseControls {
    private static _auditControl: Audit;
    private static _buildControl: Build;
    private static _deprecateControl: Deprecate;
    private static _epmIgnoreControl: EpmIgnore;
    private static _ethereumPmJson: EthereumPmJson;
    private static _ethereumModules: EthereumModules;
    private static _initControl: Init;
    private static _installControl: Install;
    private static _jwtControl: Jwt;
    private static _localEpmFiles: LocalEpmFiles;
    private static _loginControl: Login;
    private static _logoutControl: Logout;
    private static _lsControl: LS;
    private static _outdatedControl: Outdated;
    private static _ownerControl: Owner;
    private static _packageControl: Package;
    private static _pingControl: Ping;
    private static _profileControl: Profile;
    private static _registerControl: Register;
    private static _repoControl: Repo;
    private static _searchControl: Search;
    private static _starControl: Star;
    private static _teamControl: Team;
    private static _tokenControl: Token;
    private static _uninstallControl: Uninstall;
    private static _unpublishControl: Unpublish;
    private static _updateControl: Update;
    private static _publishControl: Publish;
    private static _versionControl: Version;

    constructor() { }

    public static get auditControl(): Audit {
        if (InitialiseControls._auditControl) {
            return InitialiseControls._auditControl;
        }

        return InitialiseControls._auditControl = new Audit();
    }

    public static get buildControl(): Build {
        if (InitialiseControls._buildControl) {
            return InitialiseControls._buildControl;
        }

        return InitialiseControls._buildControl = new Build();
    }

    public static get deprecateControl(): Deprecate {
        if (InitialiseControls._deprecateControl) {
            return InitialiseControls._deprecateControl;
        }

        return InitialiseControls._deprecateControl = new Deprecate(InitialiseApis.packageApi);
    }

    public static get epmIgnoreControl(): EpmIgnore {
        if (InitialiseControls._epmIgnoreControl) {
            return InitialiseControls._epmIgnoreControl;
        }

        return InitialiseControls._epmIgnoreControl = new EpmIgnore();
    }

    public static get ethereumPmJsonControl(): EthereumPmJson {
        if (InitialiseControls._ethereumPmJson) {
            return InitialiseControls._ethereumPmJson;
        }

        return InitialiseControls._ethereumPmJson = new EthereumPmJson();
    }

    public static get ethereumModulesControl(): EthereumModules {
        if (InitialiseControls._ethereumModules) {
            return InitialiseControls._ethereumModules;
        }

        return InitialiseControls._ethereumModules = new EthereumModules(this.ethereumPmJsonControl);
    }

    public static get initControl(): Init {
        if (InitialiseControls._initControl) {
            return InitialiseControls._initControl;
        }

        return InitialiseControls._initControl = new Init(this.ethereumPmJsonControl);
    }

    public static get installControl(): Install {
        if (InitialiseControls._installControl) {
            return InitialiseControls._installControl;
        }

        return InitialiseControls._installControl = new Install(this.packageControl,
                                                                this.initControl,
                                                                this.ethereumPmJsonControl,
                                                                this.ethereumModulesControl,
                                                                this.localEpmFilesControl,
                                                            );
    }

    public static get jwtControl(): Jwt {
        if (InitialiseControls._jwtControl) {
            return InitialiseControls._jwtControl;
        }

        return InitialiseControls._jwtControl = new Jwt(this.localEpmFilesControl);
    }

    public static get localEpmFilesControl(): LocalEpmFiles {
        if (InitialiseControls._localEpmFiles) {
            return InitialiseControls._localEpmFiles;
        }

        return InitialiseControls._localEpmFiles = new LocalEpmFiles();
    }

    public static get loginControl(): Login {
        if (InitialiseControls._loginControl) {
            return InitialiseControls._loginControl;
        }

        return InitialiseControls._loginControl = new Login(InitialiseApis.authenticationApi, this.localEpmFilesControl);
    }

    public static get logoutControl(): Logout {
        if (InitialiseControls._logoutControl) {
            return InitialiseControls._logoutControl;
        }

        return InitialiseControls._logoutControl = new Logout(InitialiseApis.authenticationApi);
    }

    public static get outdatedControl(): Outdated {
        if (InitialiseControls._outdatedControl) {
            return InitialiseControls._outdatedControl;
        }

        return InitialiseControls._outdatedControl = new Outdated(this.ethereumPmJsonControl, this.packageControl);
    }

    public static get ownerControl(): Owner {
        if (InitialiseControls._ownerControl) {
            return InitialiseControls._ownerControl;
        }

        return InitialiseControls._ownerControl = new Owner();
    }

    public static get packageControl(): Package {
        if (InitialiseControls._packageControl) {
            return InitialiseControls._packageControl;
        }

        return InitialiseControls._packageControl = new Package(InitialiseApis.packageApi, InitialiseApis.versionApi);
    }

    public static get pingControl(): Ping {
        if (InitialiseControls._pingControl) {
            return InitialiseControls._pingControl;
        }

        return InitialiseControls._pingControl = new Ping(InitialiseApis.pingApi);
    }

    public static get profileControl(): Profile {
        if (InitialiseControls._profileControl) {
            return InitialiseControls._profileControl;
        }

        return InitialiseControls._profileControl = new Profile(InitialiseApis.profileApi, this.localEpmFilesControl);
    }

    public static get registerControl(): Register {
        if (InitialiseControls._registerControl) {
            return InitialiseControls._registerControl;
        }

        return InitialiseControls._registerControl = new Register(InitialiseApis.authenticationApi, this.localEpmFilesControl);
    }

    public static get repoControl(): Repo {
        if (InitialiseControls._repoControl) {
            return InitialiseControls._repoControl;
        }

        return InitialiseControls._repoControl = new Repo();
    }

    public static get searchControl(): Search {
        if (InitialiseControls._searchControl) {
            return InitialiseControls._searchControl;
        }

        return InitialiseControls._searchControl = new Search();
    }

    public static get starControl(): Star {
        if (InitialiseControls._starControl) {
            return InitialiseControls._starControl;
        }

        return InitialiseControls._starControl = new Star(InitialiseApis.starApi);
    }

    public static get teamControl(): Team {
        if (InitialiseControls._teamControl) {
            return InitialiseControls._teamControl;
        }

        return InitialiseControls._teamControl = new Team(InitialiseApis.teamApi);
    }

    public static get tokenControl(): Token {
        if (InitialiseControls._tokenControl) {
            return InitialiseControls._tokenControl;
        }

        return InitialiseControls._tokenControl = new Token(InitialiseControls.jwtControl);
    }

    public static get uninstallControl(): Uninstall {
        if (InitialiseControls._uninstallControl) {
            return InitialiseControls._uninstallControl;
        }

        return InitialiseControls._uninstallControl = new Uninstall(this.ethereumModulesControl, this.ethereumPmJsonControl);
    }
    
    public static get unpublishControl(): Unpublish {
        if (InitialiseControls._unpublishControl) {
            return InitialiseControls._unpublishControl;
        }

        return InitialiseControls._unpublishControl = new Unpublish(InitialiseApis.packageApi);
    }

    public static get updateControl(): Update {
        if (InitialiseControls._updateControl) {
            return InitialiseControls._updateControl;
        }

        return InitialiseControls._updateControl = new Update(this.packageControl,
                                                              this.installControl,
                                                              this.ethereumPmJsonControl
                                                            );
    }

    public static get publishControl(): Publish {
        if (InitialiseControls._publishControl) {
            return InitialiseControls._publishControl;
        }

        return InitialiseControls._publishControl = new Publish(this.ethereumPmJsonControl, 
                                                              this.epmIgnoreControl,
                                                              InitialiseApis.packageApi);
    }

    public static get versionControl(): Version {
        if (InitialiseControls._versionControl) {
            return InitialiseControls._versionControl;
        }

        return InitialiseControls._versionControl = new Version(this.ethereumPmJsonControl);
    }

    public static get lsControl(): LS {
        if (InitialiseControls._lsControl) {
            return InitialiseControls._lsControl;
        } 

        return InitialiseControls._lsControl = new LS(this.ethereumPmJsonControl, this.ethereumModulesControl);
    }
}