import React from 'react';
import FormElement from './util/form-element.jsx';

import HeaderBar from './util/header-bar.jsx';

export default class Download extends FormElement {
  static toolbarEntry() {
    return {
      element: 'Download',
      displayName: 'File Attachment',
      icon: 'fa fa-file',
      static: true
    };
  }

  static defaultOptions() {
      return {
          content: 'Placeholder file name ...',
          filePath: '',
          _href: ''
      }
  }

  render() {
    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar {...this.headerBarProps()} />
        }
        <div className="form-group">
          <a href={this.props.downloadPath + '?id=' + this.props.data.filePath}>{this.props.data.content}</a>
        </div>
      </div>
    );
  }
}
