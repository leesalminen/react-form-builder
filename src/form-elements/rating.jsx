import React from 'react';
import FormElement from './util/form-element.jsx';

import StarRating from 'react-star-rating';

import HeaderBar from './util/header-bar.jsx';
import HeaderLabels from './util/header-labels.jsx';

export default class Rating extends FormElement {
  static toolbarEntry() {
    return {
      element: 'Rating',
      displayName: 'Rating',
      label: 'Placeholder Label',
      icon: 'fa fa-star'
    };
  }

  validateRequired() {
    return this.refs.input.state.rating !== 0;
  }

  render() {
    let props = {};
    props.name = this.props.data.name;
    props.ratingAmount = 5;

    if (this.props.mutable) {
      props.rating = (this.props.defaultValue !== undefined && this.props.defaultValue.length) ? parseFloat(this.props.defaultValue, 10) : 0;
      props.editing = true;
      props.ref = 'input';
    }
    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar {...this.headerBarProps()} />
        }
        <div className="form-group">
          <HeaderLabels data={this.props.data} mutable={this.props.mutable} />
          <StarRating {...props} />
        </div>
      </div>
    );
  }
}
