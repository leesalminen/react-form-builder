import React from 'react';
import ReactDOM from 'react-dom';
import FormElement from './util/form-element.jsx';

import SignaturePad from 'react-signature-pad';

import HeaderBar from './util/header-bar.jsx';
import HeaderLabels from './util/header-labels.jsx';

export default class Signature extends FormElement {
  static toolbarEntry() {
    return {
      element: 'Signature',
      displayName: 'Signature',
      icon: 'fa fa-pencil-square-o',
      label: 'Signature'
    };
  }

  validate() {
      let $canvas_sig = this.refs.canvas;
      let base64 = $canvas_sig.toDataURL().replace('data:image/png;base64,', '');
      let isEmpty = $canvas_sig.isEmpty();

      let $input_sig = ReactDOM.findDOMNode(this.refs.input);
      if (isEmpty) {
        $input_sig.value = "";
      } else {
        $input_sig.value = base64;
      }
      return true;
  }

  componentDidMount() {
    if (this.props.defaultValue !== undefined && this.props.defaultValue.length > 0) {
      let canvas = this.refs.canvas;
      canvas.fromDataURL('data:image/png;base64,' + this.props.defaultValue);
    }
  }

  render() {
    let props = this.baseInputProps();
    props.type = "hidden";

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = 'input';
    }
    let pad_props = {};
    pad_props.clearButton = {true};
    if (this.props.mutable) {
      pad_props.defaultValue = this.props.defaultValue;
      pad_props.ref = 'canvas';
    }
    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar {...this.headerBarProps()} />
        }
        <div className="form-group">
          <HeaderLabels {...this.headerLabelProps()} />
          <SignaturePad {...pad_props} />
          <input {...props} />
        </div>
      </div>
    );
  }
}
