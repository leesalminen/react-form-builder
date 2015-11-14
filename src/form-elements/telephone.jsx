import React from 'react';
import SortableItemMixin from 'react-sortable-items/SortableItemMixin';
import FormElementMixin from './util/form-element-mixin.jsx';

import HeaderBar from './util/header-bar.jsx';
import HeaderLabels from './util/header-labels.jsx';

export default React.createClass({
  mixins: [SortableItemMixin, FormElementMixin],
  statics: {
      toolbarEntry: function() {
        return {
          key: 'Telephone',
          canHaveAnswer: true,
          name: 'Telephone',
          label: 'Telephone',
          icon: 'fa fa-phone',
          field_name: 'telephone_'
        };
      }
  },
  componentDidMount() {
    if(this.props.prefs) {
      $(this.refs['child_ref_' + this.props.data.field_name]).mask(this.props.prefs.telephone_format);
    }
  },
  render() {
    let props = {};
    props.type = "telephone";
    props.className = "form-control telephone";
    props.name = this.props.data.name;

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = "child_ref_" + this.props.data.field_name;
    }
    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar {...this.headerBarProps()} />
        }
        <div className="form-group">
          <HeaderLabels data={this.props.data} mutable={this.props.mutable} />
          <input {...props} />
        </div>
      </div>
    );
  }
})
