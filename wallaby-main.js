/*global wallaby, requirejs*/
// delaying wallaby automatic start
wallaby.delayStart();

requirejs.config({
  baseUrl: '/',

  paths: {
    'anglue-md': 'src',
    'anglue': 'bower_components/anglue/dist/amd',
    'angular': 'bower_components/angular/angular',
    'angular-animate': 'bower_components/angular-animate/angular-animate',
    'angular-aria': 'bower_components/angular-aria/angular-aria',
    'angular-material': 'bower_components/angular-material/angular-material',
    'angular-material-mocks': 'bower_components/angular-material/angular-material-mocks',
    'angular-mocks': 'bower_components/angular-mocks/angular-mocks',
    'angular-ui-router': 'bower_components/angular-ui-router/release/angular-ui-router',
    'luxyflux': 'bower_components/luxyflux/dist/amd'
  },

  shim: {
    'angular': {
      exports: 'angular'
    },
    'angular-aria': ['angular'],
    'angular-animate': ['angular'],
    'angular-material': ['angular'],
    'angular-material-mocks': ['angular'],
    'angular-mocks': ['angular'],
    'angular-ui-router': ['angular'],
    'luxyflux': ['angular']
  },

  // asking require.js to load our tests
  deps: wallaby.tests,

  // starting run once require.js is done
  callback: wallaby.start
});
