import React from 'react';
import SortableItemMixin from 'react-sortable-items/SortableItemMixin';

import HeaderBar from './util/header-bar.jsx';
import HeaderLabels from './util/header-labels.jsx';

import ID from '../UUID';

export default React.createClass({
  mixins: [SortableItemMixin],
  statics: {
      toolbarEntry: function() {
        return {
          key: 'RadioButtons',
          canHaveAnswer: true,
          name: 'Multiple Choice',
          icon: 'fa fa-dot-circle-o',
          label: 'Placeholder Label',
          field_name: 'radio_buttons_',
          options: [
            {value: 'place_holder_option_1', text: 'Place holder option 1', key: 'radiobuttons_option_' + ID.uuid()},
            {value: 'place_holder_option_2', text: 'Place holder option 2', key: 'radiobuttons_option_' + ID.uuid()},
            {value: 'place_holder_option_3', text: 'Place holder option 3', key: 'radiobuttons_option_' + ID.uuid()}
          ]
        };
      }
  },
  render() {
    let self = this;
    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
        }
        <div className="form-group">
          <HeaderLabels data={this.props.data} mutable={this.props.mutable} />
          {this.props.data.options.map(function (option) {
            let this_key = 'preview_' + option.key;
            let props = {};
            props.name = self.props.data.name;

            props.type = "radio"
            props.value = option.value;
            if (self.props.mutable) {
              props.defaultChecked = (self.props.defaultValue !== undefined && self.props.defaultValue.indexOf(option.value) > -1) ? true : false;
              props.ref = "child_ref_" + option.key;
            }
            return (
              <label className="radio-label" key={this_key}>
                <input {...props} /> {option.text}
              </label>
            )
          })}
        </div>
      </div>
    );
  }
})
