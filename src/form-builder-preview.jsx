/**
  * <Preview />
  */

import React from 'react';
import Sortable from 'react-sortable-items';
import ElementStore from './stores/ElementStore';
import ElementActions from './actions/ElementActions';
import * as FormElements from './form-elements';
import FormElementsEdit from './form-elements-edit';

export default class FormBuilderPreview extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      errors: []
    }

    var loadData = (this.props.url) ? this.props.url : (this.props.data) ? this.props.data : [];
    var saveUrl = (this.props.saveUrl) ? this.props.saveUrl : '';

    ElementStore.load(loadData, saveUrl);
    ElementStore.listen(this._onChange.bind(this));
  }

  _setValue(text) {
    return text.replace(/[^A-Z0-9]+/ig, "_").toLowerCase();
  }

  updateElement(element) {
    let data = this.state.data;
    let found = false;

    for(var i=0; i < data.length; i++) {
      if (element.id === data[i].id) {
        data[i] = element;
        found = true;
        break;
      }
    }

    if (found) {
      ElementActions.updateElements(data);
    }
  }

  _onChange(data) {
    if (data.error !== undefined) {
      let errors = this.state.errors;
      errors.push(data.error);

      this.setState({
        errors: errors
      });
    } else {

      if (data.length > this.state.data.length) {
        if (data[data.length - 1].hasOptions !== false) {
          this.props.editModeOn.call(this.props.parent, data[data.length - 1]);
        }
      }

      this.setState({
        data: _.cloneDeep(data)
      });
    }
  }

  _onDestroy(item) {
    ElementActions.deleteElement(item);
  }

  dismissErrors(e) {
      e.preventDefault();
      this.setState({errors: []});
  }

  handleSort(orderedIds) {
    let sortedArray = [];
    let data = this.state.data;
    let index = 0;

    for(var i=0; i < data.length; i++) {
      index = orderedIds.indexOf(data[i].id);
      sortedArray[index] = data[i];
    }

    ElementActions.updateElements(sortedArray);
    this.state.data = sortedArray;
  }

  render() {
    let classes = this.props.className;
    if (this.props.editMode) { classes += ' is-editing'; }

    let items = this.state.data.map( item => {
        let props = {
            key:            item.id,
            mutable:        false,
            parent:         this.props.parent,
            editModeOn:     this.props.editModeOn,
            isDraggable:    true,
            sortData:       item.id,
            data:           item,
            _onDestroy:     this._onDestroy
        };

        if (FormElements[item.element] !== undefined) {
            return React.createElement(
                FormElements[item.element],
                props
            );
        } else {
            console.warn('Invalid element type ' + item.element);
        }
    });

    return (
      <div className={classes}>
        { this.state.errors.length > 0 &&
          <div className="alert alert-danger validation-error">
            <div className="clearfix">
              <i className="fa fa-exclamation-triangle pull-left"></i>
              <ul>
                {this.state.errors.map((error, index) => <li key={index}>{error}</li>)}
              </ul>
            </div>
            <div className="clearfix">
              <a className="pull-right btn btn-default btn-sm btn-danger" onClick={this.dismissErrors.bind(this)}>Dismiss</a>
            </div>
          </div>
        }
        <div className="edit-form">
          { this.props.editElement !== null &&
            <FormElementsEdit showCorrectColumn={this.props.showCorrectColumn} files={this.props.files} manualEditModeOff={this.props.manualEditModeOff} preview={this} element={this.props.editElement} updateElement={this.updateElement} />
          }
        </div>
        <Sortable sensitivity={0} key={this.state.data.length} onSort={this.handleSort.bind(this)}>
          {items}
        </Sortable>
      </div>
    )
  }
}

FormBuilderPreview.defaultProps = { showCorrectColumn: false, files: [], editMode: false, editElement: null, className: ''}
