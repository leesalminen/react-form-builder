import React from "react";
import ReactDOM from "react-dom";
import DemoBar from './demobar';
import FormBuilder from "./src/form-builder";

// Add our stylesheets for the demo.
require('./css/application.css.scss');

ReactDOM.render(
  <FormBuilder.FormBuilder
    saveUrl="/test"/>,
  document.getElementById('form-builder')
)

ReactDOM.render(
  <DemoBar />,
  document.getElementById('demo-bar')
)
