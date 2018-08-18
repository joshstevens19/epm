import { 
        Audit, Build, EthereumPmJson, Init, LS, Install, Login, Logout, Outdated, 
        Owner, Ping, Profile, Repo, Search, Star, Uninstall, Upgrade, Version, 
        WhoAmI, Core, Package, EthereumModules 
       } from "../controls";

export class InitialiseControls {
    private static _auditControl: Audit;
    private static _buildControl: Build;
    private static _coreControl: Core;
    private static _ethereumPmJson: EthereumPmJson;
    private static _ethereumModules: EthereumModules;
    private static _initControl: Init;
    private static _installControl: Install;
    private static _loginControl: Login;
    private static _logoutControl: Logout;
    private static _lsControl: LS;
    private static _outdatedControl: Outdated;
    private static _ownerControl: Owner;
    private static _packageControl: Package;
    private static _pingControl: Ping;
    private static _profileControl: Profile;
    private static _repoControl: Repo;
    private static _searchControl: Search;
    private static _starControl: Star;
    private static _uninstallControl: Uninstall;
    private static _upgradeControl: Upgrade;
    private static _versionControl: Version;
    private static _whoAmiIControl: WhoAmI;

    constructor() { }

    public get auditControl(): Audit {
        if (InitialiseControls._auditControl) {
            return InitialiseControls._auditControl;
        }

        return InitialiseControls._auditControl = new Audit();
    }

    public get buildControl(): Build {
        if (InitialiseControls._buildControl) {
            return InitialiseControls._buildControl;
        }

        return InitialiseControls._buildControl = new Build();
    }

    public get coreControl(): Core {
        if (InitialiseControls._coreControl) {
            return InitialiseControls._coreControl;
        }
        
        return InitialiseControls._coreControl = new Core();
    }

    public get ethereumPmJson(): EthereumPmJson {
        if (InitialiseControls._ethereumPmJson) {
            return InitialiseControls._ethereumPmJson;
        }

        return InitialiseControls._ethereumPmJson = new EthereumPmJson();
    }

    public get ethereumModules(): EthereumModules {
        if (InitialiseControls._ethereumModules) {
            return InitialiseControls._ethereumModules;
        }

        return InitialiseControls._ethereumModules = new EthereumModules(this.ethereumPmJson);
    }

    public get initControl(): Init {
        if (InitialiseControls._initControl) {
            return InitialiseControls._initControl;
        }

        return InitialiseControls._initControl = new Init(this.ethereumPmJson);
    }

    public get installControl(): Install {
        if (InitialiseControls._installControl) {
            return InitialiseControls._installControl;
        }

        return InitialiseControls._installControl = new Install(this.packageControl,
                                                                this.initControl,
                                                                this.ethereumPmJson,
                                                                this.ethereumModules
                                                            );
    }

    public get loginControl(): Login {
        if (InitialiseControls._loginControl) {
            return InitialiseControls._loginControl;
        }

        return InitialiseControls._loginControl = new Login();
    }

    public get logoutControl(): Logout {
        if (InitialiseControls._logoutControl) {
            return InitialiseControls._logoutControl;
        }

        return InitialiseControls._logoutControl = new Logout();
    }

    public get outdatedControl(): Outdated {
        if (InitialiseControls._outdatedControl) {
            return InitialiseControls._outdatedControl;
        }

        return InitialiseControls._outdatedControl = new Outdated();
    }

    public get ownerControl(): Owner {
        if (InitialiseControls._ownerControl) {
            return InitialiseControls._ownerControl;
        }

        return InitialiseControls._ownerControl = new Owner();
    }

    public get packageControl(): Package {
        if (InitialiseControls._packageControl) {
            return InitialiseControls._packageControl;
        }

        return InitialiseControls._packageControl = new Package();
    }

    public get pingControl(): Ping {
        if (InitialiseControls._pingControl) {
            return InitialiseControls._pingControl;
        }

        return InitialiseControls._pingControl = new Ping();
    }

    public get profileControl(): Profile {
        if (InitialiseControls._profileControl) {
            return InitialiseControls._profileControl;
        }

        return InitialiseControls._profileControl = new Profile();
    }

    public get repoControl(): Repo {
        if (InitialiseControls._repoControl) {
            return InitialiseControls._repoControl;
        }

        return InitialiseControls._repoControl = new Repo();
    }

    public get searchControl(): Search {
        if (InitialiseControls._searchControl) {
            return InitialiseControls._searchControl;
        }

        return InitialiseControls._searchControl = new Search();
    }

    public get starControl(): Star {
        if (InitialiseControls._starControl) {
            return InitialiseControls._starControl;
        }

        return InitialiseControls._starControl = new Star();
    }

    public get uninstallControl(): Uninstall {
        if (InitialiseControls._uninstallControl) {
            return InitialiseControls._uninstallControl;
        }

        return InitialiseControls._uninstallControl = new Uninstall(this.ethereumModules, this.ethereumPmJson);
    }

    public get upgradeControl(): Upgrade {
        if (InitialiseControls._upgradeControl) {
            return InitialiseControls._upgradeControl;
        }

        return InitialiseControls._upgradeControl = new Upgrade();
    }

    public get versionControl(): Version {
        if (InitialiseControls._versionControl) {
            return InitialiseControls._versionControl;
        }

        return InitialiseControls._versionControl = new Version();
    }

    public get whoAmIControl(): WhoAmI {
        if (InitialiseControls._whoAmiIControl) {
            return InitialiseControls._whoAmiIControl;
        }

        return InitialiseControls._whoAmiIControl = new WhoAmI();
    }

    public get lsControl(): LS {
        if (InitialiseControls._lsControl) {
            return InitialiseControls._lsControl;
        } 

        return InitialiseControls._lsControl = new LS();
    }
}