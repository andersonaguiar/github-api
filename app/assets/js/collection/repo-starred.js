define(
  'collection/repo/starred',
  [
    'model/repo/starred',
    'localstorage'
  ],
  function (RepoStarredModel) {
    'use strict';

    var StarredRepoCollection = Backbone.Collection.extend({
      model: RepoStarredModel,

      localStorage: new Backbone.LocalStorage("StarredRepoCollection")
    });

    return StarredRepoCollection;
  }
);
