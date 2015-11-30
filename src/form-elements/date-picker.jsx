import React from 'react';
import FormElement from './util/form-element.jsx';

import HeaderBar from './util/header-bar.jsx';
import HeaderLabels from './util/header-labels.jsx';

export default class DatePicker extends FormElement {
    static toolbarEntry() {
        return {
            element: 'DatePicker',
            displayName: 'Date',
            icon: 'fa fa-calendar'
        };
    }

    static defaultOptions() {
        return {
            label: 'Placeholder Label'
        }
    }

    renderComponent() {
        let props = this.baseInputProps();
        props.type = "date";
        props.className = "form-control";

        if (this.props.mutable) {
            props.defaultValue = this.props.defaultValue;
            props.ref = 'input';
        }

        return (
            <input {...props} />
        );
    }
}
