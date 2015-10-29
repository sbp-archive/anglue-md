var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
    allTestFiles.push(normalizedTestModule);
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base',

  // dynamically load all test files
  deps: allTestFiles,

  paths: {
    'anglue-md': 'dist/umd',
    'anglue': 'bower_components/anglue/dist/amd',
    'luxyflux': 'bower_components/luxyflux/dist/amd',
    'angular': 'bower_components/angular/angular',
    'angular-animate': 'bower_components/angular-animate/angular-animate',
    'angular-aria': 'bower_components/angular-aria/angular-aria',
    'angular-material': 'bower_components/angular-material/angular-material',
    'angular-material-mocks': 'bower_components/angular-material/angular-material-mocks',
    'angular-mocks': 'bower_components/angular-mocks/angular-mocks',
    'angular-ui-router': 'bower_components/angular-ui-router/release/angular-ui-router'
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

  callback: window.__karma__.start
});
