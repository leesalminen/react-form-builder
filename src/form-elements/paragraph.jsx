import React from 'react';
import SortableItemMixin from 'react-sortable-items/SortableItemMixin';

import HeaderBar from './util/header-bar.jsx';

export default React.createClass({
  mixins: [SortableItemMixin],
  statics: {
      toolbarEntry: function() {
        return {
          key: 'Paragraph',
          name: 'Paragraph',
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
          <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
        }
        <p className="static">{this.props.data.content}</p>
      </div>
    );
  }
})
