define(
  'router',
  [
    'react',
    'collection/repo',
    'collection/repo/user',
    'components/repos',
    'components/repos/search',
    'components/repos/starred'
  ],
  function (React, RepoCollection, UserRepoCollection, ComponentRepos, ComponentSearchRepos, ComponentStarredRepos) {
    'use strict';

    var Router = Backbone.Router.extend({
      routes: {
          '': 'userRepos',
          'repos/user': 'userRepos',
          'repos': 'repos',
          'repos/starred': 'reposStarred'
      },

      initialize: function(callback) {
        callback();
      },

      userRepos: function() {
        React.render(React.createElement(ComponentRepos, {user: true}), $('[data-js="target"]')[0]);
      },

      repos: function() {
        React.render(React.createElement(ComponentSearchRepos), $('[data-js="target"]')[0]);
      },

      reposStarred: function() {
        React.render(React.createElement(ComponentStarredRepos), $('[data-js="target"]')[0]);
      }
    });

    return Router;
  }
);
