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

        // Hold off on setting the value to the default until we have options
        let state = {
                asyncOptionsRetrieved:  false
        };

        if (props.optionsUrl) {
            state.value = this.parseValue(props.defaultValue);
        }

        this.state = _.extend(
            this.state,
            state
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

    getOptions() {
        var xhr = new XMLHttpRequest();

        let url = encodeURI(this.props.data.optionsUrl);

        if (this.props.requestParams) {
            url += (url.indexOf('?') > -1 ? '&' : '?') + this.props.requestParams;
        }

        xhr.open('GET', url);
        xhr.onload = function() {
            if (xhr.status === 200) {
                let options = JSON.parse(xhr.responseText);

                this.setState({
                    asyncOptionsRetrieved:  true,
                    options:                options,
                    value:                  this.parseValue(this.props.defaultValue),
                });
            }
            else {
                console.warn('Error retrieving async options');
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

    componentDidMonut() {
        if (!this.state.asyncOptionsRetrieved && this.props.data.optionsUrl) {
            this.getOptions();
        }
    }

    renderComponent() {
        let props = this.baseInputProps();

        props.options = this.props.data.options;

        props.value = this.state.value;

        if (this.props.mutable) {
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
