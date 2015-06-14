define(
  'collection/repo',
  [
    'model/repo'
  ],
  function (RepoModel) {
    'use strict';

    var RepoCollection = Backbone.Collection.extend({
      model: RepoModel,
      url: 'https://api.github.com/search/repositories',

      parse: function(response) {
        return response;
      }
    });

    return RepoCollection;
  }
);
