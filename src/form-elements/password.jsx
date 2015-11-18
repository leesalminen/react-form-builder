import React from 'react';
import FormElement from './util/form-element.jsx';

import HeaderBar from './util/header-bar.jsx';
import HeaderLabels from './util/header-labels.jsx';

export default class Password extends FormElement {
  static toolbarEntry() {
    return {
      element: 'Password',
      displayName: 'Password',
      label: 'Password',
      icon: 'fa fa-key'
    };
  }

  validate() {
      if (this.refs.input.value !== this.refs.confirm.value) {
          return 'Passwords do not match!';
      }

      return true;
  }

  render() {
    let props = this.baseInputProps();
    props.type = "password";
    props.className = "form-control";

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = 'input';
    }

    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar {...this.headerBarProps()} />
        }
        <div className="form-group">
          <HeaderLabels {...this.headerLabelProps()} />
          <input {...props} />
        </div>
        <div className="form-group">
          <HeaderLabels {...this.headerLabelProps()} label={'Confirm ' + this.props.data.label} htmlFor={this.htmlId + '_confirm'} />
          <input id={this.htmlId + '_confirm'} ref="confirm" type="password" className="form-control"/>
        </div>
      </div>
    );
  }
}
