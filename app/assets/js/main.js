var requirejsConfig = {
  baseUrl: '',
  paths: {},
  shim: {},
};

var configMap = [
  {
    module: 'jquery',
    modulePath: 'vendor/jquery/dist/jquery.min'
  },
  {
    module: 'underscore',
    modulePath: 'vendor/underscore/underscore-min'
  },
  {
    module: 'backbone',
    modulePath: 'vendor/backbone/backbone-min'
  },
  {
    module: 'localstorage',
    modulePath: 'vendor/backbone.localStorage/backbone.localStorage-min'
  },
  {
    module: 'react',
    modulePath: 'vendor/react/react'
  },
  {
    module: 'app',
    modulePath: 'assets/js/app'
  },
  {
    module: 'model/repo',
    modulePath: 'assets/js/model/repo'
  },
  {
    module: 'model/repo/starred',
    modulePath: 'assets/js/model/starred-repo'
  },
  {
    module: 'model/repo/contribuitor',
    modulePath: 'assets/js/model/contribuitor-repo'
  },
  {
    module: 'model/repo/language',
    modulePath: 'assets/js/model/language-repo'
  },
  {
    module: 'collection/repo',
    modulePath: 'assets/js/collection/repo'
  },
  {
    module: 'collection/repo/starred',
    modulePath: 'assets/js/collection/repo-starred'
  },
  {
    module: 'collection/repo/user',
    modulePath: 'assets/js/collection/user-repo'
  },
  {
    module: 'collection/repo/contribuitor',
    modulePath: 'assets/js/collection/contribuitor-repo'
  },
  {
    module: 'collection/repo/language',
    modulePath: 'assets/js/collection/language-repo'
  },
  {
    module: 'router',
    modulePath: 'assets/js/router'
  },
  {
    module: 'components/repos',
    modulePath: 'assets/js/components/repos'
  },
  {
    module: 'components/repos/search',
    modulePath: 'assets/js/components/search-repos'
  },
  {
    module: 'components/repos/starred',
    modulePath: 'assets/js/components/starred-repos'
  },
  {
    module: 'components/repo/details',
    modulePath: 'assets/js/components/repo-details'
  },
  {
    module: 'components/loader',
    modulePath: 'assets/js/components/loader'
  }
];

var sizeConfig = configMap.length;

for (i = 0; i < sizeConfig; i++) {
  requirejsConfig.paths[configMap[i].module] = configMap[i].modulePath
}

requirejs.config(requirejsConfig);

require(
  [
    'jquery',
    'react',
    'app'
  ],
  function($, React, App) {
    window.App = window.App || {};
    var j, sizeBodyClass, cfgModule

    for (j = 0; j < sizeConfig; j++) {
      cfgModule = configMap[j];

      if (cfgModule.hasOwnProperty('bodyClass')) {
        sizeBodyClass = cfgModule.bodyClass.length;

        if ($.isArray(cfgModule.bodyClass)) {
          for (i = 0; i < sizeBodyClass; i++) {
            if ($('body').hasClass(cfgModule.bodyClass[i])) {
              require([cfgModule.module]);
            }
          }
        } else if ($('body').hasClass(cfgModule.bodyClass)) {
          require([cfgModule.module]);
        }
      }
    }
  }
);
