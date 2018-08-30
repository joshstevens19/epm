#!/usr/bin/env node

// import * as ProcessBar from "process";
// import * as program from "commander";

import * as program from "commander"
import { PackageDescriptionsConsts } from "./consts/packages-descriptions.consts";
import * as chalk from "chalk";
import { InitialiseControls } from "./common/initialise-controls";

// find TS library as we want the entire library to be in TS
const ProgressBar = require('progress');
const co = require('co');
const prompt = require('co-prompt');

const controls = new InitialiseControls();

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
    controls.initControl.initialiseProject();
  });

program
  .command('ls')
  .description(PackageDescriptionsConsts.ls)
  .action(() => {
    controls.lsControl.installedDependencies()
      .then(d => console.log(JSON.stringify(d)))
      .catch(err => console.error(err));
  });

program
  .command('install [packageName]')
  .alias('i')
  .description(PackageDescriptionsConsts.install)
  .action((packageName: string) => {
    if (packageName) {
      controls.installControl.installPackage(packageName)
        .catch(err => {
          console.log(chalk.default.bold.redBright(err.message));
        });
    } else {
      controls.installControl.installPackages()
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
      controls.uninstallControl.uninstallPackage(packageName)
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
      controls.updateControl.updatePackage(packageName)
        .catch(err => {
          console.log(chalk.default.bold.redBright(err.message));
        });
    }
  });

program
  .command('outdated')
  .description(PackageDescriptionsConsts.outdated)
  .action(() => {
    controls.outdatedControl.checkForOutdatedPackages()
      .then(res => console.log(res))
      .catch(err => console.error(err));
  });

program
  .command('ping')
  .description(PackageDescriptionsConsts.ping)
  .action(() => {
    controls.pingControl.alive()
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
  .option('--username <username>', 'The user to authenticate as')
  .option('--password <password>', 'The user\'s password')
  .action((dir, cmd) => {
    const username = dir.username;
    const password = dir.password;

    if(username || password) {
      controls.loginControl.authenticate(username, password)
                           .catch(err => console.log(err));
    } else {
      console.log("please supply and username or password")
    }
  })
  

program
  .command("audit")
  .description(PackageDescriptionsConsts.audit)
  .action(() => {

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

// program
//   .command('install <packageName> <packageVersion>')
//   .alias('i')
//   .description(PackageDescriptionsConsts.install)
//   .action((packageName: string, packageVersion: string) => {
//     console.log(packageName);
//     console.log(packageVersion);
//   });

// program
//   .command('addContact <firstame> <lastname> <phone> <email>')
//   .alias('a')
//   .description('Add a contact')
//   .action((firstname, lastname, phone, email) => {
//     addContact({firstname, lastname, phone, email});
//   });

// program
//   .command('getContact <name>')
//   .alias('r')
//   .description('Get contact')
//   .action(name => getContact(name));

program.parse(process.argv);
