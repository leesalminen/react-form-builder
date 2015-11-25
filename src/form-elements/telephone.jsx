import React from 'react';
import FormElement from './util/form-element.jsx';
import MaskedInput from 'react-input-mask';

import HeaderBar from './util/header-bar.jsx';
import HeaderLabels from './util/header-labels.jsx';

export default class Telephone extends FormElement {
  static toolbarEntry() {
    return {
      element: 'Telephone',
      displayName: 'Telephone',
      icon: 'fa fa-phone'
    };
  }

  static defaultOptions() {
      return {
          label: 'Telephone'
      }
  }

  render() {
    let props = this.baseInputProps();
    props.type = "telephone";
    props.className = "form-control telephone";
    props.mask = _.get(this.props.data, 'telephoneFormat', this.props.telephoneFormat);

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
          <MaskedInput {...props} />
        </div>
      </div>
    );
  }
}

Telephone.defaultProps = _.extend(
    Telephone.defaultProps,
    {
        telephoneFormat: '(999) 999-9999'
    }
);
