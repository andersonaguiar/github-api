define(
  'components/repos/search',
  [
    'react',
    'collection/repo',
    'components/repos'
  ],
  function (React, RepoCollection, ComponentRepos) {
    'use strict';

    var FormSearch = React.createClass({
      componentDidMount: function () {

      },

      submit: function () {
        event.preventDefault();

        var q = this.refs.q.getDOMNode().value;

        // {data: {page: 3}}

        var repoCollection = new RepoCollection;
        repoCollection.url += '?q=' + q;
        repoCollection.fetch();

        Backbone.Events.trigger('results:loading', q);

        repoCollection.on('sync', function(repoCollection, result) {
          repoCollection.set(result.items);
          Backbone.Events.trigger('results:fetch', repoCollection);
        });
      },

      render: function () {
        return (
          React.DOM.form(
            {
              className: 'row',
              onSubmit: this.submit
            },
            React.DOM.div(
              {
                className: 'large-12 columns'
              },
              React.DOM.div(
                {
                  className: 'row collapse'
                },
                React.DOM.div(
                  {
                    className: 'small-10 columns'
                  },
                  React.DOM.input(
                    {
                      placeholder: 'Ex: Gulpfile',
                      type: 'text',
                      name: 'q',
                      ref: 'q',
                      required: true
                    }
                  )
                ),
                React.DOM.div(
                  {
                    className: 'small-2 columns'
                  },
                  React.DOM.input(
                    {
                      type: 'submit',
                      value: 'Procurar',
                      className: 'button postfix'
                    }
                  )
                )
              )
            )
          )
        );
      }
    });

    var Results = React.createClass({
      render: function () {
        if (!(!!this.props.titleSearch))
          return false;

        var title = 'Resultados para "' + this.props.titleSearch + '":';

        return (
          React.DOM.div(
            {},
            React.createElement(ComponentRepos, {
              title: title,
              repos: this.props.repoCollection
            })
          )
        );
      }
    });

    var SearchRepos = React.createClass({
      getInitialState: function () {
        return {
          repoCollection: null
        }
      },

      componentDidMount: function () {
        this.bindEvents();
      },

      bindEvents: function () {
        Backbone.Events.on('results:fetch', this.setResults);
        Backbone.Events.on('results:loading', this.setTitle);
      },

      setResults: function (repoCollection) {
        this.setState({
          repoCollection: repoCollection
        });
      },

      setTitle: function (titleSearch) {
        this.setState({
          titleSearch: titleSearch
        });
      },

      render: function () {
        return (
          React.DOM.div(
            {},
            React.DOM.h1(
              {},
              'Procurar repositórios'
            ),
            React.createElement(FormSearch),
            React.createElement(
              Results,
              {
                repoCollection: this.state.repoCollection,
                titleSearch: this.state.titleSearch
              }
            )
          )
        )
      }
    });

    return SearchRepos;
  }
);
