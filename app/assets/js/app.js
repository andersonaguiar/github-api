define(
  'app',
  [
    'backbone',
    'underscore',
    'router'
  ],
  function (Backbone, _, Router) {
    'use strict';

    var router = new Router(function() {
      Backbone.history.start();
    });
  }
);

