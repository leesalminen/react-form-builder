import React from 'react';
import FormElement from './util/form-element.jsx';

import HeaderBar from './util/header-bar.jsx';
import HeaderLabels from './util/header-labels.jsx';

import classNames from 'classnames';

import Select from 'react-select';
import { Input, Row, Col, Well, Button, Alert } from 'react-bootstrap';

export default class CreditCard extends FormElement {
  constructor(props) {
      super(props);

      this.handleMonthChange = this.handleMonthChange.bind(this);

      this.state = {
          token: '',
          error: null,
          month: ''
      };
  }

  static toolbarEntry() {
    return {
      element: 'CreditCard',
      displayName: 'Credit Card',
      icon: 'fa fa-credit-card'
    };
  }

  static defaultOptions() {
      return {
          label: 'Credit Card'
      }
  }

  validateRequired() {
      var data  = self.refs.number.getValue();
      var exp_m = self.state.month;
      var exp_y = self.refs.year.getValue();

      return data.length > 0 && exp_m > 0 && exp_y.length > 0;
  }

  /**
   * Validate the credit card info and get a token from the credit card processor
   * @return {Promise} Resolves to true if valid, error string if invalid
   */
  validate() {
      var self = this;

      return new Promise(function(resolve, reject) {
          var data  = self.refs.number.getValue();
          var exp_m = self.state.month;
          var exp_y = self.refs.year.getValue();
          var type = 'json';
          var port = 6443;

          var url = 'https://fts.cardconnect.com:' + port + '/cardsecure/cs';

          var action = 'CE';

          // Don't do anything if info is completely empty
          if (data.length === 0 && exp_m.length === 0 && exp_y.length === 0) {
              resolve(true);

              return true;
          }

          if(data.length > 17) {
              action = 'CZ';
          }

          if(exp_m.length === 0 || exp_y.length === 0) {
              self.setState({
                  error: 'Please enter expiration month / year to save card on file.'
              }, function() {
                 resolve('Please check your credit card info!');
              });

              return false;
          }

          $.get(url, {type: type, data: data, action: action}, function(response) {
              var parse  = response.substring(14, response.length - 2);
              var object = JSON.parse(parse);

              if(object.action !== 'ER') {
                  self.setState({
                      token: object.data,
                      error: ''
                  }, function() {
                     resolve(true);
                  });

                  return true;
              } else {
                  self.setState({
                      error: 'Please enter a valid credit card number (' + object.data + ')'
                  }, function() {
                      resolve('Please check your credit card info!');
                  });

                  return false;
              }
          });
      });
  }

  handleMonthChange(value) {
      this.setState({
          month: value
      });
  }

  renderComponent() {
      return (
          <Well>
              <Alert bsStyle="danger" className={classNames({hidden: !this.state.error})}>{this.state.error}</Alert>
              <Input ref="token" type="hidden" name={this.props.data.name + '[token]'} value={this.state.token}/>
              <Input ref="number" type="text" name={this.props.data.name + '[number]'} label="Number" />
              <Row>
                  <Col sm={3} smOffset={6}>
                      <Input label="Expiration Month">
                          <Select
                              ref       = "month"
                              name      = {this.props.data.name + '[month]'}
                              onChange  = {this.handleMonthChange}
                              value     = {this.state.month}
                              options   = {[
                                  {value: 1, label: 'January (01)'},
                                  {value: 2, label: 'February (02)'},
                                  {value: 3, label: 'March (03)'},
                                  {value: 4, label: 'April (04)'},
                                  {value: 5, label: 'May (05)'},
                                  {value: 6, label: 'June (06)'},
                                  {value: 7, label: 'July (07)'},
                                  {value: 8, label: 'August (08)'},
                                  {value: 9, label: 'September (09)'},
                                  {value: 10, label: 'October (10)'},
                                  {value: 11, label: 'November (11)'},
                                  {value: 12, label: 'December (12)'}
                              ]} />
                      </Input>
                  </Col>
                  <Col sm={3}>
                      <Input ref="year" type="text" name={this.props.data.name + '[year]'} label="Expiration Year" />
                  </Col>
              </Row>
          </Well>
      );
  }
}
