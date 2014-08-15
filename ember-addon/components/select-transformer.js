/* global Ember */
import SelectTransformer from 'select-transformer';

export default Ember.Select.extend({
  classNames: 'transformer',
  optionLabelPath: 'content.name',
  observeProperties: ['name'],
  didInsertElement: function() {
    this.$().selectTransformer();
    this.addObserver('content.[]', this, update)
    this.get('observeProperties').forEach(function(prop) {
      this.addObserver('content.@each.' + prop, this, update);
    }, this);
    function update() {
      Ember.run.next(this, function() {
        if (this.get('isDestroyed')) return;
        this.$().trigger('change');
      });
    }
  }
});
