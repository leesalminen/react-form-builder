import React from 'react';
import FormElement from './util/form-element.jsx';

import HeaderBar from './util/header-bar.jsx';
import HeaderLabels from './util/header-labels.jsx';

export default class Email extends FormElement {
  constructor(props) {
    super(props);

    this.state = {
      validationMsg: null,
      value: null,
      alternate: null,
    };

    this.validation_in_progress = this.validation_in_progress.bind(this);
    this.validation_success     = this.validation_success.bind(this);
    this.validation_error       = this.validation_error.bind(this);
    this.get_suggestion_str     = this.get_suggestion_str.bind(this);
  }

  static toolbarEntry() {
    return {
      element: 'Email',
      displayName: 'Email',
      icon: 'fa fa-envelope'
    };
  }

  static defaultOptions() {
      return {
          label: 'Email'
      }
  }

  componentDidMount() {
    var self = this;
    var ref  = self.refs.input;

    if(!_.isUndefined(ref)) {
      $.getScript("https://demo.gingrapp.com/assets/js/mailgun_validator.js", function() {
        // attach jquery plugin to validate address
        $(ref).mailgun_validator({
          api_key: 'pubkey-5ymei-eyi6yy91c2hp87npj9e61e5cv1', // replace this with your Mailgun public API key
          in_progress: self.validation_in_progress,
          success: self.validation_success,
          error: self.validation_error,
        });
      });
    }
  }

  validation_in_progress() {

  }

  validation_success(data) {
    this.setState({
      validationMsg: this.get_suggestion_str(data['is_valid'], data['did_you_mean'])
    })
  }

  validation_error(error_message) {
    this.setState({
      validationMsg: error_message
    })
  }

  populate_email() {
    this.setState({
      value: this.state.alternate,
      validationMsg: null,
      alternate: null
    })
  }

  get_suggestion_str(is_valid, alternate) {
    if (is_valid) {
      var result = '<span class="success">Address is valid.</span>';

      if (alternate) {
        this.setState({
          alternate: alternate
        })
      } else {
        this.setState({
          alternate: null
        })
      }

      return result
    } else if (alternate) {

      this.setState({
        alternate: alternate
      })

      return '';
    } else {
      this.setState({
        alternate: null
      })

      return '<span class="error">Address is invalid.</span>';
    }
  }

  render() {
    let props = this.baseInputProps();
    props.type = "email";
    props.className = "form-control";

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = 'input';

      if(!_.isNull(this.state.email)) {
        props.value = this.state.value;
      }

    }

    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar {...this.headerBarProps()} />
        }
        <div className="form-group">
          <HeaderLabels {...this.headerLabelProps()} />
          <input {...props} />
          {(!_.isNull(this.state.validationMsg)) ?
            <p className="help-block" dangerouslySetInnerHTML={{__html: this.state.validationMsg}}></p>
          : null }
          {(!_.isNull(this.state.alternate) ?
              <p className="help-block">Did you mean <a onClick={this.populate_email}>{this.state.alternate}</a>?</p>
            : null )}
        </div>
      </div>
    );
  }
}
