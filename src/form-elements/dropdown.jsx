import React from 'react';
import SortableItemMixin from 'react-sortable-items/SortableItemMixin';

import HeaderBar from './util/header-bar.jsx';
import HeaderLabels from './util/header-labels.jsx';

export default React.createClass({
  mixins: [SortableItemMixin],
  render() {
    let props = {};
    props.className = "form-control";
    props.name = this.props.data.name;

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = "child_ref_" + this.props.data.field_name;
    }
    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
        }
        <div className="form-group">
          <HeaderLabels data={this.props.data} mutable={this.props.mutable} />
          <select {...props}>
            {this.props.data.options.map(function (option) {
              let this_key = 'preview_' + option.key;
              return <option value={option.value} key={this_key}>{option.text}</option>;
            })}
          </select>
        </div>
      </div>
    );
  }
})
