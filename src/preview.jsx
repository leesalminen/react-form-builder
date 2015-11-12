/**
  * <Preview />
  */

import React from 'react';
import Sortable from 'react-sortable-items';
import ElementStore from './stores/ElementStore';
import ElementActions from './actions/ElementActions';
import {Header,Paragraph,LineBreak,TextInput,FirstName,TextArea,Dropdown,Checkboxes,DatePicker,RadioButtons,TrueFalse,Rating,Tags,Signature,HyperLink,Download,Camera,Range,Email,Telephone} from './form-elements';
import FormElementsEdit from './form-elements-edit';

export default class Preview extends React.Component {

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
      this.setState({
        data: data
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
      switch (item.element) {
        case "Header":
          return <Header mutable={false} parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
        case "Paragraph":
          return <Paragraph mutable={false} parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
        case "LineBreak":
          return <LineBreak mutable={false} parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
        case "TextInput":
          return <TextInput mutable={false} parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
        case "FirstName":
          return <FirstName mutable={false} parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
        case "TextArea":
          return <TextArea mutable={false} parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
        case "Dropdown":
          return <Dropdown mutable={false} parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
        case "Checkboxes":
          return <Checkboxes mutable={false} parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
        case "DatePicker":
          return <DatePicker mutable={false} parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
        case "RadioButtons":
          return <RadioButtons mutable={false} parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
        case "Rating":
          return <Rating mutable={false} parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
        case "Tags":
          return <Tags mutable={false} parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
        case "Signature":
          return <Signature mutable={false} parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
        case "HyperLink":
          return <HyperLink mutable={false} parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
        case "Download":
          return <Download mutable={false} parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
        case "Camera":
          return <Camera mutable={false} parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
        case "Range":
          return <Range mutable={false} parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
        case "TrueFalse":
          return <TrueFalse mutable={false} parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
        case "Email":
          return <Email mutable={false} parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
        case "Telephone":
          return <Telephone mutable={false} parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} _onDestroy={this._onDestroy} />
        default:
          console.error('Form element type ' + item.element + ' does not exist')
          return null
      }
    })
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
Preview.defaultProps = { showCorrectColumn: false, files: [], editMode: false, editElement: null, className: ''}
