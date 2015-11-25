import React from 'react';
import FormElement from './util/form-element.jsx';

import HeaderBar from './util/header-bar.jsx';
import HeaderLabels from './util/header-labels.jsx';

export default class TextArea extends FormElement {
  static toolbarEntry() {
    return {
      element: 'TextArea',
      displayName: 'Multi-line Input',
      icon: 'fa fa-text-height'
    };
  }

  static defaultOptions() {
      return {
          label: 'Placeholder Label'
      }
  }

  render() {
    let props = this.baseInputProps();
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
          <textarea {...props} />
        </div>
      </div>
    );
  }
}
