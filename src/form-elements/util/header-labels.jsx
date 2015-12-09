import React from 'react';

export default React.createClass({
  render() {
    return (
      <label htmlFor={this.props.htmlFor}>
        {this.props.label}
        { (!this.props.mutable && _.get(this.props.data, 'required', false) === true) &&
          <span className="label-required label label-danger">Required</span>
        }

        { (!this.props.mutable && _.get(this.props.data, 'requiredAdmin', false) === true) &&
          <span className="label-required label label-danger">Required For Admin</span>
        }

        { (!this.props.mutable && _.get(this.props.data, 'requiredPublic', false) === true) &&
          <span className="label-required label label-danger">Required For Public</span>
        }

        { (this.props.mutable && this.props.readOnly !== true && _.get(this.props.data, 'required', false) === true) &&
          <span className="text-red text-danger">*</span>
        }

        { (!this.props.mutable && _.get(this.props.data, 'adminOnly', false) === true) &&
          <span className="label-required label label-success">Admin Only</span>
        }
        { (!this.props.mutable && _.get(this.props.data, 'publicOnly', false) === true) &&
          <span className="label-required label label-success">Public Only</span>
        }
        { (!this.props.mutable && _.get(this.props.data, 'cannotRemove', false) === true) &&
          <span className="label-required label label-warning">Cannot Remove</span>
        }
        { (!this.props.mutable && _.get(this.props.data, 'systemField', false) === true) &&
          <span className="label-required label label-warning">System Field</span>
        }
      </label>
    )
  }
})
