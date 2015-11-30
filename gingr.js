import React from "react";
import ReactDOM from "react-dom";
import DemoBar from './demobar';
import { FormGenerator } from "./src/app";

ReactDOM.render(
  <FormGenerator
    url         = "/ownerForm.json"
    readOnly    = {true}
    answerData  = {{
        'email': 'asfs'
    }}/>,
  document.getElementById('form-builder')
)
