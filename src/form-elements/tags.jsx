import React from 'react';
import SortableItemMixin from 'react-sortable-items/SortableItemMixin';
import Select from 'react-select';

import HeaderBar from './util/header-bar.jsx';
import HeaderLabels from './util/header-labels.jsx';

export default React.createClass({
  mixins: [SortableItemMixin],
  getInitialState() {
    return {value: this.props.defaultValue !== undefined ? this.props.defaultValue.split(",") : []};
  },
  handleChange(e) {
    this.setState({value: e});
  },
  render() {
    let options = this.props.data.options.map( option => {
      option.label = option.text;
      return option;
    })
    let props = {};
    props.multi = true;
    props.name = this.props.data.field_name;
    props.onChange = this.handleChange;

    props.options = options;
    if (!this.props.mutable) {props.value = options[0].text} // to show a sample of what tags looks like
    if (this.props.mutable) {
      props.value = this.state.value;
      props.ref = "child_ref_" + this.props.data.field_name;
    }
    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
        }
        <div className="form-group">
          <HeaderLabels data={this.props.data} />
          <Select {...props} />
        </div>
      </div>
    );
  }
})
