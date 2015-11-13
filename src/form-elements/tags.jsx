import React from 'react';
import SortableItemMixin from 'react-sortable-items/SortableItemMixin';
import Select from 'react-select';

import HeaderBar from './util/header-bar.jsx';
import HeaderLabels from './util/header-labels.jsx';

import ID from '../UUID';

export default React.createClass({
  mixins: [SortableItemMixin],
  statics: {
      toolbarEntry: function() {
        return {
          key: 'Tags',
          canHaveAnswer: true,
          name: 'Tags',
          icon: 'fa fa-tags',
          label: 'Placeholder Label',
          field_name: 'tags_',
          options: [
            {value: 'place_holder_tag_1', text: 'Place holder tag 1', key: 'tags_option_' + ID.uuid()},
            {value: 'place_holder_tag_2', text: 'Place holder tag 2', key: 'tags_option_' + ID.uuid()},
            {value: 'place_holder_tag_3', text: 'Place holder tag 3', key: 'tags_option_' + ID.uuid()}
          ]
        };
      }
  },
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
    props.name = this.props.data.name;
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
          <HeaderLabels data={this.props.data} mutable={this.props.mutable} />
          <Select {...props} />
        </div>
      </div>
    );
  }
})
