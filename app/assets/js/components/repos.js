define(
  'components/repos',
  [
    'react',
    'collection/repo/user',
    'collection/repo/starred',
    'model/repo/starred',
    'components/loader'
  ],
  function (React, UserRepoCollection, StarredRepoCollection, StarredRepoModel, ComponentLoader) {
    'use strict';

    var Repo = React.createClass({
      getInitialState: function () {
        return {
          starred: 'set'
        }
      },

      componentDidMount: function () {
        this.setState({
          starred: (!!this.props.starred) ? '[x]' : 'set'
        });
      },

      star: function (repo) {
        event.preventDefault();

        var starredRepoCollection = App.StarredRepos;

        var id = repo.get('id');
        var starred = true;

        if (starredRepoCollection.get(id)) {
          starred = !(!!starredRepoCollection.get(id).get('starred'))
        }

        if (!!starred) {
          var starredRepoModel = new StarredRepoModel(repo.toJSON());
          starredRepoModel.set({starred: starred});
          starredRepoCollection.create(
            starredRepoModel
          );
        } else {
          starredRepoCollection.get(id).destroy();
        }

        Backbone.Events.trigger('repo:starred', starredRepoCollection);

        this.setState({
          starred: (!!starred) ? '[x]' : 'set'
        });
      },

      render: function() {
        var repo = this.props.repo;

        return (
          React.DOM.tr(
            {},
            React.DOM.td(
              {},
              React.DOM.a(
                {
                  href: '#/repos/' + repo.get('owner').login + '/' + repo.get('name')
                },
                repo.get('name')
              )
            ),
            React.DOM.td(
              {},
              repo.get('description')
            ),
            React.DOM.td(
              {},
              (!!repo.get('fork') ? 'Sim' : 'Não')
            ),
            React.DOM.td(
              {},
              React.DOM.a(
                {
                  href: '#',
                  onClick: this.star.bind(this, this.props.repo)
                },
                this.state.starred
              )
            )
          )
        );
      }
    });

    var Repos = React.createClass({
      getInitialState: function() {
        return { repos: this.props.repos };
      },

      componentWillMount: function() {
        Backbone.Events.on('results:loading', _.bind(function () {
          this.setState({
            repos: null
          });
        }, this));

        Backbone.Events.on('results:fetch', _.bind(function () {
          this.setState({
            repos: this.props.repos
          });
        }, this));

        Backbone.Events.on('repo:starred', _.bind(function (starredRepoCollection) {
          this.getStarredRepos();
        }, this));
      },

      componentWillUnmount: function () {
        Backbone.Events.off('results:loading');
        Backbone.Events.off('results:fetch');
        Backbone.Events.off('repo:starred');
      },

      componentDidMount: function() {
        this.getStarredRepos();

        // repos of user
        if (!!this.props.user) {
          var userRepoCollection    = new UserRepoCollection();

          userRepoCollection.fetch();

          userRepoCollection.on('sync', _.bind(function(userRepoCollection , repos) {
            this.setState({
              repos: userRepoCollection
            });
          }, this));
        }
      },

      getStarredRepos: function () {
        var starredRepoCollection = new StarredRepoCollection();

        // get starred repos from local storage
        starredRepoCollection.fetch()
          .done(_.bind(function(){
            App.StarredRepos = starredRepoCollection;

            this.setState({
              starreds: starredRepoCollection
            });
          }, this));
      },

      noResults: function () {
        var feedback = 'Nenhum resultado encontrado.';
        if (!(!!this.state.repos))
          feedback = React.createElement(ComponentLoader);

        return (
          React.DOM.tr(
            {},
            React.DOM.td(
              {
                colSpan: 4,
                style: {
                  textAlign: 'center'
                }
              },
              feedback
            )
          )
        );
      },

      hasStar: function (id) {
        if (this.state.starreds.get(id)) {
          return !!this.state.starreds.get(id).get('starred');
        }
      },

      render: function() {
        var repos = this.noResults();

        if (!!this.state.repos && !!this.state.starreds && this.state.repos.length > 0) {
          var repos = this.state.repos.map(_.bind(function(repo) {
            var starred = this.hasStar(repo.get('id'));
            return React.createElement(
              Repo,
              {
                key: repo.get('id'),
                repo: repo,
                starred: starred
              }
            );
          }, this));
        }

        var title = (!!this.props.title)
                      ? this.props.title
                      : '';

        return (
          React.DOM.div(
            {},
            React.DOM.h1(
              {},
              title
            ),
            React.DOM.table(
              {},
              React.DOM.thead(
                {},
                React.DOM.tr(
                  {},
                  React.DOM.th(
                    {width: 200},
                    'Nome'
                  ),
                  React.DOM.th(
                    {},
                    'Descrição'
                  ),
                  React.DOM.th(
                    {},
                    'Fork?'
                  ),
                  React.DOM.th(
                    {},
                    'Favoritar'
                  )
                )
              ),
              React.DOM.tbody(
                {},
                repos
              )
            )
          )
        );
      }
    });

    return Repos;
  }
);
