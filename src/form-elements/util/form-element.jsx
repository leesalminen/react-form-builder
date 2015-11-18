import SortableItem from 'react-sortable-items/SortableItem';

export default class FormElement extends SortableItem {
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
}
