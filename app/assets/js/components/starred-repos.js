define(
  'components/repos/starred',
  [
    'react',
    'collection/repo',
    'collection/repo/starred',
    'components/repos'
  ],
  function (React, RepoCollection, StarredRepoCollection, ComponentRepos) {
    'use strict';

    var Results = React.createClass({
      getInitialState: function () {
        return {
          repoCollection: this.props.repoCollection
        };
      },

      render: function () {
        return (
          React.DOM.div(
            {},
            React.createElement(
              ComponentRepos,
              {
                repos: this.state.repoCollection
              }
            )
          )
        );
      }
    });

    var StarredRepos = React.createClass({
      getInitialState: function () {
        return {
          repoCollection: null
        }
      },

      componentDidMount: function () {
        this.getStarredRepos();
      },

      getStarredRepos: function () {
        var starredRepoCollection = new StarredRepoCollection();

        // get starred repos from local storage
        starredRepoCollection.fetch()
          .done(_.bind(function(){
            App.StarredRepos = starredRepoCollection;

            this.setState({
              repoCollection: starredRepoCollection
            });
          }, this));
      },

      render: function () {
        if (!this.state.repoCollection)
          return false;

        return (
          React.DOM.div(
            {},
            React.DOM.h1(
              {},
              'Repositórios favoritados'
            ),
            React.createElement(
              Results,
              {
                repoCollection: this.state.repoCollection
              }
            )
          )
        )
      }
    });

    return StarredRepos;
  }
);
