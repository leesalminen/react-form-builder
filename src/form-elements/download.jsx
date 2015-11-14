import React from 'react';
import SortableItemMixin from 'react-sortable-items/SortableItemMixin';
import FormElementMixin from './util/form-element-mixin.jsx';

import HeaderBar from './util/header-bar.jsx';

export default React.createClass({
  mixins: [SortableItemMixin, FormElementMixin],
  statics: {
      toolbarEntry: function() {
        return {
          key: 'Download',
          name: 'File Attachment',
          icon: 'fa fa-file',
          static: true,
          content: 'Placeholder file name ...',
          field_name: 'download_',
          file_path: '',
          _href: ''
        };
      }
  },
  render() {
    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar {...this.headerBarProps()} />
        }
        <div className="form-group">
          <a href={this.props.download_path + '?id=' + this.props.data.file_path}>{this.props.data.content}</a>
        </div>
      </div>
    );
  }
})
