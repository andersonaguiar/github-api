define(
  'model/repo/contribuitor',
  function () {
    'use strict';

    var RepoContribuitorsModel = Backbone.Model.extend({
      urlRoot: 'https://api.github.com/repos/'
    });

    return RepoContribuitorsModel;
  }
);

