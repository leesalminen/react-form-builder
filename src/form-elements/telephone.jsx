import React from 'react';
import FormElement from './util/form-element.jsx';

import HeaderBar from './util/header-bar.jsx';
import HeaderLabels from './util/header-labels.jsx';

export default class Telephone extends FormElement{
  static toolbarEntry() {
    return {
      element: 'Telephone',
      displayName: 'Telephone',
      label: 'Telephone',
      icon: 'fa fa-phone'
    };
  }

  componentDidMount() {
    if(this.props.prefs) {
      $(this.refs.input).mask(this.props.prefs.telephone_format);
    }
  }

  render() {
    let props = {};
    props.type = "telephone";
    props.className = "form-control telephone";
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
          <input {...props} />
        </div>
      </div>
    );
  }
}
