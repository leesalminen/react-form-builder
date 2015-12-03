import React from 'react';
import FormElement from './form-element';

export default class FormElementWithOptions extends FormElement {
    constructor(props) {
        super(props);

        this.state = {
            options: props.data.options
        };
    }

    parseValue(value) {
        if (_.isString(value)) {
            return value.split(',');
        } else if (_.isArray(value)) {
            return value;
        } else {
            return [];
        }
    }

    renderReadOnly() {
        let value = this.parseValue(this.props.defaultValue);

        let selected = _.filter(this.state.options, function(option) {
            return value.indexOf(option.value) >= 0;
        });

        if (this.props.multiple === true) {
            return (
                <ul>
                {
                    _.map(selected, function(item) {
                        return <li key={item.value}>{item.label}</li>;
                    })
                }
                </ul>
            );
        } else {
            if (selected.length > 0) {
                return selected[0].label;
            }
        }
    }
}
