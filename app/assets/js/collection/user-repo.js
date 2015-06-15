define(
  'collection/repo/user',
  [
    'collection/repo',
    'model/repo'
  ],
  function (RepoCollection, RepoModel) {
    'use strict';

    var UserRepoCollection = RepoCollection.extend({
      model: RepoModel,
      url: 'https://api.github.com/users/andersonaguiar/repos',

      parse: function(response) {
        return response;
      }
    });

    return UserRepoCollection;
  }
);
