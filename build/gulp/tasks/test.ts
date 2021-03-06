'use strict';

import {BaseGulpTask} from '../BaseGulpTask';
import {Utils} from '../utils';
import * as yargs from 'yargs';
import * as karma from 'karma';

/**
 * Runs all tests against the directives.
 * 
 * @class
 */
export class GulpTask extends BaseGulpTask {

  /**
   * @property  {string}  description   - Help description for the task.
   */
  public static description: string = 'Executes all tests against the directives';

  /**
   * @property  {string[]}  dependencies  - Array of all tasks that should be run before this one.
   */
  public static dependencies: string[] = ['transpile-ts'];

  /**
   * @property  {string[]}  aliases   - Different options to run the task.
   */
  public static aliases: string[] = ['t', 'T'];

  /**
   * @property  {Object}  options   - Any command line flags that can be passed to the task.
   */
  public static options: any = {
    'debug': 'Set karma log level to DEBUG',
    'specs': 'Output all tests being run',
    'verbose': 'Output all TypeScript files being built & set karma log level to INFO'
  };

  /**
   * @property  {ICommandLineArgs}  args  - Command line arguments;
   */
  private _args: ICommandLineArgs = yargs.argv;

  /** @constructor */
  constructor(done: IStringCallback) {
    super();
    Utils.log('Testing code with Karma');

    // create karma configuration
    let karmaConfig: karma.ConfigOptions = <karma.ConfigOptions>{
      configFile: '../../../config/karma.js',
      singleRun: true
    };

    // if in spec mode, change reporters from progress => spec
    if (this._args.specs) {
      karmaConfig.reporters = ['spec', 'coverage'];
    }

    // set log level accordingly
    if (this._args.debug) {
      karmaConfig.logLevel = 'DEBUG';
    } else if (this._args.verbose) {
      karmaConfig.logLevel = 'INFO';
    }

    // create karma server
    let karmaServer: karma.Server = new karma.Server(karmaConfig, (karmaResult: number) => {
      Utils.log('Karma test run completed');

      // result = 1 means karma exited with error
      if (karmaResult === 1) {
        done('Karma returned error code ' + karmaResult + ' because at least one test failed.'
          + '\nThe following stack trace is expected when tests fail.');
      } else {
        done();
      }
    });
    karmaServer.start();
  }

}
