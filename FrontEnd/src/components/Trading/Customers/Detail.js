import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import PersonData from './PersonData';
import LegalPersonData from './LegalPersonData';
import Contacts from './Contacts';
import Addresses from './Addresses';

const ExternalClasses = require("../../../styles/ExternalClasses/Detail");
const StyledComponents = require("../../../styles/StyledComponents/Detail").styles;

const CustomerFactory = require("../../../entities/Trading/Customers/CustomerFactory");
const Type = require("../../../entities/Trading/Customers/Type");

const ActionRequest = require('../../../dispatcher/ActionRequest');
const Modules = require('../../../dispatcher/Modules');
const Actions = require('../../../dispatcher/Trading/Customers/Actions');
const Events = require('../../../events/Trading/Customers');
const NotificatorEvents =require('../../../events/Notificator');
const Validator = require("./Validator")
const Notifications = require("../../../entities/Notifications/Notifications")

export default class CustomersDetail extends React.Component {
  constructor(props){
    super(props);
    let self=this;
    self.state = {
        currentItem: CustomerFactory.create(),
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
    global.eventManager.on(
      Events.Insert, 
      function(){
        global.eventManager.emit(NotificatorEvents.Notificate, [Notifications.SuccessTradingCustomersInsert.id]);
        let actionRequest = new ActionRequest(Modules.Customers, Actions.GetAll);
        global.dispatcher.dispatch(actionRequest);
      }
    );
    global.eventManager.on(
      Events.Update, 
      function(){
        global.eventManager.emit(NotificatorEvents.Notificate, [Notifications.SuccessTradingCustomersUpdate.id]);
        let actionRequest = new ActionRequest(Modules.Customers, Actions.GetAll);
        global.dispatcher.dispatch(actionRequest);
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
  componentDidMount(){
    let self = this;
    self.enableSections();
  }
  componentDidUpdate(){
    let self=this;

    let oldData = self.state.currentItem._id;
    let newData = self.props.id;

    if(oldData != newData){
      if(newData){
        let actionRequest = new ActionRequest(Modules.Customers, Actions.GetOne, newData);
        global.dispatcher.dispatch(actionRequest);
      }else{
        self.setState ({
          currentItem: CustomerFactory.create()
        });
        self.enableSections();
      }
    }
  }
  close = () => {
    let self = this;
    self.setState ({
      currentItem: CustomerFactory.create()
    });
    self.enableSections();
    self.props.onClose();
  };
  prepareItem = () => {
    let self = this;
    let currentItem = self.state.currentItem;
    if(currentItem.Type === Type.Person)
      currentItem.LegalPersonData = null;
    else
      currentItem.PersonData = null;    
    self.setState({
      currentItem
    });
  };
  save = () => {
    let self = this;
    if(Validator.Validate(self.state.currentItem)){
      self.prepareItem();
      let actionRequest = 
        new ActionRequest(
          Modules.Customers, 
          self.state.currentItem._id ? Actions.Update : Actions.Insert, 
          self.state.currentItem
        );
      global.dispatcher.dispatch(actionRequest);
      self.close();      
    } else {
      global.eventManager.emit(NotificatorEvents.Notificate, [Notifications.ErrorFillingForm.id]);
    }
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
  onChangeContacts = (data) => {
    let self=this;
    let currentItem = self.state.currentItem;
    currentItem.Contacts = data;
    self.setState({ currentItem });
  };
  onChangeAddresses = (data) => {
    let self=this;
    let currentItem = self.state.currentItem;
    currentItem.Addresses = data;
    self.setState({ currentItem });
  };
  render() {
    const LabelSizeS = StyledComponents.labels.S;
    const SelectSizeL = StyledComponents.selects.L;
    const ButtonSizeS = StyledComponents.buttons.S;
    const Title = StyledComponents.title;
    
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.handleClose}
          maxWidth={'md'}
          fullWidth={true}
        >
          <DialogContent>
            <form>
              <Title>Customer</Title>
              <LabelSizeS>Type</LabelSizeS>
              <SelectSizeL 
                id="Type"
                value={this.state.currentItem.Type} 
                onChange={this.handleTypeChange}
                className={ExternalClasses.controls}
              >
                <option value={Type.Person}>Person</option>
                <option value={Type.LegalPerson}>Legal person</option>
              </SelectSizeL>
              {
                this.state.enabled.personData ?
                <PersonData data={ this.state.currentItem.PersonData} onChange={this.onChangePersonData}></PersonData>
                : null
              }
              {
                this.state.enabled.legalPersonData ?
                <LegalPersonData data={ this.state.currentItem.LegalPersonData} onChange={this.onChangeLegalPersonData}></LegalPersonData>
                : null
              }
              {
                this.state.enabled.contacts ?
                <Contacts data={ this.state.currentItem.Contacts} onChange={this.onChangeContacts}></Contacts>
                : null
              }
              <Addresses data={ this.state.currentItem.Addresses} onChange={this.onChangeAddresses}></Addresses>              
              <ButtonSizeS type="button" onClick={this.save} className={ExternalClasses.buttons.primary} >Save</ButtonSizeS>
              <ButtonSizeS type="button" onClick={this.close} className={ExternalClasses.buttons.secondary} >Close</ButtonSizeS>              
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}