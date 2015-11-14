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
          key: 'Dropdown',
          canHaveAnswer: true,
          name: 'Dropdown',
          icon: 'fa fa-caret-square-o-down',
          label: 'Placeholder Label',
          field_name: 'dropdown_',
          options: [
            {value: '', text: '', key: 'dropdown_option_' + ID.uuid()},
            {value: '', text: '', key: 'dropdown_option_' + ID.uuid()},
            {value: '', text: '', key: 'dropdown_option_' + ID.uuid()}
          ]
        };
      }
  },
  render() {
    let props = {};
    props.className = "form-control";
    props.name = this.props.data.name;

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = "child_ref_" + this.props.data.field_name;
    }
    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar {...this.headerBarProps()} />
        }
        <div className="form-group">
          <HeaderLabels data={this.props.data} mutable={this.props.mutable} />
          <select {...props}>
            {this.props.data.options.map(function (option) {
              let this_key = 'preview_' + option.key;
              return <option value={option.value} key={this_key}>{option.text}</option>;
            })}
          </select>
        </div>
      </div>
    );
  }
})
