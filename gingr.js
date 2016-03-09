import React from "react";
import ReactDOM from "react-dom";
import DemoBar from './demobar';
import { FormGenerator } from "./src/app";

ReactDOM.render(
  <FormGenerator
    url         = "/ownerForm.json"
    answerData  = {{
        'placeholder_label': 'Name',
        'dropdown': '1'
    }}
    hideEmptyReadOnlyFields = {true}
    readOnly = {true}
    inline = {true}
    requestParams = 'asdf=asdfasdf'
    handleSubmit = {function(data){console.log(data)}}/>,
  document.getElementById('form-builder')
)
