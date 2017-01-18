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
      '.gitignore',
      'changelog.txt',
      'README.md',
      'context.py',
      'tests/README.md',
      'resources/__init__.py',
      'resources/language/resource.language.en_gb/strings.po',
      'resources/language/README.md',
      'resources/lib/__init__.py',
      'resources/lib/README.md',
      'resources/settings.xml',
      'LICENSE'
    ]);
    assert.noFile([
      'plugin.py',
      'service.py',
      'script.py'
    ]);
  });
  it('check contextmenu addon.xml content', function () {
    assert.fileContent('addon.xml', '<addon id="contextmenu.test" ');
    assert.fileContent('addon.xml', '<extension point="kodi.context.item" library="context.py">');
    assert.fileContent('addon.xml', ' provider-name="Me">');
    assert.fileContent('addon.xml', '<platform>all</platform>');
    assert.fileContent('addon.xml', '<import addon="xbmc.python" version="2.25.0"/>');
  });
});

describe('generate module', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        type: 'Module',
        scriptid: 'script.module.test',
        scriptname: 'My module name',
        kodiVersion: '2.24.0',
        platforms: 'android',
        license: 'MIT',
        authors: 'Me, Him',
        summary: 'My summary',
        authorName: 'My real name',
        email: 'test@test.de',
        website: 'www.kodi.tv'
      })
      .toPromise();
  });

  it('creates module files', function () {
    assert.file([
      'addon.xml',
      '.gitignore',
      'changelog.txt',
      'README.md',
      'LICENSE'
    ]);
    assert.noFile([
      'context.py',
      'plugin.py',
      'service.py',
      'script.py'
    ]);
  });
  it('check module addon.xml content', function () {
    assert.fileContent('addon.xml', '<addon id="script.module.test" ');
    assert.fileContent('addon.xml', '<extension point="xbmc.python.module" library="lib"/>');
    assert.fileContent('addon.xml', ' provider-name="Me, Him">');
    assert.fileContent('addon.xml', '<platform>android</platform>');
    assert.fileContent('addon.xml', '<import addon="xbmc.python" version="2.24.0"/>');
  });
});

describe('generate plugin', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        type: 'Plugin',
        scriptid: 'plugin.test',
        provides: 'video',
        scriptname: 'My plugin name',
        kodiVersion: '2.25.0',
        platforms: 'osx,windx',
        license: 'MIT',
        authors: 'Me',
        summary: 'My summary',
        authorName: 'My real name',
        email: 'test@test.de',
        website: 'www.kodi.tv'
      })
      .toPromise();
  });

  it('creates plugin files', function () {
    assert.file([
      'addon.xml',
      '.gitignore',
      'changelog.txt',
      'README.md',
      'plugin.py',
      'tests/README.md',
      'resources/__init__.py',
      'resources/language/resource.language.en_gb/strings.po',
      'resources/language/README.md',
      'resources/lib/__init__.py',
      'resources/lib/README.md',
      'resources/settings.xml',
      'LICENSE'
    ]);
    assert.noFile([
      'context.py',
      'service.py',
      'script.py'
    ]);
  });
  it('check plugin addon.xml content', function () {
    assert.fileContent('addon.xml', '<addon id="plugin.test" ');
    assert.fileContent('addon.xml', '<extension point="xbmc.python.pluginsource" library="plugin.py">');
    assert.fileContent('addon.xml', ' provider-name="Me">');
    assert.fileContent('addon.xml', '<platform>osx windx</platform>');
    assert.fileContent('addon.xml', '<import addon="xbmc.python" version="2.25.0"/>');
    assert.fileContent('addon.xml', '<provides>video</provides>');
  });
});

describe('generate resource', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        type: 'Resource',
        scriptid: 'resource.test',
        scriptname: 'My resource name',
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

  it('creates resource files', function () {
    assert.file([
      'addon.xml',
      '.gitignore',
      'changelog.txt',
      'README.md',
      'LICENSE'
    ]);

    assert.noFile([
      'context.py',
      'plugin.py',
      'service.py',
      'script.py'
    ]);
  });
  it('check resource addon.xml content', function () {
    assert.fileContent('addon.xml', '<addon id="resource.test" ');
    assert.fileContent('addon.xml', '<extension point="kodi.resource.images" compile="false" type="skinbackgrounds"/>');
    assert.fileContent('addon.xml', ' provider-name="Me">');
    assert.fileContent('addon.xml', '<platform>all</platform>');
    assert.fileContent('addon.xml', '<import addon="xbmc.python" version="2.25.0"/>');
  });
});

describe('generate script', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        type: 'Script',
        scriptid: 'script.test',
        provides: 'executable',
        scriptname: 'My script name',
        kodiVersion: '2.25.0',
        platforms: 'all',
        license: 'MIT',
        authors: 'Me, him',
        summary: 'My summary',
        authorName: 'My real name',
        email: 'test@test.de',
        website: 'www.kodi.tv'
      })
      .toPromise();
  });

  it('creates script files', function () {
    assert.file([
      'addon.xml',
      '.gitignore',
      'changelog.txt',
      'README.md',
      'script.py',
      'tests/README.md',
      'resources/__init__.py',
      'resources/language/resource.language.en_gb/strings.po',
      'resources/language/README.md',
      'resources/lib/__init__.py',
      'resources/lib/README.md',
      'resources/settings.xml',
      'LICENSE'
    ]);

    assert.noFile([
      'context.py',
      'plugin.py',
      'service.py'
    ]);
  });
  it('check script addon.xml content', function () {
    assert.fileContent('addon.xml', '<addon id="script.test" ');
    assert.fileContent('addon.xml', '<extension point="xbmc.python.script" library="script.py">');
    assert.fileContent('addon.xml', ' provider-name="Me, him">');
    assert.fileContent('addon.xml', '<platform>all</platform>');
    assert.fileContent('addon.xml', '<import addon="xbmc.python" version="2.25.0"/>');
    assert.fileContent('addon.xml', '<provides>executable</provides>');
  });
});

describe('generate service', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        type: 'Service',
        scriptid: 'service.test',
        start: 'login',
        scriptname: 'My service name',
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

  it('creates service files', function () {
    assert.file([
      'addon.xml',
      '.gitignore',
      'changelog.txt',
      'README.md',
      'service.py',
      'tests/README.md',
      'resources/__init__.py',
      'resources/language/resource.language.en_gb/strings.po',
      'resources/language/README.md',
      'resources/lib/__init__.py',
      'resources/lib/README.md',
      'resources/settings.xml',
      'LICENSE'
    ]);

    assert.noFile([
      'context.py',
      'plugin.py',
      'script.py'
    ]);
  });

  it('check service addon.xml content', function () {
    assert.fileContent('addon.xml', '<addon id="service.test" ');
    assert.fileContent('addon.xml', '<extension point="xbmc.service" library="service.py" start="login"/>');
    assert.fileContent('addon.xml', ' provider-name="Me">');
    assert.fileContent('addon.xml', '<platform>all</platform>');
    assert.fileContent('addon.xml', '<import addon="xbmc.python" version="2.25.0"/>');
  });
});
