import SortableItem from 'react-sortable-items/SortableItem';
import ReactDOM from 'react-dom';

export default class FormElement extends SortableItem {
    constructor(props) {
        super(props);

        this.htmlId = _.uniqueId('react-form-builder_' + props.data.name + '_');
    }

    static toolbarEntry() {
        console.error('toolbarEntry is required on all input classes');
    }

    headerBarProps() {
        return {
            parent:     this.props.parent,
            editModeOn: this.props.editModeOn,
            data:       this.props.data,
            onDestroy:  this.props._onDestroy,
            onEdit:     this.props.onEdit,
            static:     this.props.data.static,
            required:   this.props.data.required
        }
    }

    headerLabelProps() {
        return {
             data:      this.props.data,
             htmlFor:   this.htmlId,
             mutable:   this.props.mutable
        }
    }

    baseInputProps() {
        return {
            id:   this.htmlId,
            name: this.props.data.name
        }
    }

    /**
     * Default required validation that just checks if there's input in the element
     * Override if needed
     * @return {boolean}} True if this element has a value, false if not
     */
    validateRequired() {
      if (this.refs.input !== undefined) {
          let item = ReactDOM.findDOMNode(this.refs.input);

          return item.value.trim().length > 0;
      }
    }
}
