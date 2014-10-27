/* jshint node: true */
var path = require('path');

module.exports = {
  name: 'ember-select-transformer',
  treeFor: function(type) {
    if (type === 'vendor') {
      return this.treeGenerator(path.join(__dirname, 'node_modules'));
    }
    else {
      return this._treeFor(type);
    }
  },
  included: function(app) {
    this._super.included(app);

    this.app.import('vendor/select-transformer/dist/named-amd/main.js', {
      exports: {
        'select-transformer': ['default']
      }
    });
    this.app.import('vendor/select-transformer/assets/default.css');
  }
};
