import React from 'react';
import FormElement from './util/form-element.jsx';

import HeaderBar from './util/header-bar.jsx';
import HeaderLabels from './util/header-labels.jsx';

export default class FirstName extends FormElement {
    static toolbarEntry() {
        return {
            element: 'FirstName',
            displayName: 'First Name',
            icon: 'fa fa-male',
            isUnique: true
        };
    }

    static defaultOptions() {
        return {
            label: 'First Name'
        }
    }

    renderComponent() {
        let props = this.baseInputProps();
        props.type = "text";
        props.className = "form-control";

        if (this.props.mutable) {
            props.defaultValue = this.props.defaultValue;
            props.ref = 'input';
        }

        return (<input {...props} />);
    }
}
