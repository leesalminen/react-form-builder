import React from 'react';

export default React.createClass({
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
