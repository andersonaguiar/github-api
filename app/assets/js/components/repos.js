define(
  'components/repos',
  [
    'react',
    'collection/repo/user',
    'components/loader'
  ],
  function (React, UserRepoCollection, ComponentLoader) {
    'use strict';

    var Repo = React.createClass({
      render: function() {
        var repo = this.props.repo;

        return (
          React.DOM.tr(
            {},
            React.DOM.td(
              {},
              React.DOM.a(
                {
                  href: repo.get('html_url'),
                  target: '_blank'
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
      },

      componentWillUnmount: function () {
        Backbone.Events.off('results:loading');
        Backbone.Events.off('results:fetch');
      },

      componentDidMount: function() {
        if (!!this.props.user) {
          var userRepoCollection = new UserRepoCollection();
          userRepoCollection.fetch();
          userRepoCollection.on('sync', _.bind(function(userRepoCollection , repos) {
            this.setState({
              repos: userRepoCollection.set(repos)
            });
          }, this));
        }
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
                colSpan: 3,
                style: {
                  textAlign: 'center'
                }
              },
              feedback
            )
          )
        );
      },

      render: function() {
        var repos = this.noResults();

        if (!!this.state.repos && this.state.repos.length > 0) {
          var repos = this.state.repos.map(function(repo) {
            return React.createElement(Repo, {key: repo.get('id'), repo: repo});
          });
        }

        var title = (!!this.props.title) ? this.props.title : 'Repositórios de Anderson Aguiar';

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
