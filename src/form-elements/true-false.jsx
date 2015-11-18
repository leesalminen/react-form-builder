import React from 'react';
import FormElement from './util/form-element.jsx';

import RadioButtons from './radio-buttons.jsx';

import ID from '../UUID';

export default class TrueFalse extends FormElement {
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
    return <RadioButtons {...this.props} />
  }
}
