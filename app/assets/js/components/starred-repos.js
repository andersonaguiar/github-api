define(
  'components/repos/starred',
  [
    'react'
  ],
  function (React) {
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
        // get repos
        var repos = this.props.repos;

        console.log(repos)

        repos.once('sync', function() {
          this.forceUpdate();
        }, this);
      },

      componentDidMount: function() { },

      render: function() {
        var repos = this.state.repos.map(function(repo) {
          return React.createElement(Repo, {repo: repo});
        });

        return (
          React.DOM.div(
            {},
            React.DOM.h1(
              {},
              'Repositórios de Anderson Aguiar'
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
