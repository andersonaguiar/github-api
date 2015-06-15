define(
  'collection/repo/contribuitor',
  [
    'model/repo/contribuitor'
  ],
  function (RepoCollection, RepoContribuitorModel) {
    'use strict';

    var RepoContribuitorCollection = Backbone.Collection.extend({
      url: 'https://api.github.com/repos/'
    });

    return RepoContribuitorCollection;
  }
);
