import React from 'react';
import FormElement from './util/form-element.jsx';

import HeaderBar from './util/header-bar.jsx';
import HeaderLabels from './util/header-labels.jsx';

import ID from '../UUID';

export default class TrueFalse {
  static toolbarEntry() {
    return {
      element: 'TrueFalse',
      displayName: 'True / False',
      icon: 'fa fa-dot-circle-o',
      label: 'True or False',
      options: [
        {value: '1', label: 'Yes/On', key: 'truefalse_option_' + ID.uuid()},
        {value: '0', label: 'No/Off', key: 'truefalse_option_' + ID.uuid()}
      ]
    };
  }

  render() {
    let self    = this;
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
                <input {...props} /> {option.text}
              </label>
            )
          })}
        </div>
      </div>
    );
  }
}
