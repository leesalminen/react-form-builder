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

        this.state = _.extend(
            this.state,
            {
                value:                  this.parseValue(props.defaultValue),
                asyncOptionsRetrieved:  false
            }
        );
    }

    static toolbarEntry() {
        return {
            element: 'Dropdown',
            displayName: 'Dropdown',
            icon: 'fa fa-caret-square-o-down'
        };
    }

    static defaultOptions() {
        return {
            label: 'Placeholder Label',
            options: [
                {value: 'place_holder_option_1', label: 'Place holder option 1', key: 'option_' + ID.uuid()},
                {value: 'place_holder_option_2', label: 'Place holder option 2', key: 'option_' + ID.uuid()},
                {value: 'place_holder_option_3', label: 'Place holder option 3', key: 'option_' + ID.uuid()}
            ],
            optionsUrl: '',
        }
    }

    getOptions(input, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', encodeURI(this.props.data.optionsUrl));
        xhr.onload = function() {
            if (xhr.status === 200) {
                let options = JSON.parse(xhr.responseText);
                if (callback) {
                    callback(null,
                        {
                            options: options,
                            complete: true
                        }
                    );
                }

                this.setState({
                    asyncOptionsRetrieved: true,
                    options: options
                });
            }
            else {
                if (callback) {
                    callback('Error retrieving async options');
                }
            }
        }.bind(this);
        xhr.send();
    }


    handleChange(value) {
        this.setState({
            value: value
        });
    }

    validateRequired() {
        return (this.refs.input.state.value.length > 0);
    }

    renderReadOnly() {
        if (!this.state.asyncOptionsRetrieved && this.props.data.optionsUrl) {
            this.getOptions();
        }

        return super.renderReadOnly();
    }

    renderComponent() {
        let props = this.baseInputProps();

        if (this.props.mutable) {
            if (this.props.data.optionsUrl) {
                props.asyncOptions = this.getOptions;
            } else{
                props.options = this.props.data.options;
            }

            props.defaultValue = this.props.defaultValue;
            props.ref = 'input';
            props.value = this.state.value;
            props.onChange = this.handleChange;
            props.allowCreate = false;

            if(this.props.data.allowCreate) {
                props.allowCreate = true;
            }
        }

        return (
            <Select {...props} />
        );
    }
}
