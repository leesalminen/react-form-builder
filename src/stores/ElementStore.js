var Reflux = require('reflux');
var ElementActions = require('../actions/ElementActions');

var _data;
var _saveUrl;

var ElementStore = Reflux.createStore({
  init: function() {
    this.listenTo(ElementActions.createElement,     this._create);
    this.listenTo(ElementActions.deleteElement,     this._delete);
    this.listenTo(ElementActions.save,              this.save);
    this.listenTo(ElementActions.updateElements,    this._updateOrder)
  },

  load: function(urlOrData, saveUrl) {

    var self = this;
    _saveUrl = saveUrl;

    if(typeof urlOrData == 'string' || urlOrData instanceof String) {
      $.ajax({
        url: urlOrData,
        success: function(data) {
          _data = data;
          self.trigger(_data);
        }
      })
    } else {
      _data = urlOrData;
      self.trigger(_data);
    }
  },

  _create: function(element) {
    if(element.isUnique) {
      var exists = _.find(_data, {element: element.element});

      if(exists) {
        alert('This field has a unique constraint, and is already in use on this form.');
        console.warn('Unique Field Constraint Violation: ' + element.element);
        return;
      }
    }

    _data.push(element);
    this.trigger(_data);
  },

  _delete: function(element) {
    var index = _data.indexOf(element);
    _data.splice(index, 1);
    this.trigger(_data);
  },

  _updateElements: function(elements) {
    _data = elements;
    this.trigger(_data);
  },

  save: function() {
    if(_saveUrl) {
      $.ajax({
        type: 'POST',
        url: _saveUrl,
        data: {
          task_data: JSON.stringify(_data)
        },
        dataType: 'json',
        success: function(data) {
          console.log('Saved... ', arguments);
        }
      })
    }
  }

});

module.exports = ElementStore;
