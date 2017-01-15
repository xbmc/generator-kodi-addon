'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generate contextmenu', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        type: 'Contextmenu',
        scriptid: 'contextmenu.test',
        scriptname: 'My contextmenu name',
        kodiVersion: '2.25.0',
        platforms: 'all',
        license: 'MIT',
        authors: 'Me',
        summary: 'My summary',
        authorName: 'My real name',
        email: 'test@test.de',
        website: 'www.kodi.tv'
      })
      .toPromise();
  });

  it('creates contextmenu files', function () {
    assert.file([
      'addon.xml',
      'changelog.txt',
      'README.md'
    ]);
  });
});
