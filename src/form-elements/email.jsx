import React from 'react';
import SortableItemMixin from 'react-sortable-items/SortableItemMixin';

import HeaderBar from './util/header-bar.jsx';
import HeaderLabels from './util/header-labels.jsx';

export default React.createClass({
  mixins: [SortableItemMixin],
  getInitialState() {
    return {
      validationMsg: null,
      value: null,
      alternate: null,
    }
  },
  componentDidMount() {
    var self = this;
    var ref  = self.refs['child_ref_' + self.props.data.field_name];

    if(!_.isUndefined(ref) && !_.isUndefined(ref.getDOMNode)) {
      $.getScript("https://demo.gingrapp.com/assets/js/mailgun_validator.js", function() {
        // console.log(self.refs['child_ref_' + self.props.data.field_name].getDOMNode());
        // attach jquery plugin to validate address
        $(ref.getDOMNode()).mailgun_validator({
          api_key: 'pubkey-5ymei-eyi6yy91c2hp87npj9e61e5cv1', // replace this with your Mailgun public API key
          in_progress: self.validation_in_progress,
          success: self.validation_success,
          error: self.validation_error,
        });
      });
    }
  },
  validation_in_progress() {

  },
  validation_success(data) {
    this.setState({
      validationMsg: this.get_suggestion_str(data['is_valid'], data['did_you_mean'])
    })
  },
  validation_error(error_message) {
    this.setState({
      validationMsg: error_message
    })
  },
  populate_email() {
    this.setState({
      value: this.state.alternate,
      validationMsg: null,
      alternate: null
    })
  },
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
  },
  render() {
    let props = {};
    props.type = "email";
    props.className = "form-control";
    props.name = this.props.data.field_name;

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = "child_ref_" + this.props.data.field_name;

      if(!_.isNull(this.state.email)) {
        props.value = this.state.value;
      }

    }

    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
        }
        <div className="form-group">
          <HeaderLabels
            data={this.props.data} />
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
})
