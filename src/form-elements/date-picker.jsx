import React from 'react';
import FormElement from './util/form-element.jsx';

import HeaderBar from './util/header-bar.jsx';
import HeaderLabels from './util/header-labels.jsx';

export default class DatePicker extends FormElement {
  static toolbarEntry() {
    return {
      element: 'DatePicker',
      displayName: 'Date',
      icon: 'fa fa-calendar',
      label: 'Placeholder Label'
    };
  }

  render() {
    let props = {};
    props.type = "date";
    props.className = "form-control";
    props.name = this.props.data.name;

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
