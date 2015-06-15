define(
  'components/repo/details',
  [
    'react',
    'components/loader',
    'model/repo',
    'collection/repo/contribuitor',
    'collection/repo/language'
  ],
  function (React, ComponentLoader, RepoModel, RepoContribuitorsCollection, RepoLanguagesCollection) {
    'use strict';

    var Details = React.createClass({
      render: function () {
        if (!this.props.repo) {
          return (
            React.DOM.div(
              {},
              React.createElement(ComponentLoader)
            )
          );
        }

        var repo = this.props.repo;

        return (
          React.DOM.div(
            {},
            React.DOM.p(
              {},
              React.DOM.strong(
                {},
                'Nome: '
              ),
              repo.get('name')
            ),
            React.DOM.p(
              {},
              React.DOM.strong(
                {},
                'Descrição: '
              ),
              repo.get('description')
            ),
            React.DOM.div(
              {},
              React.createElement(Languages, {repo: repo})
            ),
            React.DOM.p(
              {},
              React.DOM.strong(
                {},
                'Última data de atualização: '
              ),
              repo.get('updated_at')
            ),
            React.DOM.div(
              {},
              React.DOM.strong(
                {},
                'Dono: '
              ),
              React.DOM.div(
                {},
                React.DOM.a(
                  {
                    href: repo.get('owner').html_url,
                    target: '_blank'
                  },
                  React.DOM.img(
                    {
                      src: repo.get('owner').avatar_url,
                      width: 100
                    }
                  ),
                  React.DOM.p(
                    {},
                    repo.get('owner').login
                  )
                )
              )
            )
          )
        );
      }
    });

    var Languages = React.createClass({
      setLoader: function () {
        return (
          React.DOM.div(
            {},
            React.DOM.p(
              {},
              React.DOM.strong(
                {},
                'Linguagens: '
              ),
              'Carregando...'
            )
          )
        )
      },

      render: function () {
        if (!this.props.repo || !this.props.repo.get('languages')) {
          return this.setLoader();
        }

        var languages     = this.props.repo.get('languages');
        var languageList  = [];
        _.map(languages.toJSON()[0], function(total, language){
          languageList.push(language);
        });

        return (
          React.DOM.div(
            {},
            React.DOM.p(
              {},
              React.DOM.strong(
                {},
                'Linguagens: '
              ),
              languageList.join()
            )
          )
        );
      }
    });

    var Contribuitor = React.createClass({
      render: function () {
        var contribuitor = this.props.contribuitor;

        return (
          React.DOM.tr(
            {},
            React.DOM.td(
              {},
              React.DOM.img(
                {
                  src: contribuitor.get('avatar_url'),
                  width: 100
                }
              )
            ),
            React.DOM.td(
              {},
              React.DOM.a(
                {
                  href: contribuitor.get('html_url'),
                  target: '_blank'
                },
                contribuitor.get('login')
              )
            ),
            React.DOM.td(
              {},
              contribuitor.get('contributions')
            )
          )
        )
      }
    });

    var Contribuitors = React.createClass({
      setLoader: function () {
        return (
          React.DOM.div(
            {},
            React.DOM.h3(
              {},
              'Contribuidores:'
            ),
            React.createElement(ComponentLoader)
          )
        )
      },

      render: function () {
        if (!this.props.repo || !this.props.repo.get('contribuitors')) {
          return this.setLoader();
        }

        var contribuitors = this.props.repo.get('contribuitors').map(_.bind(function(contribuitor){
          return React.createElement(
            Contribuitor,
            {
              key: contribuitor.get('id'),
              contribuitor: contribuitor
            }
          );
        }, this));

        return (
          React.DOM.div(
            {},
            React.DOM.h3(
              {},
              'Contribuidores:'
            ),
            React.DOM.table(
              {},
              React.DOM.tr(
                {},
                React.DOM.th(
                  {},
                  'Avatar'
                ),
                React.DOM.th(
                  {},
                  'login'
                ),
                React.DOM.th(
                  {},
                  'Número de contribuições'
                )
              ),
              React.DOM.tbody(
                {},
                contribuitors
              )
            )
          )
        );
      }
    });

    var RepoDetails = React.createClass({
      getInitialState: function () {
        return {
          repo: null
        }
      },

      componentDidMount: function () {
        var repoModel                    = new RepoModel();
        var repoContribuitorsCollection  = new RepoContribuitorsCollection();
        var repoLanguagesCollection      = new RepoLanguagesCollection();
        var repoTarget = this.props.owner + '/' + this.props.name;

        repoModel.url = repoModel.urlRoot + repoTarget;
        repoModel.fetch()
          .done(_.bind(function(data){
            this.setState({
              repo: repoModel
            });
          }, this));

        repoContribuitorsCollection.url += repoTarget + '/contributors';
        repoContribuitorsCollection.fetch()
          .done(_.bind(function(data){
            this.setState({
              repo: repoModel.set({contribuitors: repoContribuitorsCollection})
            });
          }, this));

        repoLanguagesCollection.url += repoTarget + '/languages';
        repoLanguagesCollection.fetch()
          .done(_.bind(function(data){
            this.setState({
              repo: repoModel.set({languages: repoLanguagesCollection})
            });
          }, this));


      },

      render: function() {
        return (
          React.DOM.div(
            {},
            React.DOM.h1(
              {},
              'Detalhes do repositório'
            ),
            React.createElement(Details, {repo: this.state.repo}),
            React.DOM.br(),
            React.createElement(Contribuitors, {repo: this.state.repo})
          )
        );
      }
    });

    return RepoDetails;
  }
);
