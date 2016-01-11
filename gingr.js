import React from "react";
import ReactDOM from "react-dom";
import DemoBar from './demobar';
import { FormGenerator } from "./src/app";

ReactDOM.render(
  <FormGenerator
    url         = "/ownerForm.json"
    answerData  = {{
        'dropdown': 'option_2'
    }}
    handleSubmit = {function(data){console.log(data)}}/>,
  document.getElementById('form-builder')
)
