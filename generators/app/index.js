'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the awesome ' + chalk.red('generator-kodi-script') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'authorName',
      message: 'Your name?'
    },{
      type: 'input',
      name: 'scriptid',
      message: 'Your script id, it should be in the format script.name and not contain spaces?'
    },
    {
      type: 'input',
      name: 'scriptname',
      message: 'Your script name should be easily readable?'
    },
    {
      type: 'checkbox',
      name: 'platforms',
      message: 'Which platforms does this run with?',
      choices: ['all', 'android']
    },
    {
      type: 'list',
      name: 'license',
      message: 'Choose your license',
      choices: ['Apache 2.0', 'MIT', 'GNU']
    },
    {
      type: 'input',
      name: 'authors',
      message: 'All author names? (seperated by ,)'
    },
    {
      type: 'input',
      name: 'summary',
      message: 'Describe, what your script does'
    },
    {
      type: 'input',
      name: 'email',
      message: 'Your email address?'
    },
    {
      type: 'input',
      name: 'website',
      message: 'Your website URL?'
    },
    {
      type: 'input',
      name: 'source',
      message: 'URL where the source is hosted?'
    }
    ];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('addon.xml'),
      this.destinationPath('addon.xml'),
      { props: this.props }
    );
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md')
    );
    this.fs.copyTpl(
      this.templatePath('tests/**'),
      this.destinationPath('tests/')
    );
    this.fs.copyTpl(
      this.templatePath('resources/**'),
      this.destinationPath('resources/')
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
  },
});
