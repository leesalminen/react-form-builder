import React from 'react';
import FormElement from './util/form-element.jsx';

import HeaderBar from './util/header-bar.jsx';

export default class Paragraph extends FormElement {
  static toolbarEntry() {
    return {
      element: 'Paragraph',
      displayName: 'Paragraph',
      icon: 'fa fa-paragraph',
      static: true
    };
  }

  static defaultOptions() {
      return {
          content: 'Placeholder Text...'
      }
  }

  render() {
    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar {...this.headerBarProps()} />
        }
        <p className="static">{this.props.data.content}</p>
      </div>
    );
  }
}
