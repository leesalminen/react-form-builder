import React from 'react';
import SortableItemMixin from 'react-sortable-items/SortableItemMixin';
import FormElementMixin from './util/form-element-mixin.jsx';

import HeaderBar from './util/header-bar.jsx';

export default React.createClass({
  mixins: [SortableItemMixin, FormElementMixin],
  statics: {
      toolbarEntry: function() {
        return {
          element: 'Paragraph',
          displayName: 'Paragraph',
          static: true,
          icon: 'fa fa-paragraph',
          content: 'Placeholder Text...'
        };
      }
  },
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
})
