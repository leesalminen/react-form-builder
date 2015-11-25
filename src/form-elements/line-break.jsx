import React from 'react';
import FormElement from './util/form-element.jsx';

import HeaderBar from './util/header-bar.jsx';

export default class LineBreak extends FormElement {
  static toolbarEntry() {
    return {
      element: 'LineBreak',
      displayName: 'Line Break',
      static: true,
      hasOptions: false,
      icon: 'fa fa-arrows-h'
    }
  }

  static defaultOptions() {
      return {
          
      }
  }

  render() {
    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar {...this.headerBarProps()} />
        }
        <hr />
      </div>
    );
  }
}
