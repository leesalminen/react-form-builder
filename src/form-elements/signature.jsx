import React from 'react';
import SortableItemMixin from 'react-sortable-items/SortableItemMixin';
import SignaturePad from 'react-signature-pad';

import HeaderBar from './util/header-bar.jsx';
import HeaderLabels from './util/header-labels.jsx';

export default React.createClass({
  mixins: [SortableItemMixin],
  componentDidMount() {
    if (this.props.defaultValue !== undefined && this.props.defaultValue.length > 0) {
      let canvas = this.refs['canvas_'+this.props.data.field_name];
      canvas.fromDataURL('data:image/png;base64,' + this.props.defaultValue);
    }
  },
  render() {
    let props = {};
    props.type = "hidden";
    props.name = this.props.data.field_name;

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = "child_ref_" + this.props.data.field_name;
    }
    let pad_props = {};
    pad_props.clearButton = {true};
    if (this.props.mutable) {
      pad_props.defaultValue = this.props.defaultValue;
      pad_props.ref = 'canvas_'+this.props.data.field_name;
    }
    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
        }
        <div className="form-group">
          <HeaderLabels data={this.props.data} mutable={this.props.mutable} />
          <SignaturePad {...pad_props} />
          <input {...props} />
        </div>
      </div>
    );
  }
})
