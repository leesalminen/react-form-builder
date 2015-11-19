import React from "react";
import ReactDOM from "react-dom";
import DemoBar from './demobar';
import { FormGenerator } from "./src/app";

ReactDOM.render(
  <FormGenerator
    url="/ownerForm.json" />,
  document.getElementById('form-builder')
)
