/**
* <Form />
*/

import React from 'react';
import ReactDOM from 'react-dom';
import {EventEmitter} from 'fbemitter';
import FormValidator from './form-validator';
import serializeForm from 'form-serialize';
import * as FormElements from './form-elements';

export default class ReactForm extends React.Component {

    constructor(props) {
        super(props);
        this.emitter = new EventEmitter();

        this.state = {
            _data: _.get(props, 'data', [])
        }
    }

    componentDidMount() {
        if (this.props.url !== undefined) {
            $.get(
                this.props.url,
                function(response) {
                    this.setState({
                        _data: response
                    });
                }.bind(this),
                'json'
            );
        }
    }

    _checkboxesDefaultValue(item) {
        let defaultChecked = [];
        item.options.forEach(option => {
            defaultChecked.push(this.props.answerData['option_'+option.key])
        })
        return defaultChecked;
    }

    /**
    * Validate the form and return errors
    * @return {Promise} Resolves an array of error strings.  The array is empty if the form is valid
    */
    validate() {
        let self = this;

        let $form = ReactDOM.findDOMNode(self.refs.form);
        let errors = [];
        let promises = [];

        self.state._data.forEach(item => {
            let $item = self.refs[item.name];

            // Don't validate items that weren't actually rendered (like an admin item on a public form)
            if ($item === undefined) {
                return;
            }

            // Run default required validation, or a custom function if available
            if ($item.props.data.required === true) {
                if (_.isFunction($item.validateRequired)) {
                    let isValid = $item.validateRequired();

                    if (isValid !== true) {
                        errors.push($item.props.data.label + ' is required!');
                    }
                }
            }

            // Handle custom validation
            if (_.isFunction($item.validate)) {
                let isValid = $item.validate();

                // Allow async validation.  Process all promises later if available.
                if (isValid instanceof Promise) {
                    promises.push(isValid);
                } else {
                    if (isValid !== true) {
                        errors.push(isValid);
                    }
                }
            }
        });

        // Resolve all error promises
        return new Promise(function(resolve, reject) {
            Promise.all(promises).then(
                function(values) {
                    _.each(values, function(value) {
                        if (value !== true) {
                            errors.push(value);
                        }
                    });

                    if (errors.length > 0) {
                        if (self.props.handleInvalid) {
                            self.props.handleInvalid(errors);
                        }
                    }

                    // Resolve errors - send back the empty array if no errors
                    resolve(errors);

                    if (self.props.showErrors !== false) {
                        // publish errors, if any
                        self.emitter.emit('formValidation', errors);
                    }
                },
                function(error) {
                    console.error(error);
                }
            );
        });
    }

    /**
    * Serialize the form
    * @return {Object} The serialized form
    */
    serialize() {
        return serializeForm(this.refs.form, {hash: true})
    }

    submitForm(e) {
        if (this.props.handleSubmit) {
            this.props.handleSubmit(e, this.serialize());
        } else {
            let $form = ReactDOM.findDOMNode(this.refs.form);
            $form.submit();
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        let self = this;
        let errors  = [];

        if (self.props.validate !== false) {
            self.validate().then(function(errors) {
                if (errors.length === 0) {
                    self.submitForm(e);
                }
            });
        } else {
            self.submitForm(e);
        }
    }

    render() {
        let items = [];

        this.state._data.forEach( item => {
            if ((item.publicOnly && this.props.isAdmin === true) || (item.adminOnly && this.props.isAdmin !== true)) {
                return;
            }

            // Only show properly tagged elements
            if (this.props.tags.length > 0) {
                if (!item.tags) {
                    return;
                }

                let tags = item.tags.split(',');

                if (_.intersection(this.props.tags, tags).length === 0) {
                    return;
                }
            }

            item.required = item.required || (item.requiredAdmin && this.props.isAdmin === true) || (item.requiredPublic && this.props.isAdmin !== true);

            let props = {
                mutable:    true,
                key:        item.id,
                ref:        item.name,
                data:       item,
                readOnly:   this.props.readOnly
            }

            // Use this.props.answerData if available, otherwise use the item's default value
            let defaultValue = _.get(this.props, ['answerData', item.name], _.get(item, 'defaultValue', false));

            if (defaultValue) {
                props.defaultValue = defaultValue;
            }

            // Attach any additional props necessary here
            switch (item.element) {
                case "Download":
                    props.downloadPath = this.props.downloadPath;
                    break;
                case "Telephone":
                    if (this.props.telephoneFormat) {
                        props.telephoneFormat = this.props.telephoneFormat;
                        props.telephoneFormat = props.telephoneFormat.replace(/[0-9]/g, '9');
                    }
                    break;
            }

            if (item.adminOnly && !this.props.isAdmin) {
                return;
            }

            // Use the element in custom elements if it's found in there, otherwise use the one in the default FormElements
            let element = _.find(this.props.customElements, (element) => {
                return element.toolbarEntry().element === item.element;
            }) || FormElements[item.element];

            if (element) {
                let reactElement = React.createElement(
                    element,
                    props
                );

                if (item.hidden && !this.props.isSuperUser) {
                    items.push(
                        <div className="hidden" key={item.id}>{reactElement}</div>
                    );
                } else {
                    items.push(reactElement);
                }
            } else {
                console.warn('Invalid element type ' + item.element);
            }
        });

        let formTokenStyle = {
            display: 'none'
        }

        let actions = this.props.children ?
        this.props.children : (
            <div className="text-right">
                {
                    this.props.back_action &&
                    <a href={this.props.back_action} className="btn btn-default btn-cancel btn-big"> Cancel</a>
                }
                <input type="submit" className="btn btn-primary btn-big btn-agree" value={this.props.submitLabel} />
            </div>
        );

        return (
            <div>
                <FormValidator emitter={this.emitter} />
                <div className="react-form-builder-form">
                    <form
                        encType   = "multipart/form-data"
                        ref       = "form"
                        action    = {this.props.form_action}
                        onSubmit  = {this.handleSubmit.bind(this)}
                        method    = {this.props.form_method}>
                        { this.props.authenticity_token &&
                            <div style={formTokenStyle}>
                                <input name="utf8" type="hidden" value="&#x2713;" />
                                <input name="authenticity_token" type="hidden" value={this.props.authenticity_token} />
                                <input name="task_id" type="hidden" value={this.props.task_id} />
                            </div>
                        }
                        {items}
                        {!this.props.readOnly && actions}
                    </form>
                </div>
            </div>
        )
    }
}

ReactForm.defaultProps = {
    answerData:             {},
    validate:               true,
    showErrors:             true,
    submitLabel:            'Submit',
    customElements:         [],
    tags:                   [],
    isAdmin:                false, // This is whether or not the user is an admin or not on an app basis
    readOnly:               false, // Whether or not this entire form is read only
};
