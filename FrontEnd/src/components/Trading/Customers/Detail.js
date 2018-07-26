import "../../../styles/Trading/Customers/Detail.css";

import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import PersonData from './PersonData';
import LegalPersonData from './LegalPersonData';

const CustomerFactory = require("../../../entities/Trading/Customers/CustomerFactory");
const Type = require("../../../entities/Trading/Customers/Type");
const DetailClasses = require("../../../styles/Detail");
const ActionRequest = require('../../../dispatcher/ActionRequest');
const Modules = require('../../../dispatcher/Modules');
const Actions = require('../../../dispatcher/Trading/Customers/Actions');
const Events = require('../../../events/Trading/Customers');

export default class CustomersDetail extends React.Component {
  constructor(props){
    super(props);

    let self=this;
    let currentItem = CustomerFactory.create();
    this.state = {
        currentItem,
        enabled: {
          personData: true,
          legalPersonData: true,
          contacts: true
        }
    };
    global.eventManager.on(
      Events.GetOne,
      function(result){
        self.setState({ currentItem: result });
        self.enableSections();
      }
    );
  }
  enableSections = () => {
    let self = this;
    self.setState({ 
      enabled: {
        personData: self.state.currentItem.Type === Type.Person,
        legalPersonData: self.state.currentItem.Type === Type.LegalPerson,
        contacts: self.state.currentItem.Type === Type.LegalPerson
      } 
    });
  }
  componentWillReceiveProps(newProps) {
    if(newProps && newProps.id){
      let actionRequest = new ActionRequest(Modules.Customers, Actions.GetOne, newProps.id);
      global.dispatcher.dispatch(actionRequest);
    }
  }
  close = () => {
    this.props.onClose();
  };
  save = () => {
    this.props.onClose();
  };
  handleTypeChange = event => {
    let self=this;
    let currentItem = self.state.currentItem;
    currentItem.Type = event.target.value;
    self.setState({ currentItem });
    self.enableSections();
  };
  onChangePersonData = (data) => {
    let self=this;
    let currentItem = self.state.currentItem;
    currentItem.PersonData = data;
    self.setState({ currentItem });
  };
  onChangeLegalPersonData = (data) => {
    let self=this;
    let currentItem = self.state.currentItem;
    currentItem.LegalPersonData = data;
    self.setState({ currentItem });
  };
  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth={false}
        >
          <DialogContent>
            <form>
              <label><h3>Customer</h3></label>
              <div className={DetailClasses.formSection}>
                <label className={DetailClasses.controls.size.S}>Type</label>
                <select
                    className={DetailClasses.controls.size.L}
                    value={this.state.currentItem.Type}
                    onChange={this.handleTypeChange}
                >
                  <option value={Type.Person}>Person</option>
                  <option value={Type.LegalPerson}>Legal person</option>
                </select>
              </div>              
              
              <PersonData 
                enabled={ this.state.enabled.personData } 
                onChange={this.onChangePersonData}
              ></PersonData>

              <LegalPersonData 
                enabled={ this.state.enabled.legalPersonData }
                onChange={this.onChangeLegalPersonData}
              ></LegalPersonData>              
              
              <div>
                <button type="button" onClick={this.save} className={DetailClasses.buttons.style.primary} >Save</button>
                <button type="button" onClick={this.save} className={DetailClasses.buttons.style.secondary} >Close</button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}