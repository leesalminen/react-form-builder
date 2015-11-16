import React from "react";
import ReactDOM from "react-dom";
import DemoBar from './demobar';
import Form from "./src/form";

// Add our stylesheets for the demo.
require('./css/application.css.scss');

var formData = [
    {
        "id": "5A909057-A579-4AE4-A1BE-D8E97E2D284C",
        "element": "Dropdown",
        "text": "Dropdown",
        "required": false,
        "key": "Dropdown",
        "canHaveAnswer": true,
        "name": "home_location",
        "icon": "fa fa-caret-square-o-down",
        "label": "Home Location",
        "field_name": "dropdown_306D87A4-B7A0-469E-973D-2251D31C3246",
        "optionsUrl": "/options.json",
        "required": true
    },
    {
        "id": "E81D8B30-300D-43BC-8BF5-E9A99B5A41E7",
        "element": "TextInput",
        "text": "Text Input",
        "required": false,
        "canHaveAnswer": true,
        "field_name": "o_first_FBADB136-78B6-419E-9EC9-6B0105498525",
        "label": "First Name",
        "name": "first_name",
        "public": true,
        "canEdit": false,
        "canRemove": false,
        "mutable": true,
        "defaultValue": "lee"
    },
    {
        "id": "E241298C-DB09-42E5-9C78-9DFD2B97E0B2",
        "element": "TextInput",
        "text": "Text Input",
        "required": false,
        "canHaveAnswer": true,
        "field_name": "o_last_C988EED4-293F-4661-8A08-C5A24E634F2C",
        "label": "Last Name",
        "name": "last_name",
        "public": true,
        "canEdit": false,
        "canRemove": false
    },
    {
        "id": "9DE06D57-4057-4188-9959-99F74C2418FD",
        "element": "TextInput",
        "text": "Text Input",
        "required": false,
        "canHaveAnswer": true,
        "field_name": "o_address_1_4C1F11FD-AC3D-407C-BC90-14569B8D6D2E",
        "label": "Address 1",
        "name": "address_1",
        "public": true,
        "canEdit": false,
        "canRemove": false
    },
    {
        "id": "87C60F24-039F-4EBD-99C2-5FFC6E1BDD6C",
        "element": "TextInput",
        "text": "Text Input",
        "required": false,
        "canHaveAnswer": true,
        "field_name": "o_address_2_1BADAFCF-EDE3-497B-BC6F-57834C78CC4F",
        "label": "Address 2",
        "name": "address_2",
        "public": true,
        "canEdit": true,
        "canRemove": true
    },
    {
        "id": "045E5535-1E9A-4449-8C2B-007EA6980427",
        "element": "TextInput",
        "text": "Text Input",
        "required": false,
        "canHaveAnswer": true,
        "field_name": "o_city_DF36A3A7-830C-4801-BBB9-558161B61367",
        "label": "City",
        "name": "city",
        "public": true,
        "canEdit": false,
        "canRemove": false
    },
    {
        "id": "FE7C6FD8-6C09-4A49-B7D2-D719E57D432D",
        "element": "TextInput",
        "text": "Text Input",
        "required": false,
        "canHaveAnswer": true,
        "field_name": "o_state_BF53FC56-976A-470E-B34B-84B420BB8E66",
        "label": "Region",
        "name": "region",
        "public": true,
        "canEdit": false,
        "canRemove": false
    },
    {
        "id": "0727E1F2-72C4-41EA-9D06-72D0354CD392",
        "element": "TextInput",
        "text": "Text Input",
        "required": false,
        "canHaveAnswer": true,
        "field_name": "o_zip_26C4547A-D22D-40DF-880C-52430795B850",
        "label": "Zip",
        "name": "zip",
        "public": true,
        "canEdit": false,
        "canRemove": false
    },
    {
        "id": "05940808-187E-48EE-928B-D323D1D80B00",
        "element": "Email",
        "text": "Email",
        "required": false,
        "canHaveAnswer": true,
        "field_name": "o_email_0F5AF6AD-0330-4690-B8D5-82A66D98175D",
        "label": "Email",
        "name": "email",
        "public": true,
        "canEdit": false,
        "canRemove": false
    },
    {
        "id": "4AFD78FB-58D9-4C85-B4E2-D53597F8E952",
        "element": "Telephone",
        "text": "Telephone",
        "required": false,
        "canHaveAnswer": true,
        "field_name": "o_home_phone_690E89D5-1E1A-4296-9DC7-D08163505F35",
        "label": "Home Phone",
        "name": "home_phone",
        "public": true,
        "canEdit": true,
        "canRemove": false
    },
    {
        "id": "85CD20FF-20BF-478E-876C-8F448E319F6A",
        "element": "Telephone",
        "text": "Telephone",
        "required": false,
        "canHaveAnswer": true,
        "field_name": "o_cell_phone_21E18592-F20F-4963-B691-7BD79EBEC48E",
        "label": "Cell Phone",
        "name": "cell_phone",
        "public": true,
        "canEdit": true,
        "canRemove": false
    },
    {
        "id": "17B005E8-14DD-4DD0-960F-F477DDB541C7",
        "element": "TextInput",
        "text": "Text Input",
        "required": false,
        "canHaveAnswer": true,
        "field_name": "o_emergency_contact_name_A0235005-CA3F-44C1-B874-80DF274C00B7",
        "label": "Emergency Contact Name",
        "name": "emergency_contact_name",
        "public": true,
        "canEdit": true,
        "canRemove": true
    },
    {
        "id": "E58C1DF3-BD43-481A-8EF4-C08C5F6ED955",
        "element": "Telephone",
        "text": "Telephone",
        "required": false,
        "canHaveAnswer": true,
        "field_name": "o_emergency_contact_phone_3E9B7312-B6FC-45B4-88B4-FD8BF3D54BD1",
        "label": "Emergency Contact Phone",
        "name": "emergency_contact_phone",
        "public": true,
        "canEdit": true,
        "canRemove": true
    },
    {
        "id": "11A77BAF-BEC7-4D9E-B64A-F248D1AA5079",
        "element": "TextInput",
        "text": "Text Input",
        "required": false,
        "canHaveAnswer": true,
        "field_name": "o_vet_name_FD5F7E9E-977F-451D-80B5-8FE21D8FBCD7",
        "label": "Vet Name",
        "name": "vet_name",
        "public": true,
        "canEdit": true,
        "canRemove": true
    },
    {
        "id": "1D778C2D-93FB-4042-A5E6-DD096C8F4103",
        "element": "Telephone",
        "text": "Telephone",
        "required": false,
        "canHaveAnswer": true,
        "field_name": "o_vet_phone_A9EF9770-3828-432A-88C8-DADAA11B9DD2",
        "label": "Vet Phone",
        "name": "vet_phone",
        "public": true,
        "canEdit": true,
        "canRemove": true
    },
    {
        "id": "BE264170-170C-44FC-8581-5F2EA5C3F37F",
        "element": "TextInput",
        "text": "Text Input",
        "required": false,
        "canHaveAnswer": true,
        "field_name": "o_barcode_E77415CD-C997-41E0-BB8A-2E82464914F5",
        "label": "Barcode",
        "name": "barcode",
        "public": false,
        "canEdit": true,
        "canRemove": true
    },
    {
        "id": "D65C477A-BF64-4497-A04D-40F63341DAE4",
        "element": "TextArea",
        "text": "Multi-line Input",
        "required": false,
        "canHaveAnswer": true,
        "field_name": "o_notes_4024766B-5D19-42A1-9AE5-3A6E5E73FCAF",
        "label": "Notes",
        "name": "notes",
        "public": false,
        "canEdit": true,
        "canRemove": true
    }
];

ReactDOM.render(
  <Form
    data={formData} />,
  document.getElementById('form-builder')
)
