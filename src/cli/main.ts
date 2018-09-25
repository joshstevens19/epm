#!/usr/bin/env node
import * as program from "commander"
import { PackageDescriptionsConsts } from "../consts/packages-descriptions.consts";
import * as chalkImport from "chalk";
const chalk = chalkImport.default;
import { InitialiseControls } from "../common/initialise-controls";
import { IRegister } from "../interfaces/iregister";
import { IUpdateProfileDetailsRequest } from "../interfaces/api-requests/iupdate-profile-details.request";
import { VersionBump } from "../enums/version-bump";
import { Usage } from "./usage";
import { AccessTypes, CommandTypes, HookTypes } from "./enums";
import { LogHandler } from "./log-handler";

// find TS library as we want the entire library to be in TS
// use later on
import ProgressBar = require("progress");
const co = require("co");
const prompt = require("co-prompt");
const asciiTable = require("ascii-table");

// var table = new asciiTable("A Title")
// table
//   .setHeading("", "Test", "Test")
//   .addRow(1, "Test", 53)
//   .addRow(2, "Test", 33)
//   .addRow(3, "Test", 83)

// console.log(table.toString())

program
  .version("0.0.1")
  .description("These are command EPM commands: .. NEED TO NAME ALL THE COMMANDS LAST")
  .usage("epm [--version] [--help] <command> [<args>]")
  .parse(process.argv);

program
  .command("access <private|public|grant|revoke|ls> [$1] [$2] [$3]")
  .usage("command - used to set access levels")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.access))
  .action(async (accessLevel: string, $1: string, $2: string, $3: string) => {
    accessLevel = accessLevel.toLowerCase();

    if (accessLevel !== AccessTypes.private &&
      accessLevel !== AccessTypes.public &&
      accessLevel !== AccessTypes.grant &&
      accessLevel !== AccessTypes.ls &&
      accessLevel !== AccessTypes.revoke) {
      return LogHandler.logCommandError("access commands are only accessible for scoped packages", CommandTypes.access)
    }

    switch (accessLevel) {
      case AccessTypes.private:
        // to do control
        break;
      case AccessTypes.public:
        // to do control
        break;
      case AccessTypes.grant:
        const grantMissingArguments = [];

        if (!$1) {
          grantMissingArguments.push("<read-only|read-write>");
        }

        if (!$2) {
          grantMissingArguments.push("<org:team>");
        }

        if (grantMissingArguments.length > 0) {
          LogHandler.logMissingRequiredArguments(grantMissingArguments);
          return LogHandler.logUsages(CommandTypes.access, AccessTypes.grant);
        }

        // validation complete call controls

        break;
      case AccessTypes.ls:
        // write control
        break;
      case AccessTypes.revoke:

        if (!$1) {
          LogHandler.logMissingRequiredArguments(["<org:team>"]);
          return LogHandler.logUsages(CommandTypes.access, AccessTypes.revoke);
        }

        // validation complete call controls 

        break;
    }
  });

program
  .command("audit [fix]")
  .usage("command - use perform audits on packages")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.audit))
  .action(async (fix) => {
    if (fix && fix !== "fix") {
      LogHandler.logError(`erorr: ${fix} is not a argument did you mean fix ?`, true);
      return LogHandler.logUsages(CommandTypes.audit);
    }

    // do control logix 
  });

program
  .command("bin")
  .option("-g, --global", "Will print the global folder")
  .usage("command - prints the folder where epm will install executables")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.bin))
  .action(async (dir) => {
    if (typeof (dir) !== "object") {
      LogHandler.logGenericInvalidCommandError(CommandTypes.bin, true);
      return LogHandler.logUsages(CommandTypes.bin);
    }

    const global = dir.global

    // do control logix 
  });

program
  .command("cache clean")
  .usage("command - removes all the cached packages")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.cache))
  .action(async (clean) => {
    if (!clean || clean !== "clean") {
      LogHandler.logError(`erorr: ${clean} is not a argument did you mean clean ?`, true);
      return LogHandler.logUsages(CommandTypes.cache);
    }

    // do control logix 
  });

// deprecated CLI
program
  .command("deprecate <package|package@version> <message>")
  .usage("command - deprecate a package")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.deprecate))
  .action(async (_package, message) => {

    // change the logic to pass in a message

    try {
      await InitialiseControls.deprecateControl.deprecatePackage(_package)
      console.log("Successfully deprecated the package");
    } catch (error) {
      console.error(error);
    }
  });

program
  .command("doctor")
  .usage("command - check the health of epm")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.doctor))
  .action(async (dir) => {
    if (typeof (dir) !== "object") {
      LogHandler.logGenericInvalidCommandError(CommandTypes.doctor, true);
      return LogHandler.logUsages(CommandTypes.doctor);
    }

    const result = await InitialiseControls.doctorControl.checkEverythingIsAvailable();
    console.log(result);
  });

program
  .command("doctor")
  .usage("command - check the health of epm")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.doctor))
  .action(async (dir) => {
    if (typeof (dir) !== "object") {
      LogHandler.logGenericInvalidCommandError(CommandTypes.doctor, true);
      return LogHandler.logUsages(CommandTypes.doctor);
    }

    const result = await InitialiseControls.doctorControl.checkEverythingIsAvailable();
    console.log(result);
  });

program
  .command("document [package]")
  .usage("command - load document up for a project")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.document))
  .action(async (_package) => {
    // write control logic 
  });

program
  .command("hook <ls|add|update|rm> [$1] [$2] [$3]")
  .usage("command - hook events on packages")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.hook))
  .action(async (hookAction, $1, $2, $3) => {
    if (hookAction !== HookTypes.add &&
      hookAction !== HookTypes.ls &&
      hookAction !== HookTypes.rm &&
      hookAction !== HookTypes.update) {
      return LogHandler.logCommandError("hook command needs a hook action", CommandTypes.hook);
    }

    switch (hookAction) {
      case HookTypes.add:
        const packageName: string | undefined = $1;

        // write control logic

        break;
      case HookTypes.ls:

        const hookListMissingArguments = [];

        if (!$1) {
          hookListMissingArguments.push("<url>");
        }

        if (!$2) {
          hookListMissingArguments.push("<secret>");
        }

        if (hookListMissingArguments.length > 0) {
          LogHandler.logMissingRequiredArguments(hookListMissingArguments);
          return LogHandler.logUsages(CommandTypes.hook, HookTypes.ls);
        }

        // write logic for control

        break;
      case HookTypes.rm:
        if (!$1) {
          LogHandler.logMissingRequiredArguments(["<id>"]);
          return LogHandler.logUsages(CommandTypes.hook, HookTypes.rm);
        }

        // write logic for control

        break;
      case HookTypes.update:
        const hookUpdateMissingArguments = [];

        if (!$1) {
          hookUpdateMissingArguments.push("<id>");
        }

        if (!$2) {
          hookUpdateMissingArguments.push("<url>");
        }

        if (hookUpdateMissingArguments.length > 0) {
          LogHandler.logMissingRequiredArguments(hookUpdateMissingArguments);
          return LogHandler.logUsages(CommandTypes.hook, HookTypes.update);
        }

        break;
    }
  });


program
  .command("ignore")
  .option("-l, --list", "Print out epm list")
  .usage("command - generate and read epm ignore file")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.ignore))
  .action(async (dir) => {
    if (typeof (dir) !== "object") {
      LogHandler.logGenericInvalidCommandError(CommandTypes.ignore, true);
      return LogHandler.logUsages(CommandTypes.ignore);
    }

    // write control logic 
  });

program
  .command("init [team]")
  .option("-c, --complete", "Auto completes the initialise, populates with default values")
  .usage("command - initialise a new epm project")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.init))
  .action((team, dir) => {
    console.log(team);
    console.log(dir);

    if (typeof (dir) !== "object") {
      LogHandler.logGenericInvalidCommandError(CommandTypes.init, true);
      return LogHandler.logUsages(CommandTypes.init);
    }

    const autoComplete = dir.complete;

    // complete questions etc

    InitialiseControls.initControl.initialiseProject();
  });

program
  .command("install [package|package@version]")
  .usage("command - installs packages")
  .description(Usage.getUsageForCommandTypeUsage(CommandTypes.install))
  .action(async (_package: string) => {

    // finish logic with package@version
    
    if (_package) {
      try {
        await InitialiseControls.installControl.installPackage(_package)
      } catch (err) {
        LogHandler.log(chalk.bold.redBright(err.message));
      }
    } else {
      try {
        await InitialiseControls.installControl.installPackages()
      } catch (err) {
        LogHandler.log(chalk.bold.redBright(err.message));
      }
    }
  });


/****** MAKE THIS USE CO-PROMPT **********/
program
  .command("login")
  .description(PackageDescriptionsConsts.login)
  .option("--username <username>", "The username to authenticate")
  .option("--password <password>", "The user\"s password")
  .action((dir, cmd) => {
    const username = dir.username;
    const password = dir.password;

    if (username && password) {
      InitialiseControls.loginControl.authenticate(username, password)
        .catch(err => console.log(err));
    } else {
      console.log("please supply and username or password")
    }
  });
/***************************************************/

program
  .command("ls")
  .description(PackageDescriptionsConsts.ls)
  .action(() => {
    InitialiseControls.lsControl.installedDependencies()
      .then(d => console.log(JSON.stringify(d)))
      .catch(err => console.error(err));
  });

program
  .command("uninstall [packageName]")
  .alias("u")
  .description(PackageDescriptionsConsts.uninstall)
  .action((packageName: string) => {
    if (!packageName) {
      console.error("please supply a package name to uninstall")
    } else {
      InitialiseControls.uninstallControl.uninstallPackage(packageName)
        .catch(err => {
          console.log(chalk.bold.redBright(err.message));
        });
    }
  });

program
  .command("update [packageName]")
  .alias("up")
  .alias("upgrade")
  .description(PackageDescriptionsConsts.update)
  .action((packageName: string) => {
    if (!packageName) {
      console.error("please supply a package name to update")
    } else {
      InitialiseControls.updateControl.updatePackage(packageName)
        .catch(err => {
          console.log(chalk.bold.redBright(err.message));
        });
    }
  });

program
  .command("outdated")
  .description(PackageDescriptionsConsts.outdated)
  .action(() => {
    InitialiseControls.outdatedControl.checkForOutdatedPackages()
      .then(res => console.log(res))
      .catch(err => console.error(err));
  });

program
  .command("ping")
  .description(PackageDescriptionsConsts.ping)
  .action(() => {
    InitialiseControls.pingControl.alive()
      .then(result => {
        if (result) {
          console.log("server is alive")
        } else {
          console.error("no response from the server.. it could be down")
        }
      })
      .catch(err => console.error(err))
  });



program
  .command("register")
  .description(PackageDescriptionsConsts.register)
  .option("--username <username>", "The username to sign in with")
  .option("--password <password>", "The users password")
  .option("--firstName <firstName>", "The users first name")
  .option("--lastName <lastName>", "The users lastname")
  .option("--introduction <introudction>", "The users introduction to show on the profile")
  .action((dir, cmd) => {
    const username = dir.username;
    const password = dir.password;
    const firstName = dir.firstName;
    const lastName = dir.lastName;
    const introduction = dir.introduction || null;

    if (username && password && firstName && lastName) {
      const user: IRegister = {
        username,
        password,
        firstName,
        lastName,
        introduction
      };

      InitialiseControls.registerControl.createUser(user)
        .then(() => console.log("User registered"))
        .catch((error: any) => console.error(error))

    } else {
      console.log("Please supply a username, password, firstname and lastname");
    }

  })

program
  .command("logout")
  .description(PackageDescriptionsConsts.logout)
  .action(() => {
    InitialiseControls.logoutControl.unauthenticate();
  });

program
  .command("upload")
  .description(PackageDescriptionsConsts.upload)
  .action(async () => {
    await InitialiseControls.publishControl.publishPackage();
  });

program
  .command("profile")
  .option("--firstName <firstName>", "The users first name")
  .option("--lastName <lastName>", "The users lastname")
  .option("--introduction <introudction>", "The users introduction to show on the profile")
  .description(PackageDescriptionsConsts.profile)
  .action(async (dir, cmd) => {

    const firstName: string = dir.firstName || null;
    const lastName: string = dir.lastName || null;
    const introduction: string = dir.introduction || null;

    if (!firstName && !lastName && !introduction) {
      const profile = await InitialiseControls.profileControl.details()
      console.log(profile);
    } else {
      const newProfileDetails: IUpdateProfileDetailsRequest = {
        firstName,
        lastName,
        introduction
      }

      await InitialiseControls.profileControl.updateDetails(newProfileDetails);
    }
  })

program
  .command("whoami")
  .description(PackageDescriptionsConsts.profile)
  .action(async () => {
    const profile = await InitialiseControls.profileControl.details()
    console.log(profile);
  })

program
  .command("createTeam <teamname> <isprivate>")
  .description("Create a new team")
  .action(async (teamname, isprivate) => {
    try {
      await InitialiseControls.teamControl.createTeam(teamname, isprivate)
      console.log("Created team");
    } catch (error) {
      console.error(error);
    }
  })

program
  .command("addUser <teamname> <username> <isadmin>")
  .alias("t")
  .description("Adds a new user to a team")
  .action(async (teamname, username, isadmin) => {
    try {
      await InitialiseControls.teamControl.addUser(teamname, username, isadmin)
      console.log("Added user to the team");
    } catch (error) {
      console.error(error);
    }
  });

program
  .command("addAdmin <packageName> <username>")
  .alias("t")
  .description("Adds a new user to a team")
  .action(async (packageName, username) => {
    try {
      await InitialiseControls.ownerControl.addAdmin(packageName, username)
      console.log("Added admin user to the package");
    } catch (error) {
      console.error(error);
    }
  });



program
  .command("undeprecate <packageName>")
  .description("Undeprecates a package")
  .action(async (packageName) => {
    try {
      await InitialiseControls.deprecateControl.undeprecatePackage(packageName);
      console.log("Successfully undeprecated the package")
    } catch (error) {
      console.error(error);
    }
  });

program
  .command("star <packageName>")
  .description("Stars a package")
  .action(async (packageName) => {
    try {
      await InitialiseControls.starControl.starPackage(packageName);
      console.log("Successfully starred the package")
    } catch (error) {
      console.error(error);
    }
  });

program
  .command("unstar <packageName>")
  .description("Unstars a package")
  .action(async (packageName) => {
    try {
      await InitialiseControls.starControl.unstarPackage(packageName);
      console.log("Successfully unstarred the package")
    } catch (error) {
      console.error(error);
    }
  });

program
  .command("stars")
  .description("Stars for a user")
  .action(async (packageName) => {
    try {
      const stars = await InitialiseControls.starControl.getAllStars();
      console.log(stars);
    } catch (error) {
      console.error(error);
    }
  });

program
  .command("version <versionBump>")
  .description(PackageDescriptionsConsts.version)
  .action(async (versionBump) => {
    let versionBumpType = VersionBump.dynamic;
    switch (versionBump) {
      case VersionBump.major:
        versionBumpType = VersionBump.major;
        break;
      case VersionBump.minor:
        versionBumpType = VersionBump.minor;
        break;
      case VersionBump.patch:
        versionBumpType = VersionBump.patch;
        break;
    }

    try {
      if (versionBumpType == VersionBump.dynamic) {
        await InitialiseControls.versionControl.bumpVersion(versionBumpType, versionBump);
      } else {
        await InitialiseControls.versionControl.bumpVersion(versionBumpType);
      }
      console.log("Successfully upgraded project version")
    } catch (error) {
      console.error(error);
    }
  });

program
  .command("token")
  .action(async () => {
    const jwtToken = await InitialiseControls.tokenControl.getCurrentJwtToken();
    console.log(jwtToken);

    // split this up when i design the cli 
    const unpackJwt = await InitialiseControls.tokenControl.getCurrentDecodedJwt();
    console.log(unpackJwt);

    // more to split up
    const expiryDate = await InitialiseControls.tokenControl.getCurrentJwtTokenExpiryDate();
    console.log(expiryDate);
  });

// program
//   .command("users <teamName>")
//   .description("Gets all the users for a team")


// good example below:

// program
// .command("addContact <firstame> <lastname> <phone> <email>")
// .alias("a")
// .description("Add a contact")
// .action((firstname, lastname, phone, email) => {
//   addContact({firstname, lastname, phone, email});
// });

//   // .action(() => {
//   //   console.log(program.username);
//   //   co(function *() {
//   //     console.log(program.username);
//   //     var username = yield prompt("username: ");
//   //     var password = yield prompt.password("password: ");
//   //     console.log(password);
//   //     console.log(chalk.bold.cyan(username));

//   //     const barOpts = {
//   //       width: 20,
//   //       total: 1000,
//   //       clear: true
//   //     };

//   //     const bar = new ProgressBar("Authenticating [:bar] :percent :etas", barOpts);

//   //     // setInterval(() => bar.tick(10), 100);

//   //     // while(number < 100000000) {
//   //     //   bar.tick(number);
//   //     //   number++;
//   //     // }

//   // })
// })

program.parse(process.argv);
