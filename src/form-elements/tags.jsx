import React from 'react';
import FormElement from './util/form-element.jsx';
import Select from 'react-select';

import HeaderBar from './util/header-bar.jsx';
import HeaderLabels from './util/header-labels.jsx';

import ID from '../UUID';

export default class Tags extends FormElement {
  constructor(props) {
      super(props);

      this.handleChange = this.handleChange.bind(this);

      this.state = {
          value: this.props.defaultValue !== undefined ? this.props.defaultValue.split(",") : []
      };
  }

  static toolbarEntry() {
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

  handleChange(e) {
    this.setState({value: e});
  }

  validateRequired() {
      return (this.refs.input.state.value.length > 0);
  }

  render() {
    let options = this.props.data.options.map( option => {
      option.label = option.text;
      return option;
    });

    let props = this.baseInputProps;
    props.multi = true;

    props.options = options;
    if (!this.props.mutable) {props.value = options[0].text} // to show a sample of what tags looks like
    if (this.props.mutable) {
      props.value = this.state.value;
      props.onChange = this.handleChange;
      props.ref = 'input';
    }
    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar {...this.headerBarProps()} />
        }
        <div className="form-group">
          <HeaderLabels {...this.headerLabelProps()} />
          <Select {...props} />
        </div>
      </div>
    );
  }
}
