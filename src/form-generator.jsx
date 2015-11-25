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

  _isIncorrect(item) {
    let incorrect = false;
    if (item.canHaveAnswer) {
      if (item.element === "Checkboxes" || item.element === "RadioButtons") {
        item.options.forEach(option => {
          let $option = ReactDOM.findDOMNode(this.refs[item.name].refs["child_ref_"+option.key]);
          if ((option.hasOwnProperty("correct") && !$option.checked) || (!option.hasOwnProperty("correct") && $option.checked))
            incorrect = true;
        })
      } else {
        let $item = null
        if (item.element === "Rating") {
          $item = {};
          $item.value = this.refs[item.name].refs["child_ref_"+item.name].state.rating;
          if ($item.value.toString() !== item.correct)
            incorrect = true;
        } else {
          if (item.element === "Tags") {
            $item = {};
            $item.value = this.refs[item.name].refs["child_ref_"+item.name].state.value
          } else {
            $item = ReactDOM.findDOMNode(this.refs[item.name].refs["child_ref_"+item.name]);
            $item.value = $item.value.trim();
          }

          if ($item.value.toLowerCase() !== item.correct.trim().toLowerCase())
            incorrect = true;
        }
      }
    }
    return incorrect;
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

        if (self.props.validateForCorrectness && self._isIncorrect(item)) {
          errors.push(item.label + " was answered incorrectly!");
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
      let $form = ReactDOM.findDOMNode(this.refs.form);
      return serializeForm($form, {hash: true})
  }

  submitForm() {
      if (this.props.handleSubmit) {
          this.props.handleSubmit(this.serialize());
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
                self.submitForm();
            }
        });
    } else {
        self.submitForm();
    }
  }

  render() {
    let items = this.state._data.map( item => {
      let props = {
          mutable:          true,
          key:              item.id ? item.id : 'form_'+item.name,
          ref:              item.name,
          data:             item,
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
      }

      // Use the element in custom elements if it's found in there, otherwise use the one in the default FormElements
      let element = _.find(this.props.customElements, (element) => {
          return element.toolbarEntry().element === item.element;
      }) || FormElements[item.element];

      if (element) {
          return React.createElement(
              element,
              props
          );
      } else {
        console.warn('Invalid element type ' + item.element);
      }
    })

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
            {actions}
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
    validateForCorrectness: false,
    submitLabel:            'Submit',
    customElements:         []
};
