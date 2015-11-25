import React from 'react';
import DynamicOptionList from './dynamic-option-list';
import TextAreaAutosize from 'react-textarea-autosize';
import classNames from 'classnames';

export default class FormElementsEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      element: this.props.element,
      data: this.props.data,
      dirty: false
    }
  }
  toggleRequired() {
    let thisElement = this.state.element;
  }
  editElementProp(elemProperty, targProperty, e) {
    // elemProperty could be content or label
    // targProperty could be value or checked
    let thisElement = this.state.element;

    // Auto update the name field if the user hasn't manually updated it yet
    let nameChanged = _.snakeCase(thisElement.label) !== thisElement.name;

    thisElement[elemProperty] = e.target[targProperty];

    // Change field name automatically
    if (elemProperty === 'label' && !nameChanged) {
      thisElement.name = _.snakeCase(e.target[targProperty]);
    }

    this.setState({
      element: thisElement,
      dirty: true
    }, () => {
      if (targProperty === 'checked') {this.updateElement();};
    });
  }
  updateElement() {
    let thisElement = this.state.element;
    // to prevent ajax calls with no change
    if (this.state.dirty) {
      this.props.updateElement.call(this.props.preview, thisElement);
      this.setState({dirty: false});
    }
  }
  render() {
    let requiredChecked     = _.get(this.props.element, 'required', false);
    let publicChecked       = _.get(this.props.element, 'public', false);
    let cannotRemoveChecked = _.get(this.props.element, 'cannotRemove', false);
    let thisFiles = this.props.files.length ? this.props.files : [];
    if (thisFiles.length < 1 || thisFiles.length > 0 && thisFiles[0].id !== "")
      thisFiles.unshift({id: '', file_name: ''});
    return (
      <div>
        <div className="clearfix">
          <h4 className="pull-left">{this.props.element.text}</h4>
          <i className="pull-right fa fa-times dismiss-edit" onClick={this.props.manualEditModeOff}></i>
        </div>
        { this.props.element.hasOwnProperty('content') &&
          <div className="form-group">
            <label>Text to display:</label>
            <TextAreaAutosize type="text" className="form-control" defaultValue={this.props.element.content} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'content', 'value')} />
          </div>
        }
        { this.props.element.hasOwnProperty('filePath') &&
          <div className="form-group">
            <label>Choose file:</label>
            <select className="form-control" defaultValue={this.props.element.filePath} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'filePath', 'value')}>
              {thisFiles.map(function (file) {
                let this_key = 'file_' + file.id;
                return <option value={file.id} key={this_key}>{file.file_name}</option>;
              })}
            </select>
          </div>
        }
        { this.props.element.hasOwnProperty('href') &&
          <div className="form-group">
            <label>Link to:</label>
            <TextAreaAutosize type="text" className="form-control" defaultValue={this.props.element.href} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'href', 'value')} />
          </div>
        }
        { this.props.element.hasOwnProperty('label') &&
          <div className="form-group">
            <label>Display Label</label>
            <input type="text" className="form-control" defaultValue={this.props.element.label} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'label', 'value')} />
            <br />
            <label>Field Name</label>
            <input type="text" className={classNames({'form-control': true, 'grayed-input': _.snakeCase(this.props.element.label) === this.props.element.name})} defaultValue={this.props.element.name} value={this.state.element.name} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'name', 'value')} />
            <br/>
            <label>
              <input type="checkbox" checked={requiredChecked} value={true} onChange={this.editElementProp.bind(this, 'required', 'checked')} /> Required
            </label>
            <br />
            <label>
              <input type="checkbox" checked={publicChecked} value={true} onChange={this.editElementProp.bind(this, 'public', 'checked')} /> Public
            </label>
          </div>
        }
        {
            this.props.isSuperUser &&
            <div className="form-group">
                <label>
                  <input type="checkbox" checked={cannotRemoveChecked} value={true} onChange={this.editElementProp.bind(this, 'cannotRemove', 'checked')} /> Cannot Remove
                </label>
            </div>
        }
        { this.props.element.hasOwnProperty('step') &&
          <div className="form-group">
            <div className="form-group-range">
              <label>Step</label>
              <input type="number" className="form-control" defaultValue={this.props.element.step} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'step', 'value')} />
            </div>
          </div>
        }
        { this.props.element.hasOwnProperty('minValue') &&
          <div className="form-group">
            <div className="form-group-range">
              <label>Min</label>
              <input type="number" className="form-control" defaultValue={this.props.element.minValue} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'minValue', 'value')} />
              <input type="text" className="form-control" defaultValue={this.props.element.min_label} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'min_label', 'value')} />
            </div>
          </div>
        }
        { this.props.element.hasOwnProperty('maxValue') &&
          <div className="form-group">
            <div className="form-group-range">
              <label>Max</label>
              <input type="number" className="form-control" defaultValue={this.props.element.maxValue} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'maxValue', 'value')} />
              <input type="text" className="form-control" defaultValue={this.props.element.max_label} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'max_label', 'value')} />
            </div>
          </div>
        }
        { this.props.element.hasOwnProperty('defaultValue') &&
          <div className="form-group">
            <label>Default Value</label>
            <input type="text" className="form-control" defaultValue={this.props.element.defaultValue} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'defaultValue', 'value')} />
          </div>
        }
        { this.props.showCorrectColumn && this.props.element.canHaveAnswer && !this.props.element.hasOwnProperty('options') &&
          <div className="form-group">
            <label>Correct Answer</label>
            <input type="text" className="form-control" defaultValue={this.props.element.correct} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'correct', 'value')} />
          </div>
        }
        { this.props.element.hasOwnProperty('options') &&
          <div className="form-group">
            <DynamicOptionList showCorrectColumn={this.props.showCorrectColumn} data={this.props.preview.state.data} updateElement={this.props.updateElement} preview={this.props.preview} element={this.props.element} key={this.props.element.options.length} />
          </div>
        }
        { this.props.element.hasOwnProperty('optionsUrl') &&
            <div className="form-group">
              <label>Options URL</label>
              <input type="text" className="form-control" defaultValue={this.props.element.optionsUrl} onBlur={this.updateElement.bind(this)} onChange={this.editElementProp.bind(this, 'optionsUrl', 'value')} />
            </div>
        }
        <button className="pull-right btn btn-primary" onClick={this.props.manualEditModeOff}>Save</button>
      </div>
    );
  }
}
FormElementsEdit.defaultProps = {
    className: 'edit-element-fields',
    isSuperUser: false
}
