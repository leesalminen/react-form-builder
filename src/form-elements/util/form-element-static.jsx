import FormElement from './form-element';

export default class FormElementStatic extends FormElement {
    renderReadOnly() {
        return this.renderComponent();
    }
}

FormElementStatic.static = true;
