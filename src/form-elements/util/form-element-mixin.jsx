export default {
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
