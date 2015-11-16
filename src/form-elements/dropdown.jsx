import React from 'react';
import Select from 'react-select';
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
            {value: 'option1', label: 'Option 1', key: 'dropdown_option_' + ID.uuid()},
            {value: 'option2', label: 'Option 2', key: 'dropdown_option_' + ID.uuid()},
            {value: 'option3', label: 'Option 3', key: 'dropdown_option_' + ID.uuid()}
          ],
          optionsUrl: ''
        };
      }
  },
  getInitialState() {
    return {value: this.props.defaultValue !== undefined ? this.props.defaultValue.split(",") : []};
  },
  handleChange(value) {
      this.setState({
          value: value
      });
  },
  getOptions(input, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', encodeURI(this.props.data.optionsUrl));
    xhr.onload = function() {
      if (xhr.status === 200) {
        callback(null,
            {
                options: JSON.parse(xhr.responseText),
                complete: true
            }
        );
      }
      else {
        callback('Error retrieving async options');
      }
    };
    xhr.send();
  },
  render() {
    let props = {};
    props.name = this.props.data.name;

    if (this.props.data.optionsUrl) {
      props.asyncOptions = this.getOptions;
    } else{
      props.options = this.props.data.options;
    }

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = "child_ref_" + this.props.data.field_name;
      props.value = this.state.value;
      props.onChange = this.handleChange;
    }

    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar {...this.headerBarProps()} />
        }
        <div className="form-group">
          <HeaderLabels data={this.props.data} mutable={this.props.mutable} />
          <Select
            {...props} />
        </div>
      </div>
    );
  }
})
