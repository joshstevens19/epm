#!/usr/bin/env node

import * as program from "commander"
import { PackageDescriptionsConsts } from "./consts/packages-descriptions.consts";
import * as chalk from "chalk";
import { InitialiseControls } from "./common/initialise-controls";
import { IRegister } from "./interfaces/iregister";
import { IUpdateProfileDetailsRequest } from "./interfaces/api-requests/iupdate-profile-details.request";

// find TS library as we want the entire library to be in TS
const ProgressBar = require('progress');
const co = require('co');
const prompt = require('co-prompt');

// REDESIGN THE CLI ONCE DONE ALL THE LOGIC 

program
  .version("0.0.1")
  .description('Welcome to ethereum package manager...')
  .option('-p, --', '')
  .usage("epm [arguments] [options]")
  .parse(process.argv);

program
  .command('init')
  .description(PackageDescriptionsConsts.init)
  .action(() => {
    InitialiseControls.initControl.initialiseProject();
  });

program
  .command('ls')
  .description(PackageDescriptionsConsts.ls)
  .action(() => {
    InitialiseControls.lsControl.installedDependencies()
      .then(d => console.log(JSON.stringify(d)))
      .catch(err => console.error(err));
  });

program
  .command('install [packageName]')
  .alias('i')
  .description(PackageDescriptionsConsts.install)
  .action((packageName: string) => {
    if (packageName) {
      InitialiseControls.installControl.installPackage(packageName)
        .catch(err => {
          console.log(chalk.default.bold.redBright(err.message));
        });
    } else {
      InitialiseControls.installControl.installPackages()
        .catch(err => {
          console.log(chalk.default.bold.redBright(err.message));
        });
    }
  });

program
  .command('uninstall [packageName]')
  .alias('u')
  .description(PackageDescriptionsConsts.uninstall)
  .action((packageName: string) => {
    if (!packageName) {
      console.error("please supply a package name to uninstall")
    } else {
      InitialiseControls.uninstallControl.uninstallPackage(packageName)
        .catch(err => {
          console.log(chalk.default.bold.redBright(err.message));
        });
    }
  });

program
  .command('update [packageName]')
  .alias('up')
  .alias('upgrade')
  .description(PackageDescriptionsConsts.update)
  .action((packageName: string) => {
    if (!packageName) {
      console.error("please supply a package name to update")
    } else {
      InitialiseControls.updateControl.updatePackage(packageName)
        .catch(err => {
          console.log(chalk.default.bold.redBright(err.message));
        });
    }
  });

program
  .command('outdated')
  .description(PackageDescriptionsConsts.outdated)
  .action(() => {
    InitialiseControls.outdatedControl.checkForOutdatedPackages()
      .then(res => console.log(res))
      .catch(err => console.error(err));
  });

program
  .command('ping')
  .description(PackageDescriptionsConsts.ping)
  .action(() => {
    InitialiseControls.pingControl.alive()
      .then(result => {
        if (result) {
          console.log('server is alive')
        } else {
          console.error("no response from the server.. it could be down")
        }
      })
      .catch(err => console.error(err))
  });

program
  .command("login")
  .description(PackageDescriptionsConsts.login)
  .option('--username <username>', 'The username to authenticate')
  .option('--password <password>', 'The user\'s password')
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

program
  .command("register")
  .description(PackageDescriptionsConsts.register)
  .option('--username <username>', 'The username to sign in with')
  .option('--password <password>', 'The users password')
  .option('--firstName <firstName>', 'The users first name')
  .option('--lastName <lastName>', 'The users lastname')
  .option('--introduction <introudction>', 'The users introduction to show on the profile')
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
  .option('--firstName <firstName>', 'The users first name')
  .option('--lastName <lastName>', 'The users lastname')
  .option('--introduction <introudction>', 'The users introduction to show on the profile')
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
  .command('addUser <teamname> <username> <isadmin>')
  .alias('t')
  .description('Adds a new user to a team')
  .action(async (teamname, username, isadmin) => {
    try {
      await InitialiseControls.teamControl.addUser(teamname, username, isadmin)
      console.log("Added user to the team");
    } catch (error) {
      console.error(error);
    }
  });

program
  .command('addAdmin <packageName> <username>')
  .alias('t')
  .description('Adds a new user to a team')
  .action(async (packageName, username) => {
    try {
      await InitialiseControls.packageControl.addAdmin(packageName, username)
      console.log("Added admin user to the package");
    } catch (error) {
      console.error(error);
    }
  });

program
  .command('deprecate <packageName>')
  .description('Deprecates a package')
  .action(async(packageName) => {
    try {
      await InitialiseControls.deprecateControl.deprecatePackage(packageName)
      console.log("Successfully deprecated the package");
    } catch (error) {
      console.error(error);
    }
  });

program
  .command('undeprecate <packageName>')
  .description('Undeprecates a package')
  .action(async(packageName) => {
    try {
      await InitialiseControls.deprecateControl.undeprecatePackage(packageName);
      console.log("Successfully undeprecated the package")
    } catch(error) {
      console.error(error);
    }
  });

program
  .command("star <packageName>")
  .description("Stars a package")
  .action(async(packageName) => {
    try {
      await InitialiseControls.starControl.starPackage(packageName);
      console.log("Successfully starred the package")
    } catch(error) {
      console.error(error);
    }
  });

program
  .command("unstar <packageName>")
  .description("Unstars a package")
  .action(async(packageName) => {
    try {
      await InitialiseControls.starControl.unstarPackage(packageName);
      console.log("Successfully unstarred the package")
    } catch(error) {
      console.error(error);
    }
  });

program
  .command("stars")
  .description("Stars for a user")
  .action(async(packageName) => {
    try {
      const stars = await InitialiseControls.starControl.getAllStars();
      console.log(stars);
    } catch(error) {
      console.error(error);
    }
  });

// program
//   .command('users <teamName>')
//   .description('Gets all the users for a team')


// good example below:

// program
// .command('addContact <firstame> <lastname> <phone> <email>')
// .alias('a')
// .description('Add a contact')
// .action((firstname, lastname, phone, email) => {
//   addContact({firstname, lastname, phone, email});
// });

//   // .action(() => {
//   //   console.log(program.username);
//   //   co(function *() {
//   //     console.log(program.username);
//   //     var username = yield prompt('username: ');
//   //     var password = yield prompt.password('password: ');
//   //     console.log(password);
//   //     console.log(chalk.default.bold.cyan(username));

//   //     const barOpts = {
//   //       width: 20,
//   //       total: 1000,
//   //       clear: true
//   //     };

//   //     const bar = new ProgressBar('Authenticating [:bar] :percent :etas', barOpts);

//   //     // setInterval(() => bar.tick(10), 100);

//   //     // while(number < 100000000) {
//   //     //   bar.tick(number);
//   //     //   number++;
//   //     // }

//   // })
// })

program.parse(process.argv);
