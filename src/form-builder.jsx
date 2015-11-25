/**
  * <ReactFormBuilder />
  */

import React from 'react';
import FormBuilderPreview from './form-builder-preview'
import Toolbar from './toolbar'
import ElementActions from './actions/ElementActions';

export default class FormBuilder extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editElement: null
    }
    document.addEventListener("click", this.editModeOff.bind(this));
  }

  editModeOn(data, e) {
    if (e) {
        e.stopPropagation();
    }

    if (this.state.editMode) {
      this.setState({editMode: !this.state.editMode, editElement: null});
    } else {
      this.setState({editMode: !this.state.editMode, editElement: data});
    }
  }

  manualEditModeOff() {
    if (this.state.editMode) {
      this.setState({
        editMode: false,
        editElement: null
      });
    }
  }

  editModeOff(e) {
    const $menu = $(".edit-form");
    let click_is_outside_menu = (!$menu.is(e.target) && $menu.has(e.target).length === 0);

    if (this.state.editMode && click_is_outside_menu) {
      this.setState({
        editMode: false,
        editElement: null
      });
    }
  }

  render() {
    let toolbarProps = {};
    if (this.props.toolbarItems)
      toolbarProps.items = this.props.toolbarItems;
    return (
      <div>
        <div className="react-form-builder clearfix">
          <div>
            <div className="react-form-builder-preview pull-left">
              <FormBuilderPreview
                  files             = {this.props.files}
                  manualEditModeOff = {this.manualEditModeOff.bind(this)}
                  parent            = {this}
                  url               = {this.props.url}
                  saveUrl           = {this.props.saveUrl}
                  customElements    = {this.props.customElements}
                  editModeOn        = {this.editModeOn}
                  editMode          = {this.state.editMode}
                  editElement       = {this.state.editElement} />
              <div className="text-right">
                <button className="btn btn-primary btn-big btn-agree" onClick={ElementActions.save}>Save</button>
              </div>
            </div>
            <Toolbar {...toolbarProps} />
          </div>
        </div>
      </div>
    );
  }

}

FormBuilder.defaultProps = {customElements: []}
