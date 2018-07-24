import "../../../styles/Trading/Customers/Detail.css";

import _ from 'lodash';
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const CustomerFactory = require("../../../entities/Trading/Customers/CustomerFactory");
const Type = require("../../../entities/Trading/Customers/Type");

export default class CustomersDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        currentItem: _.assign (CustomerFactory.create(), this.props.currentItem),
        personData:{
          expanded:true
        },
        legalPersonData:{
          expanded:true
        },
        addresses:{
          expanded:true
        },
        contacts:{
          expanded:true
        }
    };
    this.classNames = {
        textBoxes:{
            smallTextBox: 'smallTextBox',
            mediumTextBox: 'mediumTextBox',
            largeTextBox: 'largeTextBox'
        }
      };
  }
  close = () => {
    this.props.onClose();
  };
  save = () => {
    //this.props.onClose();
    //console.log(this.state.currentItem.Type);
  };
  handleTypeChange = () => event => {
    let currentItem = this.state.currentItem;
    currentItem.Type = event.target.value;
    this.setState({ currentItem });
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
  handleExpandPersonData = () => {
    var value = this.state.personData.expanded;
    this.setState({ personData:{ expanded: !value } });
  };
  handleExpandLegalPersonData = () => {
    var value = this.state.legalPersonData.expanded;
    this.setState({ legalPersonData:{ expanded: !value } });
  };
  handleExpandAddresses = () => {
    var value = this.state.addresses.expanded;
    this.setState({ addresses:{ expanded: !value } });
  };
  handleExpandContacts = () => {
    var value = this.state.contacts.expanded;
    this.setState({ contacts:{ expanded: !value } });
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
          <DialogTitle id="form-dialog-title">Customer</DialogTitle>
          <DialogContent>
            <FormControl>
                <InputLabel>Type</InputLabel>
                <Select
                    native
                    value={this.state.currentItem.Type}
                    onChange={this.handleTypeChange}            
                >
                  <option value={Type.Person}>Person</option>
                  <option value={Type.LegalPerson}>Legal person</option>
                </Select>
            </FormControl>
            <ExpansionPanel 
              expanded={this.state.personData.expanded}
              onChange={this.handleExpandPersonData}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Person data</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <FormControl>
                  <TextField
                      label="Name"
                      className={this.classNames.textBoxes.mediumTextBox}
                      value={this.state.currentItem.PersonData.Name}
                      onChange={this.handlePersonDataChange('Name')}
                      margin="normal"
                  />
                </FormControl>
                <FormControl>
                  <TextField
                      label="Surname"
                      className={this.classNames.textBoxes.mediumTextBox}
                      value={this.state.currentItem.PersonData.Surname}
                      onChange={this.handlePersonDataChange('Surname')}
                      margin="normal"
                  />
                </FormControl>
                <FormControl>
                  <TextField
                      label="Phone"
                      className={this.classNames.textBoxes.mediumTextBox}
                      value={this.state.currentItem.PersonData.Phone}
                      onChange={this.handlePersonDataChange('Phone')}
                      margin="normal"
                  />
                </FormControl>
              </ExpansionPanelDetails>
            </ExpansionPanel>            
          </DialogContent>
          <DialogActions>
            <Button onClick={this.close} color="primary">
              Cancel
            </Button>
            <Button onClick={this.save} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}