import React from 'react';
import SortableItemMixin from 'react-sortable-items/SortableItemMixin';
import FormElementMixin from './util/form-element-mixin.jsx';

import HeaderBar from './util/header-bar.jsx';
import HeaderLabels from './util/header-labels.jsx';

import ID from '../UUID';

export default React.createClass({
  mixins: [SortableItemMixin, FormElementMixin],
  statics: {
      toolbarEntry: function() {
        return {
          element: 'RadioButtons',
          displayName: 'Multiple Choice',
          icon: 'fa fa-dot-circle-o',
          label: 'Placeholder Label',
          options: [
            {value: 'place_holder_option_1', label: 'Place holder option 1', key: 'radiobuttons_option_' + ID.uuid()},
            {value: 'place_holder_option_2', label: 'Place holder option 2', key: 'radiobuttons_option_' + ID.uuid()},
            {value: 'place_holder_option_3', label: 'Place holder option 3', key: 'radiobuttons_option_' + ID.uuid()}
          ]
        };
      }
  },
  render() {
    let self = this;
    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar {...this.headerBarProps()} />
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
                <input {...props} /> {option.label}
              </label>
            )
          })}
        </div>
      </div>
    );
  }
})
