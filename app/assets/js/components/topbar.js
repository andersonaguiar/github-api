define(
  'components/topbar',
  [
    'react'
  ],
  function (React) {
    'use strict';

    var TopBar = React.createClass({
      componentDidMount: function () {
        this.bindEvents();
      },

      bindEvents: function () {
        Backbone.history.on("all", _.bind(function (route, router) {
          this.setActive(window.location.hash);
        }, this));
      },

      setActive: function (hash) {
        $('[data-topbar] li').removeClass('active');
        $('[data-topbar]')
          .find('a[href="' + hash + '"]')
          .parent()
          .addClass('active');
      },

      render: function() {
        return (
          React.DOM.nav(
            {
              className: "top-bar",
              "data-topbar": true,
              role: "navigation"
            },
            React.DOM.ul(
              {className: "title-area"},
              React.DOM.li(
                {className: "name"},
                React.DOM.h1(
                  {},
                  React.DOM.a(
                    {href: "#"},
                    "Github API"
                  )
                )
              ),
              React.DOM.li(
                {
                  className: "toggle-topbar menu-icon"
                },
                React.DOM.a(
                  {href: "#"},
                  React.DOM.span(
                    {},
                    "Menu"
                  )
                )
              )
            ),
            React.DOM.section(
              {className: "top-bar-section"},
              React.DOM.ul(
                {className: "left"},
                React.DOM.li(
                  {className: "divider"}
                ),
                React.DOM.li(
                  {className: "active"},
                  React.DOM.a(
                    {href: "#/repos/user"},
                    "Meus repositórios"
                  )
                ),
                React.DOM.li(
                  {className: "divider"}
                ),
                React.DOM.li(
                  {},
                  React.DOM.a(
                    {href: "#/repos"},
                    "Procurar repositórios"
                  )
                ),
                React.DOM.li(
                  {className: "divider"}
                ),
                React.DOM.li(
                  {},
                  React.DOM.a(
                    {href: "#/repos/starred"},
                    "Repositórios favoritados"
                  )
                ),
                React.DOM.li(
                  {className: "divider"}
                )
              )
            )
          )
        );
      }
    });

    return TopBar;
  }
);
