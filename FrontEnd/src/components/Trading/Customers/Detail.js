import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import PersonData from '../Shared/PersonData';
import LegalPersonData from '../Shared/LegalPersonData';
import Contacts from '../Shared/Contacts';
import Addresses from '../Shared/Addresses';

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
        global.dispatcher.dispatch(new ActionRequest(Modules.Customers, Actions.GetAll));
      }
    );
    global.eventManager.on(
      Events.Update, 
      function(){
        global.eventManager.emit(NotificatorEvents.Notificate, [Notifications.SuccessTradingCustomersUpdate.id]);
        global.dispatcher.dispatch(new ActionRequest(Modules.Customers, Actions.GetAll));
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
  init = () => {
    let self = this;
    self.setState ({
      currentItem: CustomerFactory.create()
    });
    self.enableSections();
  }
  componentDidMount(){
    let self=this;
    self.init();
  }
  componentDidUpdate(){
    let self=this;    
    let oldData = self.state.currentItem._id;
    let newData = self.props.id;
    
    if(oldData !== newData && newData !== null)
      global.dispatcher.dispatch(new ActionRequest(Modules.Customers, Actions.GetOne, newData));
  }
  close = () => {
    let self = this;
    self.init();
    self.props.onClose();
  };
  prepareItemBeforeSaving = () => {
    let self = this;
    let item = Object.assign({}, self.state.currentItem);
    if(item.Type === Type.Person)
      item.LegalPersonData = null;
    else
      item.PersonData = null;    
    return item;
  };
  save = () => {
    let self = this;
    if(Validator.Validate(self.state.currentItem)){
      let item = self.prepareItemBeforeSaving();
      global.dispatcher.dispatch(
        new ActionRequest(
          Modules.Customers, 
          item._id ? Actions.Update : Actions.Insert, 
          item
        )
      );
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
    const LabelSizeM = StyledComponents.labels.M;
    const SelectSizeL = StyledComponents.selects.L;
    const ButtonSizeS = StyledComponents.buttons.S;
    const Title = StyledComponents.title;
    
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.close}
          maxWidth={false}
          fullWidth={true}
        >
          <DialogContent>
            <form>
              <Title>Customer</Title>
              <LabelSizeM>Type</LabelSizeM>
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