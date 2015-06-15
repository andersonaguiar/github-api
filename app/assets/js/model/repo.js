define(
  'model/repo',
  function () {
    'use strict';

    var RepoModel = Backbone.Model.extend({
      defaults: {
        description: ''
      },

      urlRoot: 'https://api.github.com/repos/',

      parse: function (payload) {
        var defaults = {};
        if (payload) {
          defaults = {
            description: payload.description  || '** Sem descrição **'
          }
        }

        return $.extend(payload, defaults);
      }
    });

    return RepoModel;
  }
);

