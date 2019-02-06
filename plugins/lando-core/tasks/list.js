'use strict';

// Modules
const _ = require('lodash');
const util = require('util');

module.exports = lando => {
  return {
    command: 'list',
    describe: 'Lists all running lando apps and containers',
    level: 'engine',
    options: {
      all: {
        describe: 'Show all containers, even those not running',
        alias: ['a'],
        boolean: true,
      },
      app: {
        describe: 'Show containers for only a particular app',
        string: true,
      },
      filter: {
        describe: 'Filter by "key=value"',
        alias: ['f'],
        array: true,
      },
    },
    run: options => {
      // List all the apps
      return lando.engine.list(options)
      // Map each app to a summary and print results
      .then(containers => {
        console.log(util.inspect(_(containers)
          .map(container => _.omit(container, ['lando', 'id', 'instance']))
          .groupBy('app')
          .value(), {colors: true, depth: 10, compact: false}));
      });
    },
  };
};
