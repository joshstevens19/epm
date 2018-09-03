#!/usr/bin/env node

// import * as ProcessBar from "process";
// import * as program from "commander";

import * as program from "commander"
import { PackageDescriptionsConsts } from "./consts/packages-descriptions.consts";
import * as chalk from "chalk";
import { InitialiseControls } from "./common/initialise-controls";
import { IRegister } from "./interfaces/iregister";

// find TS library as we want the entire library to be in TS
const ProgressBar = require('progress');
const co = require('co');
const prompt = require('co-prompt');

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

    if(username && password) {
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
        emailAddress: username,
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
    .action(() => {
      InitialiseControls.uploadControl.uploadPackage();
    });
  

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
