import React from 'react';
import FormElementWithOptions from './util/form-element-with-options.jsx';

import HeaderBar from './util/header-bar.jsx';
import HeaderLabels from './util/header-labels.jsx';

import ID from '../UUID';

export default class Checkboxes extends FormElementWithOptions {
    static toolbarEntry() {
        return {
            element: 'Checkboxes',
            displayName: 'Checkboxes',
            icon: 'fa fa-check-square-o'
        };
    }

    static defaultOptions() {
        return {
            label: 'Placeholder Label',
            multiple: true,
            options: [
                {value: 'place_holder_option_1', label: 'Place holder option 1', key: 'option_' + ID.uuid()},
                {value: 'place_holder_option_2', label: 'Place holder option 2', key: 'option_' + ID.uuid()},
                {value: 'place_holder_option_3', label: 'Place holder option 3', key: 'option_' + ID.uuid()}
            ]
        }
    }

    validateRequired() {
        for (let refName in this.refs) {
            if (refName.indexOf('option_') === 0) {
                if (this.refs[refName].checked) {
                    return true;
                }
            }
        }

        return false;
    }

    renderComponent() {
        let self            = this;

        return (
            self.props.data.options.map(function (option) {
                // Do this in the loop since we modify props for each item
                let props           = self.baseInputProps();
                let defaultValue    = _.get(props, 'defaultValue', _.get(props, 'value', []));
                props.name          = props.name + '[]';
                props.htmlId        = props.htmlId + '_' + option.value;

                props.type = "checkbox";

                if (self.props.mutable) {
                    props.defaultChecked = defaultValue.indexOf(option.value) > -1;
                } else {
                    props.checked        = defaultValue.indexOf(option.value) > -1;
                }
                props.ref = "option_" + option.value;

                return (
                    <label className="checkbox-label" key={option.value}>
                        <input {...props} value={option.value}/> {option.label}
                        </label>
                    )
                })
            );
        }
    }
