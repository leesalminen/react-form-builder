import React from 'react';
import SortableItemMixin from 'react-sortable-items/SortableItemMixin';

import HeaderBar from './util/header-bar.jsx';

export default React.createClass({
  mixins: [SortableItemMixin],
  render() {
    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
        }
        <div className="form-group">
          <a target="_blank" href={this.props.data.href}>{this.props.data.content}</a>
        </div>
      </div>
    );
  }
})
