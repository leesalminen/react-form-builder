import React from 'react';
import FormElement from './util/form-element.jsx';

import HeaderBar from './util/header-bar.jsx';
import HeaderLabels from './util/header-labels.jsx';

export default class TextInput extends FormElement {
  static toolbarEntry() {
    return {
      element: 'TextInput',
      displayName: 'Text Input',
      icon: 'fa fa-font'
    };
  }

  static defaultOptions() {
    return {
        label: 'Placeholder Label',
        defaultValue: ''
    };
  }

  renderComponent() {
    let props = this.baseInputProps();
    props.type = "text";
    props.className = "form-control";

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = 'input';
    }
    return (<input {...props} />);
  }
}
