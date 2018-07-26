import "../../../styles/Trading/Customers/Detail.css";

import _ from 'lodash';
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const CustomerFactory = require("../../../entities/Trading/Customers/CustomerFactory");
const AddressFactory = require("../../../entities/Trading/Customers/AddressFactory");
const ContactFactory = require("../../../entities/Trading/Customers/ContactFactory");

const Type = require("../../../entities/Trading/Customers/Type");
const ControlsUtils = require("../../../utils/Controls");

export default class CustomersDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        currentItem: CustomerFactory.create()
    };
  }
  componentWillReceiveProps(newProps) {
    let currentItem = CustomerFactory.create();
    switch(currentItem.Type){
      case Type.Person:
        currentItem.PersonData = newProps.currentItem.PersonData;
      break;
      case Type.LegalPerson:
        currentItem.LegalPersonData = newProps.currentItem.LegalPersonData;
        currentItem.Addresses = newProps.currentItem.Addresses;
      break;
    }
    currentItem.Contacts = newProps.currentItem.Contacts;
    this.setState({ currentItem });
  }
  componentDidUpdate(){
    this.showSuitableSections();
  }
  close = () => {
    this.props.onClose();
  };
  save = () => {
    this.props.onClose();
  };
  showSuitableSections(){
    switch(this.state.currentItem.Type){
      case Type.Person:
        ControlsUtils.ShowElement("PersonData");
        ControlsUtils.HideElement("LegalPersonData");
        ControlsUtils.HideElement("Contacts");
      break;
      case Type.LegalPerson:
        ControlsUtils.HideElement("PersonData");
        ControlsUtils.ShowElement("LegalPersonData");
        ControlsUtils.ShowElement("Contacts");
      break;
    }
  }
  handleTypeChange = event => {
    let currentItem = this.state.currentItem;
    currentItem.Type = event.target.value;
    this.setState({ currentItem });
    this.showSuitableSections();
  };
  handlePersonDataChange = (name) => event => {
    let currentItem = this.state.currentItem;
    currentItem.PersonData[name] = event.target.value;
    this.setState({ currentItem });
  };
  handleLegalPersonDataChange = (name) => event => {
    let currentItem = this.state.currentItem;
    currentItem.LegalPersonData[name] = event.target.value;
    this.setState({ currentItem });
  };
  handleAddressChange = (name, index) => event => {
    let currentItem = this.state.currentItem;
    currentItem.Addresses[index][name] = event.target.value;
    this.setState({ currentItem });
  };
  handleContactChange = (name, index) => event => {
    let currentItem = this.state.currentItem;
    currentItem.Contacts[index][name] = event.target.value;
    this.setState({ currentItem });
  };
  addContact = () => {
    let currentItem = this.state.currentItem;
    let contact = ContactFactory.create();
    currentItem.Contacts.push(contact);
    this.setState({ currentItem });
  };
  render() {
    const controlSizeXS = {width: '50px', marginLeft: '5px'};
    const controlSizeS = {width: '80px', marginLeft: '5px'};
    const controlSizeM = {width: '115px', marginLeft: '5px'};
    const controlSizeL = {width: '215px', marginLeft: '5px'};
    const controlSizeXl = {width: '330px', marginLeft: '5px'};

    const controlButtonSave = {width: '80px', marginRight: '5px'};
    const controlButtonClose = {width: '80px'};
    const buttonStyle = {marginLeft:'5px', cursor: 'pointer'};

    const classFromGroup='form-group';
    const classButtonSave='btn btn-primary';
    const classButtonClose='btn btn-secondary';
    const classButtonAdd = 'glyphicon glyphicon-plus';
    const classButtonDelete = 'glyphicon glyphicon-thrash';
    const required = { color: 'red', fontWeight: 'bold'};    

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
              <div className={classFromGroup}>
                <label style={controlSizeS}>Type</label>
                <select
                    style={controlSizeL}
                    value={this.state.currentItem.Type}
                    onChange={this.handleTypeChange}
                >
                  <option value={Type.Person}>Person</option>
                  <option value={Type.LegalPerson}>Legal person</option>
                </select>
              </div>

              <div id="PersonData">
                <div className={classFromGroup}>
                  <label style={controlSizeS}>Name <label style={required}>*</label></label>                    
                  <input
                    type="text"
                    label="Name"
                    style={controlSizeL}
                    value={this.state.currentItem.PersonData.Name}
                    onChange={this.handlePersonDataChange('Name')}
                  />
                  <label style={controlSizeS}>Surname <label style={required}>*</label></label>
                  <input
                    type="text"
                    label="Surname"
                    style={controlSizeL}
                    value={this.state.currentItem.PersonData.Surname}
                    onChange={this.handlePersonDataChange('Surname')}
                  />
                  <label style={controlSizeS}>Id <label style={required}>*</label></label>
                  <input
                    type="text"
                    label="DocumentId"
                    style={controlSizeM}
                    value={this.state.currentItem.PersonData.DocumentId}
                    onChange={this.handlePersonDataChange('DocumentId')}
                  />
                </div>
                <div className={classFromGroup}>
                  <label style={controlSizeS}>Phone <label style={required}>*</label></label>
                  <input
                    type="text"
                    label="Phone"
                    style={controlSizeL}
                    value={this.state.currentItem.PersonData.Phone}
                    onChange={this.handlePersonDataChange('Phone')}
                  />
                  <label style={controlSizeS}>Email <label style={required}>*</label></label>
                  <input
                    type="text"
                    label="Email"
                    style={controlSizeL}
                    value={this.state.currentItem.PersonData.Email}
                    onChange={this.handlePersonDataChange('Email')}
                  />
                </div>
              </div>

              <div id="LegalPersonData">
                <div className={classFromGroup}>
                  <label style={controlSizeS}>Name <label style={required}>*</label></label>                    
                  <input
                    type="text"
                    label="Name"
                    style={controlSizeL}
                    value={this.state.currentItem.LegalPersonData.BusinessName}
                    onChange={this.handleLegalPersonDataChange('BusinessName')}
                  />
                  <label style={controlSizeS}>Id <label style={required}>*</label></label>
                  <input
                    type="text"
                    label="DocumentId"
                    style={controlSizeM}
                    value={this.state.currentItem.LegalPersonData.DocumentId}
                    onChange={this.handleLegalPersonDataChange('DocumentId')}
                  />
                </div>
                <div className={classFromGroup}>
                  <label style={controlSizeS}>Phone <label style={required}>*</label></label>
                  <input
                    type="text"
                    label="Phone"
                    style={controlSizeL}
                    value={this.state.currentItem.LegalPersonData.Phone}
                    onChange={this.handleLegalPersonDataChange('Phone')}
                  />
                  <label style={controlSizeS}>Email <label style={required}>*</label></label>
                  <input
                    type="text"
                    label="Email"
                    style={controlSizeL}
                    value={this.state.currentItem.LegalPersonData.Email}
                    onChange={this.handleLegalPersonDataChange('Email')}
                  />
                </div>
              </div>

              <div id="Addresses">
                <label><h4>Addresses</h4></label>
                <span 
                  onClick={this.addAddress} 
                  className={classButtonAdd}
                  aria-hidden="true"
                  style={buttonStyle}
                ></span>
                <div>
                </div>
              </div>

              <div id="Contacts">
                <label><h4>Contacts</h4></label>
                <span 
                  onClick = {this.addContact} 
                  className = {classButtonAdd}
                  aria-hidden = "true"
                  style = {buttonStyle}
                ></span>
                {
                  this.state.currentItem.Contacts.map((item, index) =>
                    <div key={index}>
                      <div className={classFromGroup}>
                        <label style={controlSizeS}>Name <label style={required}>*</label></label>                    
                        <input
                          type="text"
                          label="Name"
                          style={controlSizeL}
                          value={item.Name}
                          onChange={this.handleContactChange('Name', index)}
                        />
                        <label style={controlSizeS}>Surname <label style={required}>*</label></label>
                        <input
                          type="text"
                          label="Surname"
                          style={controlSizeL}
                          value={item.Surname}
                          onChange={this.handleContactChange('Surname', index)}
                        />
                        <label style={controlSizeS}>Id <label style={required}>*</label></label>
                        <input
                          type="text"
                          label="DocumentId"
                          style={controlSizeM}
                          value={item.DocumentId}
                          onChange={this.handleContactChange('DocumentId', index)}
                        />
                      </div>
                      <div className={classFromGroup}>
                        <label style={controlSizeS}>Phone <label style={required}>*</label></label>
                        <input
                          type="text"
                          label="Phone"
                          style={controlSizeL}
                          value={item.Phone}
                          onChange={this.handleContactChange('Phone', index)}
                        />
                        <label style={controlSizeS}>Email <label style={required}>*</label></label>
                        <input
                          type="text"
                          label="Email"
                          style={controlSizeL}
                          value={item.Email}
                          onChange={this.handleContactChange('Email', index)}
                        />
                        <span 
                          onClick = {this.removeContact(index)}
                          className = {classButtonDelete}
                          aria-hidden = "true"
                          style = {buttonStyle}
                        ></span>
                      </div>
                    </div>
                  )
                }                
              </div>
              <div>
                <button type="button" onClick={this.save} className={classButtonSave} style={controlButtonSave}>Save</button>
                <button type="button" onClick={this.save} className={classButtonClose} style={controlButtonClose}>Close</button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}