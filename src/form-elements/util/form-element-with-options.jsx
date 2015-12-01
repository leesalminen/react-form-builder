import React from 'react';
import FormElement from './form-element';

export default class FormElementWithOptions extends FormElement {
    parseValue(value) {
        if (_.isString(value)) {
            return value.split(',');
        } else if (_.isArray(value)) {
            return value;
        } else {
            return [];
        }
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

    renderReadOnly() {
        let value = this.parseValue(this.props.defaultValue);

        let selected = _.filter(this.props.data.options, function(option) {
            return value.indexOf(option.value) >= 0;
        });

        if (this.props.multiple === true) {
            return (
                <ul>
                {
                    _.map(selected, function(item) {
                        return <li>{item.label}</li>;
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
