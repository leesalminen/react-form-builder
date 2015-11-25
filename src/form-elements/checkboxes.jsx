import React from 'react';
import FormElement from './util/form-element.jsx';

import HeaderBar from './util/header-bar.jsx';
import HeaderLabels from './util/header-labels.jsx';

import ID from '../UUID';

export default class Checkboxes extends FormElement {
  static toolbarEntry() {
    return {
      element: 'Checkboxes',
      displayName: 'Checkboxes',
      icon: 'fa fa-check-square-o'
    };
  }

  static defaultOptions() {
      return {
          label: 'Placeholder Label',
          options: [
            {value: 'place_holder_option_1', label: 'Place holder option 1'},
            {value: 'place_holder_option_2', label: 'Place holder option 2'},
            {value: 'place_holder_option_3', label: 'Place holder option 3'}
          ]
      }
  }

  validateRequired() {
    for (let refName in this.refs) {
      if (refName.indexOf('option_') === 0) {
          if (this.refs[refName].checked) {
              return true;
          }
      }
    }

    return false;
  }

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
            let props = this.baseInputProps();
            props.name   = props.name + '[]';
            props.htmlId = props.htmlId + '_' + option.value;

            props.type = "checkbox"
            props.value = option.value;
            if (self.props.mutable) {
              let defaultValue = _.get(self.props, 'defaultValue', []);
              props.defaultChecked = defaultValue.indexOf(option.value) > -1;
              props.ref = "option_" + option.value;
            }
            return (
              <label className="checkbox-label" key={option.value}>
                <input {...props} /> {option.label}
              </label>
            )
          })}
        </div>
      </div>
    );
  }
}
