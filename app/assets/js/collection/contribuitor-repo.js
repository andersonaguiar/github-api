define(
  'collection/repo/contribuitor',
  function (RepoCollection, RepoContribuitorModel) {
    'use strict';

    var RepoContribuitorCollection = Backbone.Collection.extend({
      url: 'https://api.github.com/repos/'
    });

    return RepoContribuitorCollection;
  }
);
