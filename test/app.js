'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generate contextmenu', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({someAnswer: true})
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
