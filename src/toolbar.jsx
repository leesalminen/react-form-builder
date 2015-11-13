/**
  * <Toolbar />
  */

import React from 'react';
import ToolbarItem from './toolbar-item';
import ID from './UUID';
import ElementActions from './actions/ElementActions';
import _ from 'lodash';

import FormElements from './form-elements.jsx';

export default class Toolbar extends React.Component {

  constructor(props) {
    super(props);

    var items = (this.props.items) ? this.props.items : this._defaultItems();

    this.state = {
      items: items
    };
  }

  _defaultItems() {
    return [
        FormElements.Header,
        FormElements.LineBreak,
        FormElements.Paragraph,
        FormElements.TextInput,
        FormElements.TextArea,
        FormElements.FirstName,
        FormElements.Email,
        FormElements.Telephone,
        FormElements.HyperLink,
        FormElements.Dropdown,
        FormElements.Checkboxes,
        FormElements.RadioButtons,
        FormElements.TrueFalse,
        FormElements.Tags,
        FormElements.DatePicker,
        FormElements.Range,
        FormElements.Rating,
        FormElements.Download,
        FormElements.Signature,
        FormElements.Camera
    ]
  }

  _onClick(item) {

    var elementOptions = {
      id:       ID.uuid(),
      element:  item.key,
      text:     item.name,
      static:   item.static,
      required: false
    };

    _.extend(elementOptions, item);

    if (item.field_name) {
      elementOptions['field_name'] = item.field_name + ID.uuid();
    }

    if (item.label) {
      elementOptions['label'] = item.label;
      elementOptions['name']  = _.snakeCase(item.label);
    } else {
        if (elementOptions['field_name']) {
          elementOptions['name'] = elementOptions['field_name'];
        }
    }

    ElementActions.createElement(elementOptions);
  }

  render() {
    return (
      <div className="react-form-builder-toolbar pull-right">
        <h4>Toolbox</h4>
        <ul>
          {
            this.state.items.map(item => {
              let data = item.toolbarEntry();
              return <ToolbarItem data={data} key={data.key} onClick={this._onClick.bind(this, data) } />;
            })
          }
        </ul>
      </div>
    )
  }
}
