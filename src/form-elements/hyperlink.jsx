import React from 'react';
import FormElement from './util/form-element.jsx';

import HeaderBar from './util/header-bar.jsx';

export default class Hyperlink extends FormElement {
  static toolbarEntry() {
    return {
      element: 'HyperLink',
      displayName: 'Web site',
      icon: 'fa fa-link',
      static: true
    };
  }

  static defaultOptions() {
      return {
          content: 'Placeholder Web site link ...',
          href: 'http://www.example.com'
      }
  }

  render() {
    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar {...this.headerBarProps()} />
        }
        <div className="form-group">
          <a target="_blank" href={this.props.data.href}>{this.props.data.content}</a>
        </div>
      </div>
    );
  }
}
