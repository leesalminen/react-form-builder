import React from 'react';
import FormElement from './util/form-element.jsx';

import HeaderBar from './util/header-bar.jsx';

export default class Header extends FormElement {
  static toolbarEntry() {
    return {
      element: 'Header',
      displayName: 'Header Text',
      icon: 'fa fa-header',
      static: true
    };
  }

  static defaultOptions() {
      content: 'Placeholder Text...'
  }

  render() {
    let headerClasses = 'dynamic-input ' + this.props.data.element + '-input';
    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar {...this.headerBarProps()} />
        }
        <h3 className="static">{this.props.data.content}</h3>
      </div>
    );
  }
}
