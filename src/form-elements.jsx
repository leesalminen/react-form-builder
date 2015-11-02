import React from 'react';
import HeaderBar from './header-bar';
import StarRating from 'react-star-rating';
import Select from 'react-select';
import SignaturePad from 'react-signature-pad';
import SortableItemMixin from 'react-sortable-items/SortableItemMixin';
import SliderNativeBootstrap from 'react-bootstrap-native-slider';

let FormElements = {};

let Header = React.createClass({
  mixins: [SortableItemMixin],
  render() {
    let headerClasses = 'dynamic-input ' + this.props.data.element + '-input';
    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
        }
        <h3 className="static">{this.props.data.content}</h3>
      </div>
    );
  }
})

let FormElementLabels = React.createClass({
  render() {
    return (
      <label>
        {this.props.data.label}
        { (!this.props.mutable && this.props.data.hasOwnProperty('required') && this.props.data.required === true) &&
          <span className="label-required label label-danger">Required</span>
        }

        { (this.props.mutable && this.props.data.hasOwnProperty('required') && this.props.data.required === true) &&
          <span className="text-red text-danger">*</span>
        }

        { (!this.props.mutable && this.props.data.hasOwnProperty('public') && this.props.data.public === true) &&
          <span className="label-required label label-success">Public</span>
        }
      </label>
    )
  }
})

let Paragraph = React.createClass({
  mixins: [SortableItemMixin],
  render() {
    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
        }
        <p className="static">{this.props.data.content}</p>
      </div>
    );
  }
})

let LineBreak = React.createClass({
  mixins: [SortableItemMixin],
  render() {
    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
        }
        <hr />
      </div>
    );
  }
})

let TextInput = React.createClass({
  mixins: [SortableItemMixin],
  render() {
    let props = {};
    props.type = "text";
    props.className = "form-control";
    props.name = this.props.data.field_name;

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = "child_ref_" + this.props.data.field_name;
    }
    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
        }
        <div className="form-group">
          <FormElementLabels data={this.props.data} />
          <input {...props} />
        </div>
      </div>
    );
  }
})

let FirstName = React.createClass({
  mixins: [SortableItemMixin],
  render() {
    let props = {};
    props.type = "first_name";
    props.className = "form-control";
    props.name = this.props.data.field_name;

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = "child_ref_" + this.props.data.field_name;
    }
    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
        }
        <div className="form-group">
          <FormElementLabels data={this.props.data} />
          <input {...props} />
        </div>
      </div>
    );
  }
})

let TextArea = React.createClass({
  mixins: [SortableItemMixin],
  render() {
    let props = {};
    props.className = "form-control";
    props.name = this.props.data.field_name;

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = "child_ref_" + this.props.data.field_name;
    }
    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
        }
        <div className="form-group">
          <FormElementLabels data={this.props.data} />
          <textarea {...props} />
        </div>
      </div>
    );
  }
})

let DatePicker = React.createClass({
  mixins: [SortableItemMixin],
  render() {
    let props = {};
    props.type = "date";
    props.className = "form-control";
    props.name = this.props.data.field_name;

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = "child_ref_" + this.props.data.field_name;
    }
    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
        }
        <div className="form-group">
          <input {...props} />
        </div>
      </div>
    );
  }
})

let Dropdown = React.createClass({
  mixins: [SortableItemMixin],
  render() {
    let props = {};
    props.className = "form-control";
    props.name = this.props.data.field_name;

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = "child_ref_" + this.props.data.field_name;
    }
    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
        }
        <div className="form-group">
          <FormElementLabels data={this.props.data} />
          <select {...props}>
            {this.props.data.options.map(function (option) {
              let this_key = 'preview_' + option.key;
              return <option value={option.value} key={this_key}>{option.text}</option>;
            })}
          </select>
        </div>
      </div>
    );
  }
})


let Signature = React.createClass({
  mixins: [SortableItemMixin],
  componentDidMount() {
    if (this.props.defaultValue !== undefined && this.props.defaultValue.length > 0) {
      let canvas = this.refs['canvas_'+this.props.data.field_name];
      canvas.fromDataURL('data:image/png;base64,' + this.props.defaultValue);
    }
  },
  render() {
    let props = {};
    props.type = "hidden";
    props.name = this.props.data.field_name;

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = "child_ref_" + this.props.data.field_name;
    }
    let pad_props = {};
    pad_props.clearButton = {true};
    if (this.props.mutable) {
      pad_props.defaultValue = this.props.defaultValue;
      pad_props.ref = 'canvas_'+this.props.data.field_name;
    }
    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
        }
        <div className="form-group">
          <FormElementLabels data={this.props.data} />
          <SignaturePad {...pad_props} />
          <input {...props} />
        </div>
      </div>
    );
  }
})

let Tags = React.createClass({
  mixins: [SortableItemMixin],
  getInitialState() {
    return {value: this.props.defaultValue !== undefined ? this.props.defaultValue.split(",") : []};
  },
  handleChange(e) {
    this.setState({value: e});
  },
  render() {
    let options = this.props.data.options.map( option => {
      option.label = option.text;
      return option;
    })
    let props = {};
    props.multi = true;
    props.name = this.props.data.field_name;
    props.onChange = this.handleChange;

    props.options = options;
    if (!this.props.mutable) {props.value = options[0].text} // to show a sample of what tags looks like
    if (this.props.mutable) {
      props.value = this.state.value;
      props.ref = "child_ref_" + this.props.data.field_name;
    }
    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
        }
        <div className="form-group">
          <FormElementLabels data={this.props.data} />
          <Select {...props} />
        </div>
      </div>
    );
  }
})

let Checkboxes = React.createClass({
  mixins: [SortableItemMixin],
  render() {
    let self = this;
    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
        }
        <div className="form-group">
          <FormElementLabels data={this.props.data} />
          {this.props.data.options.map(function (option) {
            let this_key = 'preview_' + option.key;
            let props = {};
            props.name = 'option_'+option.key;

            props.type = "checkbox"
            props.value = option.value;
            if (self.props.mutable) {
              props.defaultChecked = self.props.defaultValue.indexOf(option.value) > -1 ? true : false;
              props.ref = "child_ref_" + option.key;
            }
            return (
              <label className="checkbox-label" key={this_key}>
                <input {...props} /> {option.text}
              </label>
            )
          })}
        </div>
      </div>
    );
  }
})

let RadioButtons = React.createClass({
  mixins: [SortableItemMixin],
  render() {
    let self = this;
    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
        }
        <div className="form-group">
          <FormElementLabels data={this.props.data} />
          {this.props.data.options.map(function (option) {
            let this_key = 'preview_' + option.key;
            let props = {};
            props.name = self.props.data.field_name;

            props.type = "radio"
            props.value = option.value;
            if (self.props.mutable) {
              props.defaultChecked = (self.props.defaultValue !== undefined && self.props.defaultValue.indexOf(option.value) > -1) ? true : false;
              props.ref = "child_ref_" + option.key;
            }
            return (
              <label className="radio-label" key={this_key}>
                <input {...props} /> {option.text}
              </label>
            )
          })}
        </div>
      </div>
    );
  }
})

let Rating = React.createClass({
  mixins: [SortableItemMixin],
  render() {
    let props = {};
    props.name = this.props.data.field_name;
    props.ratingAmount = 5;

    if (this.props.mutable) {
      props.rating = (this.props.defaultValue !== undefined && this.props.defaultValue.length) ? parseFloat(this.props.defaultValue, 10) : 0;
      props.editing = true;
      props.ref = "child_ref_" + this.props.data.field_name;
    }
    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
        }
        <div className="form-group">
          <FormElementLabels data={this.props.data} />
          <StarRating {...props} />
        </div>
      </div>
    );
  }
})

let HyperLink = React.createClass({
  mixins: [SortableItemMixin],
  render() {
    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
        }
        <div className="form-group">
          <a target="_blank" href={this.props.data.href}>{this.props.data.content}</a>
        </div>
      </div>
    );
  }
})

let Download = React.createClass({
  mixins: [SortableItemMixin],
  render() {
    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
        }
        <div className="form-group">
          <a href={this.props.download_path + '?id=' + this.props.data.file_path}>{this.props.data.content}</a>
        </div>
      </div>
    );
  }
})

let Camera = React.createClass({
  mixins: [SortableItemMixin],

  getInitialState() {
    return {img: null};
  },

  displayImage(e) {
    var self = this;
    var target = e.target;
    var file, reader;

    if(target.files && target.files.length) {
      file = target.files[0];
      reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = function() {
        self.setState({
          img: reader.result
        });
      }
    }
  },

  clearImage() {
    this.setState({
      img: null
    })
  },

  render() {
    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
        }
        <div className="form-group">
          <FormElementLabels data={this.props.data} />
          <div className="image-upload-container">

            { !this.state.img &&
              <div>
                <input type="file" accept="image/*" capture="camera" className="image-upload" onChange={this.displayImage} />
                <div className="image-upload-control">
                  <div className="btn btn-default btn-school"><i className="fa fa-camera"></i> Upload Photo</div>
                  <p>Select an image from your computer or device.</p>
                </div>
              </div>
            }

            { this.state.img &&
              <div>
                <img src={ this.state.img } height="100" className="image-upload-preview" /><br />
                <div className="btn btn-school btn-image-clear" onClick={this.clearImage}>
                  <i className="fa fa-times"></i> Clear Photo
                </div>
              </div>
            }

          </div>
        </div>
      </div>
    );
  }
})

let Range = React.createClass({
  mixins: [SortableItemMixin],
  render() {
    let props = {};
    props.type = "range";
    props.name = this.props.data.field_name;
    props.list = "tickmarks_" + this.props.data.field_name;
    props.min = this.props.data.min_value;
    props.max = this.props.data.max_value;
    props.step = this.props.data.step;

    props.defaultValue = this.props.defaultValue !== undefined ? parseInt(this.props.defaultValue, 10) : parseInt(this.props.data.default_value, 10);

    if (this.props.mutable) {
      props.ref = "child_ref_" + this.props.data.field_name;
    }

    let datalist = [];
    for (var i=parseInt(this.props.data.min_value, 10); i <= parseInt(this.props.data.max_value, 10); i += parseInt(this.props.data.step, 10)) {
      datalist.push(i);
    }

    let oneBig = 100 / (datalist.length - 1);

    let _datalist = datalist.map((d,idx) => {
      return <option key={props.list+'_'+idx}>{d}</option>
    })

    let visible_marks = datalist.map((d,idx) => {
      let option_props = {};
      let w = oneBig;
      if (idx === 0 || idx === datalist.length-1)
        w = oneBig/2;
      option_props.key = props.list+'_label_'+idx;
      option_props.style = {width: w + '%'};
      if (idx === datalist.length-1)
        option_props.style = {width: w + '%', textAlign: 'right'};
      return <label {...option_props}>{d}</label>
    })

    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
        }
        <div className="form-group">
          <FormElementLabels data={this.props.data} />
          <div className="range">
            <div className="clearfix">
              <span className="pull-left">{this.props.data.min_label}</span>
              <span className="pull-right">{this.props.data.max_label}</span>
            </div>
            <SliderNativeBootstrap
              name={props.name}
              value={props.defaultValue}
              step={this.props.data.step}
              max={this.props.data.max_value}
              min={this.props.data.min_value} />
          </div>
          <div className="visible_marks">
            {visible_marks}
          </div>
          <datalist id={props.list}>
            {_datalist}
          </datalist>
        </div>
      </div>
    );
  }
})

let TrueFalse = React.createClass({
  mixins: [SortableItemMixin],
  render() {
    let self    = this;
    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
        }
        <div className="form-group">
          <FormElementLabels
            data={this.props.data} />
          {this.props.data.options.map(function (option) {
            let this_key = 'preview_' + option.key;
            let props = {};
            props.name = self.props.data.field_name;

            props.type = "radio"
            props.value = option.value;
            if (self.props.mutable) {
              props.defaultChecked = (self.props.defaultValue !== undefined && self.props.defaultValue.indexOf(option.value) > -1) ? true : false;
              props.ref = "child_ref_" + option.key;
            }
            return (
              <label className="radio-label" key={this_key}>
                <input {...props} /> {option.text}
              </label>
            )
          })}
        </div>
      </div>
    );
  }
})

let Email = React.createClass({
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
          <FormElementLabels
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

let Telephone = React.createClass({
  mixins: [SortableItemMixin],
  componentDidMount() {
    if(this.props.prefs) {
      $(this.refs['child_ref_' + this.props.data.field_name]).mask(this.props.prefs.telephone_format);
    }
  },
  render() {
    let props = {};
    props.type = "telephone";
    props.className = "form-control telephone";
    props.name = this.props.data.field_name;

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = "child_ref_" + this.props.data.field_name;
    }
    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
        }
        <div className="form-group">
          <FormElementLabels
            mutable={this.props.mutable}
            data={this.props.data} />
          <input {...props} />
        </div>
      </div>
    );
  }
})



FormElements.Header = Header;
FormElements.Paragraph = Paragraph;
FormElements.LineBreak = LineBreak;
FormElements.FirstName = FirstName;
FormElements.TextInput = TextInput;
FormElements.TextArea = TextArea;
FormElements.Dropdown = Dropdown;
FormElements.Signature = Signature;
FormElements.Checkboxes = Checkboxes;
FormElements.DatePicker = DatePicker;
FormElements.RadioButtons = RadioButtons;
FormElements.Rating = Rating;
FormElements.Tags = Tags;
FormElements.HyperLink = HyperLink;
FormElements.Download = Download;
FormElements.Camera = Camera;
FormElements.Range = Range;
FormElements.TrueFalse = TrueFalse;
FormElements.Email = Email;
FormElements.Telephone = Telephone;

module.exports = FormElements;
