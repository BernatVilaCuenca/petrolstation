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
const Validator = require("./Validator")

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
    let self = this;
    if(Validator.Validate()){
      let actionRequest = new ActionRequest(Modules.Customers, Actions.Insert, self.state.currentItem);
      global.dispatcher.dispatch(actionRequest);
      //this.props.onClose();
    } else {
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
              <div>
                <LabelSizeS>Type</LabelSizeS>
                <SelectSizeL 
                  id="Type"
                  value={this.state.currentItem.Type} 
                  onChange={this.handleTypeChange}
                >
                  <option value={Type.Person}>Person</option>
                  <option value={Type.LegalPerson}>Legal person</option>
                </SelectSizeL>
              </div>              
              <PersonData enabled={ this.state.enabled.personData } onChange={this.onChangePersonData}></PersonData>
              <LegalPersonData enabled={ this.state.enabled.legalPersonData } onChange={this.onChangeLegalPersonData}></LegalPersonData>
              <Contacts enabled={ this.state.enabled.contacts } onChange={this.onChangeContacts}></Contacts>
              <Addresses onChange={this.onChangeAddresses}></Addresses>
              <div>
                <ButtonSizeS type="button" onClick={this.save} className={ExternalClasses.buttons.primary} >Save</ButtonSizeS>
                <ButtonSizeS type="button" onClick={this.close} className={ExternalClasses.buttons.secondary} >Close</ButtonSizeS>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}