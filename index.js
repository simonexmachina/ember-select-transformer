/* jshint node: true */
var path = require('path');

var EmberAddon = function() {};

EmberAddon.prototype.treeFor = function treeFor(type) {
  if (type == 'app') {
    var tree = path.join('node_modules', 'ember-select-transformer', 'ember-addon');
    return unwatchedTree(tree);
	}
  else if (type == 'vendor') {
    var tree = path.join('node_modules', 'ember-select-transformer', 'node_modules');
    return unwatchedTree(tree);
  }
};

EmberAddon.prototype.included = function included(app) {
  this.app = app;
  this.app.import('vendor/select-transformer/dist/named-amd/main.js', {
    exports: {
      'select-transformer': ['default']
    }
  });
  this.app.import('vendor/select-transformer/assets/default.css');
};

function unwatchedTree(dir) {
  return {
    read:    function() { return dir; },
    cleanup: function() { }
  };
}

module.exports = EmberAddon;
