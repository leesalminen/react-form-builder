import React from 'react';
import Select from 'react-select';
import FormElementWithOptions from './util/form-element-with-options.jsx';

import HeaderBar from './util/header-bar.jsx';
import HeaderLabels from './util/header-labels.jsx';

import ID from '../UUID';

export default class Dropdown extends FormElementWithOptions {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.getOptions   = this.getOptions.bind(this);

        this.state = {
            value: this.parseValue(props.defaultValue)
        };
    }

    static toolbarEntry() {
        return {
            element: 'Dropdown',
            displayName: 'Dropdown',
            icon: 'fa fa-caret-square-o-down'
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

    renderComponent() {
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

        return (
            <Select {...props} />
        );
    }
}
