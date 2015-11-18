import React from 'react';
import FormElement from './util/form-element.jsx';

import HeaderBar from './util/header-bar.jsx';
import HeaderLabels from './util/header-labels.jsx';

export default class TextArea extends FormElement {
  static toolbarEntry() {
    return {
      element: 'TextArea',
      displayName: 'Multi-line Input',
      label: 'Placeholder Label',
      icon: 'fa fa-text-height'
    };
  }

  render() {
    let props = {};
    props.className = "form-control";
    props.name = this.props.data.name;

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
          <HeaderLabels data={this.props.data} mutable={this.props.mutable} />
          <textarea {...props} />
        </div>
      </div>
    );
  }
}
