define(
  'router',
  [
    'react',
    'collection/repo',
    'collection/repo/user',
    'components/repos',
    'components/repos/search',
    'components/repos/starred',
    'components/repo/details'
  ],
  function (React, RepoCollection, UserRepoCollection, ComponentRepos, ComponentSearchRepos, ComponentStarredRepos, ComponentRepoDetails) {
    'use strict';

    var Router = Backbone.Router.extend({
      routes: {
          ''                    : 'userRepos',
          'repos/user'          : 'userRepos',
          'repos'               : 'repos',
          'repos/starred'       : 'reposStarred',
          'repos/:owner/:name'  : 'repoDetails'
      },

      initialize: function(callback) {
        callback();
      },

      userRepos: function() {
        React.render(React.createElement(
          ComponentRepos,
          {
            user: true,
            title: 'Repositórios de Anderson Aguiar'
          }
        ), $('[data-js="target"]')[0]);
      },

      repos: function() {
        React.render(React.createElement(ComponentSearchRepos), $('[data-js="target"]')[0]);
      },

      reposStarred: function() {
        React.render(React.createElement(ComponentStarredRepos), $('[data-js="target"]')[0]);
      },

      repoDetails: function(owner, name) {
        React.render(React.createElement(
          ComponentRepoDetails,
          {
            owner: owner,
            name: name
          }
        ), $('[data-js="target"]')[0]);
      }

    });

    return Router;
  }
);
