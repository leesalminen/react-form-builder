import React from 'react';
import ReactDOM from 'react-dom';
import FormElement from './util/form-element.jsx';

import SignaturePad from 'react-signature-pad';

import HeaderBar from './util/header-bar.jsx';
import HeaderLabels from './util/header-labels.jsx';

export default class Signature extends FormElement {

    constructor(props) {
        super(props);

        this.state = {
            showPad: false
        };
    }
    static toolbarEntry() {
        return {
            element: 'Signature',
            displayName: 'Signature',
            icon: 'fa fa-pencil-square-o'
        };
    }

    static defaultOptions() {
        return {
            label: 'Signature'
        }
    }

    validate() {
        let $canvas_sig = this.refs.canvas;
        let base64 = $canvas_sig.toDataURL().replace('data:image/png;base64,', '');
        let isEmpty = $canvas_sig.isEmpty();

        let $input_sig = ReactDOM.findDOMNode(this.refs.input);
        if (isEmpty) {
            $input_sig.value = "";
        } else {
            $input_sig.value = base64;
        }
        return true;
    }

    componentDidMount() {
        if (this.props.defaultValue !== undefined && this.props.defaultValue.length > 0) {
            let canvas = this.refs.canvas;
            canvas.fromDataURL('data:image/png;base64,' + this.props.defaultValue);
        }
    }

    toggleShowPad() {
        this.setState({
            showPad: !this.state.showPad
        }, function() {
            if(this.props.defaultValue !== undefined && this.props.defaultValue.length > 0) {
                let canvas = this.refs.canvas;
                canvas.fromDataURL('data:image/png;base64,' + this.props.defaultValue);
            }
        })
    }

    renderComponent() {
        let props = this.baseInputProps();
        props.type = "hidden";

        let pad_props = {};
        pad_props.clearButton = {true};
        if (this.props.mutable) {
            pad_props.defaultValue = this.props.defaultValue;
            pad_props.ref = 'canvas';
        }
        return (
            <div>
                {(this.state.showPad) ?
                    <div>
                        <SignaturePad height={200} width={$(".container").width() || window.innerWidth} {...pad_props} />
                        <input {...props} />
                    </div>
                :
                    <a className="btn btn-default" onClick={this.toggleShowPad.bind(this)}>
                        {"I'm ready to sign"}
                    </a>
                }   
            </div>
        );
    }
}
