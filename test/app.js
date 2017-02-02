'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generate contextmenu', function() {
    before(function() {
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

    it('creates contextmenu files', function() {
        assert.file([
            'addon.xml',
            '.gitignore',
            'changelog.txt',
            'main.py',
            'README.md',
            'resources/lib/context.py',
            'resources/language/resource.language.en_gb/strings.po',
            'resources/language/README.md',
            'LICENSE'
        ]);
        assert.noFile([
            'resources/lib/plugin.py',
            'resources/lib/service.py',
            'resources/lib/script.py',
            'resources/lib/subtitle.py',
            'tests/README.md',
            'resources/__init__.py',
            'resources/lib/__init__.py',
            'resources/lib/kodiutils.py',
            'resources/lib/kodiLogging.py',
            'resources/lib/README.md',
            'resources/settings.xml'
        ]);
    });
    it('check contextmenu addon.xml content', function() {
        assert.fileContent('addon.xml', '<addon id="contextmenu.test" ');
        assert.fileContent('addon.xml', '<extension point="kodi.context.item" library="main.py">');
        assert.fileContent('addon.xml', ' provider-name="Me">');
        assert.fileContent('addon.xml', '<platform>all</platform>');
        assert.fileContent('addon.xml', '<import addon="xbmc.python" version="2.25.0"/>');
    });
    it('check contextmenu main.py content', function() {
        assert.fileContent('main.py', 'from resources.lib import context');
        assert.fileContent('main.py', 'context.run()');
        assert.noFileContent('main.py', 'from resources.lib import plugin');
        assert.noFileContent('main.py', 'plugin.run()');
        assert.noFileContent('main.py', 'from resources.lib import script');
        assert.noFileContent('main.py', 'script.show_dialog()');
        assert.noFileContent('main.py', 'from resources.lib import service');
        assert.noFileContent('main.py', 'service.run()');
        assert.noFileContent('main.py', 'from resources.lib import subtitle');
        assert.noFileContent('main.py', 'subtitle.run()');
    });
});

describe('generate module', function() {
    before(function() {
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

    it('creates module files', function() {
        assert.file([
            'addon.xml',
            '.gitignore',
            'changelog.txt',
            'README.md',
            'LICENSE'
        ]);
        assert.noFile([
            'main.py',
            'resources/lib/context.py',
            'resources/lib/plugin.py',
            'resources/lib/service.py',
            'resources/lib/script.py',
            'resources/lib/subtitle.py',
            'tests/README.md',
            'resources/__init__.py',
            'resources/language/resource.language.en_gb/strings.po',
            'resources/language/README.md',
            'resources/lib/__init__.py',
            'resources/lib/kodiutils.py',
            'resources/lib/kodiLogging.py',
            'resources/lib/README.md',
            'resources/settings.xml'
        ]);
    });
    it('check module addon.xml content', function() {
        assert.fileContent('addon.xml', '<addon id="script.module.test" ');
        assert.fileContent('addon.xml', '<extension point="xbmc.python.module" library="lib"/>');
        assert.fileContent('addon.xml', ' provider-name="Me, Him">');
        assert.fileContent('addon.xml', '<platform>android</platform>');
        assert.fileContent('addon.xml', '<import addon="xbmc.python" version="2.24.0"/>');
    });
});

describe('generate plugin', function() {
    before(function() {
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

    it('creates plugin files', function() {
        assert.file([
            'addon.xml',
            '.gitignore',
            'changelog.txt',
            'main.py',
            'README.md',
            'resources/lib/plugin.py',
            'tests/README.md',
            'resources/__init__.py',
            'resources/language/resource.language.en_gb/strings.po',
            'resources/language/README.md',
            'resources/lib/__init__.py',
            'resources/lib/kodiutils.py',
            'resources/lib/kodiLogging.py',
            'resources/lib/README.md',
            'resources/settings.xml',
            'LICENSE'
        ]);
        assert.noFile([
            'resources/lib/context.py',
            'resources/lib/service.py',
            'resources/lib/script.py',
            'resources/lib/subtitle.py'
        ]);
    });
    it('check plugin addon.xml content', function() {
        assert.fileContent('addon.xml', '<addon id="plugin.test" ');
        assert.fileContent('addon.xml', '<extension point="xbmc.python.pluginsource" library="main.py">');
        assert.fileContent('addon.xml', ' provider-name="Me">');
        assert.fileContent('addon.xml', '<platform>osx windx</platform>');
        assert.fileContent('addon.xml', '<import addon="xbmc.python" version="2.25.0"/>');
        assert.fileContent('addon.xml', '<provides>video</provides>');
        assert.fileContent('addon.xml', '<import addon="script.module.routing" version="');
        assert.noFileContent('addon.xml', '<import addon="script.module.simplejson" version="');
        assert.noFileContent('resources/lib/kodiutils.py', 'import simplejson as json');
    });
    it('check plugin main.py content', function() {
        assert.noFileContent('main.py', 'from resources.lib import context');
        assert.noFileContent('main.py', 'context.run()');
        assert.fileContent('main.py', 'from resources.lib import plugin');
        assert.fileContent('main.py', 'plugin.run()');
        assert.noFileContent('main.py', 'from resources.lib import script');
        assert.noFileContent('main.py', 'script.show_dialog()');
        assert.noFileContent('main.py', 'from resources.lib import service');
        assert.noFileContent('main.py', 'service.run()');
        assert.noFileContent('main.py', 'from resources.lib import subtitle');
        assert.noFileContent('main.py', 'subtitle.run()');
    });
});

describe('generate resource', function() {
    before(function() {
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

    it('creates resource files', function() {
        assert.file([
            'addon.xml',
            '.gitignore',
            'changelog.txt',
            'README.md',
            'LICENSE'
        ]);

        assert.noFile([
            'main.py',
            'resources/lib/context.py',
            'resources/libplugin.py',
            'resources/lib/service.py',
            'resources/lib/script.py',
            'resources/lib/subtitle.py',
            'tests/README.md',
            'resources/__init__.py',
            'resources/language/resource.language.en_gb/strings.po',
            'resources/language/README.md',
            'resources/lib/__init__.py',
            'resources/lib/kodiutils.py',
            'resources/lib/kodiLogging.py',
            'resources/lib/README.md',
            'resources/settings.xml'
        ]);
    });
    it('check resource addon.xml content', function() {
        assert.fileContent('addon.xml', '<addon id="resource.test" ');
        assert.fileContent('addon.xml', '<extension point="kodi.resource.images" compile="false" type="skinbackgrounds"/>');
        assert.fileContent('addon.xml', ' provider-name="Me">');
        assert.fileContent('addon.xml', '<platform>all</platform>');
        assert.fileContent('addon.xml', '<import addon="xbmc.python" version="2.25.0"/>');
    });
});

describe('generate script', function() {
    before(function() {
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

    it('creates script files', function() {
        assert.file([
            'addon.xml',
            '.gitignore',
            'changelog.txt',
            'main.py',
            'README.md',
            'resources/lib/script.py',
            'tests/README.md',
            'resources/__init__.py',
            'resources/language/resource.language.en_gb/strings.po',
            'resources/language/README.md',
            'resources/lib/__init__.py',
            'resources/lib/kodiutils.py',
            'resources/lib/kodiLogging.py',
            'resources/lib/README.md',
            'resources/settings.xml',
            'LICENSE'
        ]);

        assert.noFile([
            'resources/lib/context.py',
            'resources/libplugin.py',
            'resources/lib/service.py',
            'resources/lib/subtitle.py'
        ]);
    });
    it('check script addon.xml content', function() {
        assert.fileContent('addon.xml', '<addon id="script.test" ');
        assert.fileContent('addon.xml', '<extension point="xbmc.python.script" library="main.py">');
        assert.fileContent('addon.xml', ' provider-name="Me, him">');
        assert.fileContent('addon.xml', '<platform>all</platform>');
        assert.fileContent('addon.xml', '<import addon="xbmc.python" version="2.25.0"/>');
        assert.fileContent('addon.xml', '<provides>executable</provides>');
        assert.noFileContent('addon.xml', '<import addon="script.module.simplejson" version="');
        assert.noFileContent('resources/lib/kodiutils.py', 'import simplejson as json');
    });
    it('check script main.py content', function() {
        assert.noFileContent('main.py', 'from resources.lib import context');
        assert.noFileContent('main.py', 'context.run()');
        assert.noFileContent('main.py', 'from resources.lib import plugin');
        assert.noFileContent('main.py', 'plugin.run()');
        assert.fileContent('main.py', 'from resources.lib import script');
        assert.fileContent('main.py', 'script.show_dialog()');
        assert.noFileContent('main.py', 'from resources.lib import service');
        assert.noFileContent('main.py', 'service.run()');
        assert.noFileContent('main.py', 'from resources.lib import subtitle');
        assert.noFileContent('main.py', 'subtitle.run()');
    });
});

describe('generate service', function() {
    before(function() {
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

    it('creates service files', function() {
        assert.file([
            'addon.xml',
            '.gitignore',
            'changelog.txt',
            'main.py',
            'README.md',
            'resources/lib/service.py',
            'tests/README.md',
            'resources/__init__.py',
            'resources/language/resource.language.en_gb/strings.po',
            'resources/language/README.md',
            'resources/lib/__init__.py',
            'resources/lib/kodiutils.py',
            'resources/lib/kodiLogging.py',
            'resources/lib/README.md',
            'resources/settings.xml',
            'LICENSE'
        ]);

        assert.noFile([
            'resources/lib/context.py',
            'resources/lib/plugin.py',
            'resources/lib/script.py',
            'resources/lib/subtitle.py'
        ]);
    });

    it('check service addon.xml content', function() {
        assert.fileContent('addon.xml', '<addon id="service.test" ');
        assert.fileContent('addon.xml', '<extension point="xbmc.service" library="main.py" start="login"/>');
        assert.fileContent('addon.xml', ' provider-name="Me">');
        assert.fileContent('addon.xml', '<platform>all</platform>');
        assert.fileContent('addon.xml', '<import addon="xbmc.python" version="2.25.0"/>');
        assert.noFileContent('addon.xml', '<import addon="script.module.simplejson" version="');
        assert.noFileContent('resources/lib/kodiutils.py', 'import simplejson as json');
    });
    it('check service main.py content', function() {
        assert.noFileContent('main.py', 'from resources.lib import context');
        assert.noFileContent('main.py', 'context.run()');
        assert.noFileContent('main.py', 'from resources.lib import plugin');
        assert.noFileContent('main.py', 'plugin.run()');
        assert.noFileContent('main.py', 'from resources.lib import script');
        assert.noFileContent('main.py', 'script.show_dialog()');
        assert.fileContent('main.py', 'from resources.lib import service');
        assert.fileContent('main.py', 'service.run()');
        assert.noFileContent('main.py', 'from resources.lib import subtitle');
        assert.noFileContent('main.py', 'subtitle.run()');
    });
});

describe('check simplejson for jarvis', function() {
    before(function() {
        return helpers.run(path.join(__dirname, '../generators/app'))
            .withPrompts({
                type: 'Service',
                scriptid: 'service.test',
                start: 'login',
                scriptname: 'My service name',
                kodiVersion: '2.24.0',
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

    it('check service addon.xml content', function() {
        assert.fileContent('addon.xml', '<import addon="script.module.simplejson" version="');
        assert.fileContent('resources/lib/kodiutils.py', 'import simplejson as json');
    });
});

describe('generate subtitle', function() {
    before(function() {
        return helpers.run(path.join(__dirname, '../generators/app'))
            .withPrompts({
                type: 'Subtitle',
                scriptid: 'subtitle.test',
                scriptname: 'My subtitle name',
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

    it('creates subtitle files', function() {
        assert.file([
            'addon.xml',
            '.gitignore',
            'changelog.txt',
            'main.py',
            'README.md',
            'resources/lib/subtitle.py',
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
            'resources/lib/context.py',
            'resources/lib/plugin.py',
            'resources/lib/script.py',
            'resources/lib/service.py'
        ]);
    });

    it('check subtitle addon.xml content', function() {
        assert.fileContent('addon.xml', '<addon id="subtitle.test" ');
        assert.fileContent('addon.xml', '<extension point="xbmc.subtitle.module" library="main.py" />');
        assert.fileContent('addon.xml', ' provider-name="Me">');
        assert.fileContent('addon.xml', '<platform>all</platform>');
        assert.fileContent('addon.xml', '<import addon="xbmc.python" version="2.25.0"/>');
    });
    it('check subtitle main.py content', function() {
        assert.noFileContent('main.py', 'from resources.lib import context');
        assert.noFileContent('main.py', 'context.run()');
        assert.noFileContent('main.py', 'from resources.lib import plugin');
        assert.noFileContent('main.py', 'plugin.run()');
        assert.noFileContent('main.py', 'from resources.lib import script');
        assert.noFileContent('main.py', 'script.show_dialog()');
        assert.noFileContent('main.py', 'from resources.lib import service');
        assert.noFileContent('main.py', 'service.run()');
        assert.fileContent('main.py', 'from resources.lib import subtitle');
        assert.fileContent('main.py', 'subtitle.run()');
    });
});
