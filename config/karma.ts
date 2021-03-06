'use strict';

import * as karma from 'karma';
import * as webpack from 'webpack';
import * as webpackConfig from './webpack';

/**
 * Karma configuration.
 * 
 * @function
 * @public
 * @see {link http://karma-runner.github.io/0.13/config/configuration-file.html}
 * 
 */
module.exports = (config: karma.Config) => {
  // load webpack config settings
  // note: at present the webpack.d.ts typedef is outdated at 1.12.2 when webpack
  //    is at 1.12.9 & includes support for postLoaders on a module... can't qualify
  //    the typedef for the config because it breaks TypeScript compilation
  //    > hopefully this can get updated later... see this logged issue for info:
  //    https://github.com/DefinitelyTyped/DefinitelyTyped/issues/7497
  let webpackSettings: any = new webpackConfig.WebPackConfig();
  webpackSettings.entry = {};
  webpackSettings.devtool = 'inline-source-map';
  // use istanbul-instrumenter-loader which deals with webpack-added wrapper code
  //  that we can't test for
  webpackSettings.module.postLoaders = [{
    exclude: /(node_modules|.spec.js)/,
    loader: 'istanbul-instrumenter',
    test: /\.js$/
  }];

  // create karma config
  let karmaConfig: IKarmaConfig = <IKarmaConfig>{
    autoWatch: true,
    basePath: __dirname + '/..',
    browsers: ['PhantomJS'],
    colors: true,
    coverageReporter: {
      dir: 'coverage/',
      type: 'lcov'
    },
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'src/core/*.js',
      'src/components/*/*.js'
    ],
    frameworks: ['jasmine-jquery', 'jasmine'],
    logLevel: config.LOG_WARN,
    plugins: ['karma-*'],
    port: 5793,
    preprocessors: {
      'src/**/*.js': ['webpack', 'sourcemap']
    },
    reporters: ['progress', 'coverage'],
    singleRun: false,
    webpack: webpackSettings,
    webpackMiddleware: {
      noInfo: true
    }
  };

  // set karma configuration
  config.set(karmaConfig);
};

/**
 * Interface to define Karma coverage reporter configuration
 * 
 * @typedef karmaCoverageReporterConfigurationOptions
 * @property {string} type - Specify a reporter type (html | lcov | lcovonly | text | text-summary | cobertura | teamcity | json)
 * @property {string} dir - Output directory for coverage reports. If relative, resolved against karma.Configurationoptions.basePath.
 * @see {link https://github.com/karma-runner/karma-coverage/blob/master/docs/configuration.md}
 */
interface IKarmaCoverageReporterConfigurationOptions {
  dir?: string;
  type?: string;
}

/**
 * Interface to extend the default Karma configuration options to add
 * stuff needed for code coverage & webpack.
 * 
 * @typedef karmaConfig
 * @augments karma.Config
 * @property {IKarmaCoverageReporterConfigurationOptions} coverageReporter - Settings for karma-coverage.
 * @property {webpack.Configuration}  webpack - Webpack configuration settings.
 */
interface IKarmaConfig extends karma.ConfigOptions {
  coverageReporter?: IKarmaCoverageReporterConfigurationOptions;
  webpack?: webpack.Configuration;
}
