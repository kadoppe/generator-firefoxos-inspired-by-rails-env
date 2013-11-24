'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var Generator = module.exports = function Generator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.packageJSON = function packageJSON() {
  this.copy('_package.json', 'package.json');
};

Generator.prototype.bower = function bower() {
  this.copy('_bower.json', 'bower.json');
};

Generator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

Generator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
};

Generator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/templates');
};

Generator.prototype.firefoxosBoilerplate = function firefoxosBoilerplate() {
  var dirName = 'firefoxos-boilerplate';
  var files = this.expandFiles('**/*', {
    cwd: this.sourceRoot() + '/' + dirName, dot: true }
  );
  var ignores = [
    '.git',
    'LICENSE',
    'README.md',
  ];

  files.forEach(function(file) {
    if (ignores.indexOf(file) !== -1) {
      return;
    }

    this.copy(dirName + '/' + file, 'app/' + file);
  }, this);
};
