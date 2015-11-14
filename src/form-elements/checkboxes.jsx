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
          key: 'Checkboxes',
          canHaveAnswer: true,
          name: 'Checkboxes',
          icon: 'fa fa-check-square-o',
          label: 'Placeholder Label',
          field_name: 'checkboxes_',
          options: [
            {value: 'place_holder_option_1', text: 'Place holder option 1', key: 'checkboxes_option_' + ID.uuid()},
            {value: 'place_holder_option_2', text: 'Place holder option 2', key: 'checkboxes_option_' + ID.uuid()},
            {value: 'place_holder_option_3', text: 'Place holder option 3', key: 'checkboxes_option_' + ID.uuid()}
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
            props.name = self.props.data.name; + option.key;

            props.type = "checkbox"
            props.value = option.value;
            if (self.props.mutable) {
              props.defaultChecked = self.props.defaultValue.indexOf(option.value) > -1 ? true : false;
              props.ref = "child_ref_" + option.key;
            }
            return (
              <label className="checkbox-label" key={this_key}>
                <input {...props} /> {option.text}
              </label>
            )
          })}
        </div>
      </div>
    );
  }
})
