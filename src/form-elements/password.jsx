import React from 'react';
import FormElement from './util/form-element.jsx';

import HeaderBar from './util/header-bar.jsx';
import HeaderLabels from './util/header-labels.jsx';

export default class Password extends FormElement {
    static toolbarEntry() {
        return {
            element: 'Password',
            displayName: 'Password',
            icon: 'fa fa-key'
        };
    }

    static defaultOptions() {
        return {
            label: 'Password',
        }
    }

    validate() {
        if (this.refs.input.value !== this.refs.confirm.value) {
            return 'Passwords do not match!';
        }

        return true;
    }

    renderComponent() {
        let props = this.baseInputProps();
        props.type = "password";
        props.className = "form-control";

        if (this.props.mutable) {
            props.defaultValue = this.props.defaultValue;
            props.ref = 'input';
        }

        return (
            <div>
                <div className="form-group">
                    <input {...props} />
                </div>
                <div className="form-group">
                    <label htmlFor={this.htmlId + '_confirm'}>{'Confirm ' + this.props.data.label}</label>
                    <input id={this.htmlId + '_confirm'} ref="confirm" type="password" className="form-control"/>
                </div>
            </div>
        );
    }
}
