define(
  'collection/repo/user',
  [
    'collection/repo',
    'model/repo/user'
  ],
  function (RepoCollection, UserRepoModel) {
    'use strict';

    var UserRepoCollection = RepoCollection.extend({
      model: UserRepoModel,
      url: 'https://api.github.com/users/andersonaguiar/repos',

      parse: function(response) {
        return response;
      }
    });

    return UserRepoCollection;
  }
);
