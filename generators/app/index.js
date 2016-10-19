'use strict';
var chalk = require('chalk');
var mkdirp = require('mkdirp');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the awesome ' + chalk.red('generator-kodi-script') + ' generator!'
    ));

    var kodiVersion = [
      { name: 'Krypton', value: '2.25.0' },
      { name: 'Jarvis', value: '2.24.0' }
    ];

    var prompts = [{
      type: 'input',
      name: 'scriptid',
      message: 'Your script id, it should be in the format script.name and not contain spaces? (for e.g. script.test.hello)',
      validate: function (str) {
        return str.length > 'script.'.length;
      }
    },
    {
      type: 'input',
      name: 'scriptname',
      message: 'Your script name should be easily readable? (for e.g. Hello World)',
      validate: function (str) {
        return str.length > 2;
      }
    },
    {
      type: 'list',
      name: 'kodiVersion',
      message: 'Choose the minimal Kodi Version your targeting.',
      choices: kodiVersion,
      default: 0
    },
    {
      type: 'checkbox',
      name: 'platforms',
      message: 'Which platforms does this run with?',
      choices: ['all', 'android', 'linux', 'osx', 'windx']
    },
    {
      type: 'list',
      name: 'license',
      message: 'Choose your license.',
      choices: ['Apache 2.0', 'MIT', 'GNU'],
      default: 0
    },
    {
      type: 'input',
      name: 'authors',
      message: 'All author names? (seperated by ,)'
    },
    {
      type: 'input',
      name: 'summary',
      message: 'What does your script do?'
    },
    {
      type: 'input',
      name: 'authorName',
      message: 'Your real name? We are using this for the license creation.'
    },
    {
      type: 'input',
      name: 'email',
      message: 'Your email address? (for e.g. john.doe@gmail.com)'
    },
    {
      type: 'input',
      name: 'website',
      message: 'Your website URL? (for e.g. www.kodi.tv)'
    },
    {
      type: 'input',
      name: 'source',
      message: 'Where is the source code of your addon located? (for e.g. www.github.com/username/repo)'
    }
    ];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

    default: function () {
    if (path.basename(this.destinationPath()) !== this.props.scriptid) {
      this.log(
        'Your generator must be inside a folder named ' + this.props.scriptid + '\n' +
        'I\'ll automatically create this folder.'
      );
      mkdirp(this.props.scriptid);
      this.destinationRoot(this.destinationPath(this.props.scriptid));
    }
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('*'),
      this.destinationPath(''),
      { props: this.props,
        platforms: this.props.platforms.toString().replace(/[,]/g, ' ') }
    );
    this.fs.copyTpl(
      this.templatePath('tests/**'),
      this.destinationPath('tests/')
    );
    this.fs.copyTpl(
      this.templatePath('resources/**'),
      this.destinationPath('resources/')
    );
    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );
    this.composeWith('license', {
        options: {
          name: this.props.authorName,
          email: this.props.email,
          website: this.props.website
        }
      }, {
        local: require.resolve('generator-license/app')
      });
    this.composeWith('git-init', {
      options: { commit: 'Created initial addon structure' }
    }, {
      local: require.resolve('generator-git-init')
    });
  },
});
