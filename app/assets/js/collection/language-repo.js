define(
  'collection/repo/language',
  [
    'model/repo/language'
  ],
  function (RepoCollection, RepoLanguageModel) {
    'use strict';

    var RepoLanguageCollection = Backbone.Collection.extend({
      url: 'https://api.github.com/repos/'
    });

    return RepoLanguageCollection;
  }
);
