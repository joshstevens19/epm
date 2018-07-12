#!/usr/bin/env node

// import * as ProcessBar from "process";
// import * as program from "commander";


const program = require("commander");
import { Init, LS, Install, Audit, Build, Login, Logout, Outdated, Owner, Ping, Profile, Repo, Search, Star, Uninstall, Upgrade, Upload, Version, WhoAmI } from "./controls";
import { PackageDescriptionsConsts } from "./consts/packages-descriptions.consts";
import * as chalk from "chalk";
import { InitialiseControls } from "./common/initialiseControls";
const ProgressBar = require('progress');
const co = require('co');
const prompt = require('co-prompt');

const controls = new InitialiseControls();

program
  .version("0.0.1")
  .description('Welcome to ethereum package manager...')
  .option('-p, --', '')
  .usage("ethereumpm [options] [arguments]")
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
    controls.lsControl.dependencies()
    .then(res => console.log(res))
    .catch(err => console.error(err));
  });

program 
  .command('install <packageName>')
  .option('-v, --version', '<packageVersion>')
  .alias('i')
  .description(PackageDescriptionsConsts.install)
  .action((packageName: string, packageVersion: string) => {
    controls.installControl.installPackage("test", "1.0.0")
                           .catch(err => console.log(err));

  });

program
  .command("login")
  .description(PackageDescriptionsConsts.login)
  .option('-u, --username <username>', 'The user to authenticate as')
  .option('-p, --password <password>', 'The user\'s password')
  .action(() => {
      console.log('user: %s pass: %s file: %s',
      program.username, program.password);
  })
  .parse(process.argv);

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
