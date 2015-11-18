import React from 'react';
import FormElement from './util/form-element.jsx';

import HeaderBar from './util/header-bar.jsx';
import HeaderLabels from './util/header-labels.jsx';

export default class TextInput extends FormElement {
  static toolbarEntry() {
    return {
      element: 'TextInput',
      displayName: 'Text Input',
      label: 'Placeholder Label',
      icon: 'fa fa-font',
      defaultValue: ''
    };
  }

  render() {
    let props = {};
    props.type = "text";
    props.name = this.props.data.name;
    props.className = "form-control";

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = "child_ref_" + this.props.data.name;
    }
    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar {...this.headerBarProps()} />
        }
        <div className="form-group">
          <HeaderLabels data={this.props.data} mutable={this.props.mutable} />
          <input {...props} />
        </div>
      </div>
    );
  }
}
