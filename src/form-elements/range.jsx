import React from 'react';
import SortableItemMixin from 'react-sortable-items/SortableItemMixin';
import SliderNativeBootstrap from 'react-bootstrap-native-slider';

import HeaderBar from './util/header-bar.jsx';
import HeaderLabels from './util/header-labels.jsx';

export default React.createClass({
  mixins: [SortableItemMixin],
  render() {
    let props = {};
    props.type = "range";
    props.name = this.props.data.field_name;
    props.list = "tickmarks_" + this.props.data.field_name;
    props.min = this.props.data.min_value;
    props.max = this.props.data.max_value;
    props.step = this.props.data.step;

    props.defaultValue = this.props.defaultValue !== undefined ? parseInt(this.props.defaultValue, 10) : parseInt(this.props.data.default_value, 10);

    if (this.props.mutable) {
      props.ref = "child_ref_" + this.props.data.field_name;
    }

    let datalist = [];
    for (var i=parseInt(this.props.data.min_value, 10); i <= parseInt(this.props.data.max_value, 10); i += parseInt(this.props.data.step, 10)) {
      datalist.push(i);
    }

    let oneBig = 100 / (datalist.length - 1);

    let _datalist = datalist.map((d,idx) => {
      return <option key={props.list+'_'+idx}>{d}</option>
    })

    let visible_marks = datalist.map((d,idx) => {
      let option_props = {};
      let w = oneBig;
      if (idx === 0 || idx === datalist.length-1)
        w = oneBig/2;
      option_props.key = props.list+'_label_'+idx;
      option_props.style = {width: w + '%'};
      if (idx === datalist.length-1)
        option_props.style = {width: w + '%', textAlign: 'right'};
      return <label {...option_props}>{d}</label>
    })

    return this.renderWithSortable(
      <div className="rfb-item">
        { !this.props.mutable &&
          <HeaderBar parent={this.props.parent} editModeOn={this.props.editModeOn} data={this.props.data} onDestroy={this.props._onDestroy} onEdit={this.props.onEdit} static={this.props.data.static} required={this.props.data.required} />
        }
        <div className="form-group">
          <HeaderLabels data={this.props.data} />
          <div className="range">
            <div className="clearfix">
              <span className="pull-left">{this.props.data.min_label}</span>
              <span className="pull-right">{this.props.data.max_label}</span>
            </div>
            <SliderNativeBootstrap
              name={props.name}
              value={props.defaultValue}
              step={this.props.data.step}
              max={this.props.data.max_value}
              min={this.props.data.min_value} />
          </div>
          <div className="visible_marks">
            {visible_marks}
          </div>
          <datalist id={props.list}>
            {_datalist}
          </datalist>
        </div>
      </div>
    );
  }
})
