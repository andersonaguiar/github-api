define(
  'model/repo/language',
  function () {
    'use strict';

    var RepoLanguagesModel = Backbone.Model.extend({
      urlRoot: 'https://api.github.com/repos/'
    });

    return RepoLanguagesModel;
  }
);

