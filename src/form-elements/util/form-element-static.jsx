import FormElement from './form-element';

export default class FormElementStatic extends FormElement {

	static defaultOptions() {
        return {
            label: ''
        }
    }

    renderReadOnly() {
        return this.renderComponent();
    }
}

FormElementStatic.static = true;
