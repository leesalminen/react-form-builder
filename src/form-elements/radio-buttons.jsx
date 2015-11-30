import React from 'react';
import FormElement from './util/form-element.jsx';

import HeaderBar from './util/header-bar.jsx';
import HeaderLabels from './util/header-labels.jsx';

import ID from '../UUID';

export default class RadioButtons extends FormElement {
    static toolbarEntry() {
        return {
            element: 'RadioButtons',
            displayName: 'Multiple Choice',
            icon: 'fa fa-dot-circle-o'
        };
    }

    static defaultOptions() {
        return {
            label: 'Placeholder Label',
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
        let self = this;
        return (
            this.props.data.options.map(function (option) {
                let this_key = 'preview_' + option.key;
                let props = self.baseInputProps();

                props.htmlId += '_' + option.key;
                props.name   = self.props.data.name;

                props.type = "radio"
                props.value = option.value;
                if (self.props.mutable) {
                    let defaultValue = _.get(self.props, 'defaultValue', []);
                    props.defaultChecked = defaultValue.indexOf(option.value) > -1;
                    props.ref = "option_" + option.key;
                }
                return (
                    <label className="radio-label" key={this_key}>
                        <input {...props} /> {option.label}
                        </label>
                    )
                })
            );
        }
    }
