import React from 'react';
import SortableItemMixin from 'react-sortable-items/SortableItemMixin';

import HeaderBar from './util/header-bar.jsx';
import HeaderLabels from './util/header-labels.jsx';

export default React.createClass({
  mixins: [SortableItemMixin],
  componentDidMount() {
    if(this.props.prefs) {
      $(this.refs['child_ref_' + this.props.data.field_name]).mask(this.props.prefs.telephone_format);
    }
  },
  render() {
    let props = {};
    props.type = "telephone";
    props.className = "form-control telephone";
    props.name = this.props.data.field_name;

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
          <HeaderLabels
            mutable={this.props.mutable}
            data={this.props.data} />
          <input {...props} />
        </div>
      </div>
    );
  }
})
