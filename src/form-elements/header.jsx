import React from 'react';
import SortableItemMixin from 'react-sortable-items/SortableItemMixin';
import FormElementMixin from './util/form-element-mixin.jsx';

import HeaderBar from './util/header-bar.jsx';

export default React.createClass({
  mixins: [SortableItemMixin, FormElementMixin],
  statics: {
      toolbarEntry: function() {
        return {
          key: 'Header',
          name: 'Header Text',
          icon: 'fa fa-header',
          static: true,
          content: 'Placeholder Text...'
        };
      }
  },
  render() {
    let headerClasses = 'dynamic-input ' + this.props.data.element + '-input';
    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar {...this.headerBarProps()} />
        }
        <h3 className="static">{this.props.data.content}</h3>
      </div>
    );
  }
})
