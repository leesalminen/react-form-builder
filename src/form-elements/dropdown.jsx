import React from 'react';
import Select from 'react-select';
import FormElement from './util/form-element.jsx';

import HeaderBar from './util/header-bar.jsx';
import HeaderLabels from './util/header-labels.jsx';

import ID from '../UUID';

export default class Dropdown extends FormElement {
  constructor(props) {
      super(props);

      this.handleChange = this.handleChange.bind(this);
      this.getOptions   = this.getOptions.bind(this);

      this.state = {
          value: this.props.defaultValue !== undefined ? this.props.defaultValue.split(",") : []
      };
  }

  static toolbarEntry() {
    return {
      element: 'Dropdown',
      displayName: 'Dropdown',
      icon: 'fa fa-caret-square-o-down',
      label: 'Placeholder Label',
      options: [
        {value: 'option1', label: 'Option 1', key: 'option_' + ID.uuid()},
        {value: 'option2', label: 'Option 2', key: 'option_' + ID.uuid()},
        {value: 'option3', label: 'Option 3', key: 'option_' + ID.uuid()}
      ],
      optionsUrl: ''
    };
  }

  handleChange(value) {
      this.setState({
          value: value
      });
  }

  validateRequired() {
      return (this.refs.input.state.value.length > 0);
  }

  getOptions(input, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', encodeURI(this.props.data.optionsUrl));
    xhr.onload = function() {
      if (xhr.status === 200) {
        callback(null,
            {
                options: JSON.parse(xhr.responseText),
                complete: true
            }
        );
      }
      else {
        callback('Error retrieving async options');
      }
    };
    xhr.send();
  }

  render() {
    let props = this.baseInputProps();

    if (this.props.data.optionsUrl) {
      props.asyncOptions = this.getOptions;
    } else{
      props.options = this.props.data.options;
    }

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = 'input';
      props.value = this.state.value;
      props.onChange = this.handleChange;
    }

    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar {...this.headerBarProps()} />
        }
        <div className="form-group">
          <HeaderLabels {...this.headerLabelProps()} />
          <Select
            {...props} />
        </div>
      </div>
    );
  }
}
