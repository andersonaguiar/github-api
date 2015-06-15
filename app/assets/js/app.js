define(
  'app',
  [
    'backbone',
    'underscore',
    'router'
  ],
  function (Backbone, _, Router) {
    'use strict';

    window.App = {
      StarredRepos: null
    };

    var router = new Router(function() {
      Backbone.history.start();
    });
  }
);

