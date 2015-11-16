import React from 'react';
import SortableItemMixin from 'react-sortable-items/SortableItemMixin';
import FormElementMixin from './util/form-element-mixin.jsx';
import Select from 'react-select';

import HeaderBar from './util/header-bar.jsx';
import HeaderLabels from './util/header-labels.jsx';

import ID from '../UUID';

export default React.createClass({
  mixins: [SortableItemMixin, FormElementMixin],
  statics: {
      toolbarEntry: function() {
        return {
          element: 'Tags',
          displayName: 'Tags',
          icon: 'fa fa-tags',
          label: 'Placeholder Label',
          options: [
            {value: 'place_holder_tag_1', label: 'Place holder tag 1', key: 'tags_option_' + ID.uuid()},
            {value: 'place_holder_tag_2', label: 'Place holder tag 2', key: 'tags_option_' + ID.uuid()},
            {value: 'place_holder_tag_3', label: 'Place holder tag 3', key: 'tags_option_' + ID.uuid()}
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

    props.options = options;
    if (!this.props.mutable) {props.value = options[0].text} // to show a sample of what tags looks like
    if (this.props.mutable) {
      props.value = this.state.value;
      props.onChange = this.handleChange;
      props.ref = "child_ref_" + this.props.data.name;
    }
    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar {...this.headerBarProps()} />
        }
        <div className="form-group">
          <HeaderLabels data={this.props.data} mutable={this.props.mutable} />
          <Select {...props} />
        </div>
      </div>
    );
  }
})
