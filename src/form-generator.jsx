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
  }

  _checkboxesDefaultValue(item) {
    let defaultChecked = [];
    item.options.forEach(option => {
      defaultChecked.push(this.props.answer_data['option_'+option.key])
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

  _isInvalid(item) {
    let invalid = false;
    if (item.required === true) {
      if (item.element === "Checkboxes" || item.element === "RadioButtons") {
        let checked_options = 0;
        item.options.forEach(option => {
          let $option = ReactDOM.findDOMNode(this.refs[item.name].refs["child_ref_"+option.key]);
          if ($option.checked)
            checked_options += 1;
        })
        if (checked_options < 1)
          // errors.push(item.label + " is required!");
          invalid = true;
      } else {
        let $item = null
        if (item.element === "Rating") {
          $item = {};
          $item.value = this.refs[item.name].refs["child_ref_"+item.name].state.rating;
          if ($item.value === 0)
            invalid = true;
        } else {
          if (item.element === "Tags" || item.element === "Dropdown") {
            $item = {};
            $item.value = this.refs[item.name].refs["child_ref_"+item.name].state.value
          } else {
            $item = ReactDOM.findDOMNode(this.refs[item.name].refs["child_ref_"+item.name]);
            $item.value = $item.value.trim();
          }

          if ($item.value.length < 1)
            invalid = true;
        }
      }
    }
    return invalid;
  }

  _getSignatureImg(item) {
    let $canvas_sig = this.refs[item.name].refs["canvas_"+item.name]
    let base64 = $canvas_sig.toDataURL().replace('data:image/png;base64,', '');
    let isEmpty = $canvas_sig.isEmpty();
    let $input_sig = ReactDOM.findDOMNode(this.refs[item.name].refs["child_ref_"+item.name]);
    if (isEmpty) {
      $input_sig.value = "";
    } else {
      $input_sig.value = base64;
    }
    return true;
  }

  /**
   * Validate the form and return errors
   * @return {Array} An array of errors
   */
  validate() {
      let $form = ReactDOM.findDOMNode(this.refs.form);
      let errors = [];
      this.props.data.forEach(item => {
        if (item.element === "Signature")
          this._getSignatureImg(item);

        if (this._isInvalid(item))
          errors.push(item.label + " is required!");

        if (this.props.validateForCorrectness && this._isIncorrect(item))
          errors.push(item.label + " was answered incorrectly!");
      });

      if (errors.length > 0) {
          if (this.props.handleInvalid) {
              this.props.handleInvalid(errors);
          }
      }

      if (this.props.showErrors !== false) {
          // publish errors, if any
          this.emitter.emit('formValidation', errors);
      }

      return errors;
  }

  /**
   * Serialize the form
   * @return {Object} The serialized form
   */
  serialize() {
      let $form = ReactDOM.findDOMNode(this.refs.form);
      return serializeForm($form, {hash: true})
  }

  handleSubmit(e) {
    e.preventDefault();

    var errors  = [];

    if (this.props.validate !== false) {
        errors = this.validate();
    }

    var isValid = errors.length < 1;

    if (isValid) {
        if (this.props.handleSubmit) {
            this.props.handleSubmit(this.serialize());
        } else {
            let $form = ReactDOM.findDOMNode(this.refs.form);
            $form.submit();
        }
    }
  }

  render() {
    let items = this.props.data.map( item => {
      let props = {
          mutable:          true,
          key:              'form_'+item.name,
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

      if (FormElements[item.element] !== undefined) {
          return React.createElement(
              FormElements[item.element],
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
    answer_data:            {},
    validate:               true,
    showErrors:             true,
    validateForCorrectness: false,
    submitLabel:            'Submit'
};
