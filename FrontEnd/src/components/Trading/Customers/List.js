import "react-table/react-table.css";

import React, { Component } from 'react';
import ReactTable from "react-table";
import Menu from '../../Menu';
import Notificator from '../../Notificator';
import Ribbon from './Ribbon';
import Detail from "./Detail";
import Delete from "./Delete";
import TableBuilder from "../../TableBuilder";

const ActionRequest = require('../../../dispatcher/ActionRequest');
const Modules = require('../../../dispatcher/Modules');
const Actions = require('../../../dispatcher/Trading/Customers/Actions');
const Events = require('../../../events/Trading/Customers');
const Type = require("../../../entities/Trading/Customers/Type");
const CustomerFactory = require("../../../entities/Trading/Customers/CustomerFactory");

const ExternalClasses = require("../../../styles/ExternalClasses/List");
const StyledComponents = require("../../../styles/StyledComponents/List").styles;
const MenuOptions = require("../../MenuOptions");

export default class CustomersList extends Component {
  constructor(){
    super();
    global.selectedMenuOption = MenuOptions.Customers;

    let self=this;
    self.state = {
      items: [],
      currentItem: CustomerFactory.create(),
      open: {
        Detail: false,
        Delete: false
      }
    };
    global.eventManager.on(
      Events.GetAll,
      function(result){
        self.setState({items: result});
      }
    );    
  }
  componentDidMount(){
    global.dispatcher.dispatch(new ActionRequest(Modules.Customers, Actions.GetAll));
  }
  editItem = (item) => {
    let self = this;
    let newState = self.state;
    newState.open.Detail = true;
    newState.currentItem = item;
    self.setState(newState);  
  }
  newItem = () => {
    let self = this;
    let newState = self.state;
    newState.open.Detail = true;
    newState.currentItem = CustomerFactory.create();
    self.setState(newState);
  }
  deleteItem = (item) => {
    let self = this;
    let newState = self.state;
    newState.open.Delete = true;
    newState.currentItem = item;
    self.setState(newState);
  }
  closeDetail = () => {
    let self = this;
    let newState = self.state;
    newState.open.Detail = false;
    self.setState(newState);
  }
  closeDelete = () => {
    let self = this;
    let newState = self.state;
    newState.open.Delete = false;
    self.setState(newState);
  }
  render() {
    const ImageButton = StyledComponents.buttons.image;
    const Table = StyledComponents.table;
    
    return (   
        <div>   
          <Menu/>
          <Notificator/>
          <Ribbon
            onNewItem={this.newItem}
          />
          <Detail 
            open={this.state.open.Detail} 
            id={this.state.currentItem._id} 
            onClose={this.closeDetail}
          />
          <Delete 
            open={this.state.open.Delete} 
            item={this.state.currentItem} 
            onClose={this.closeDelete}
          />
          <Table>
            <ReactTable
              filterable
              data={ this.state.items }
              columns={[
              {
                Header: "Type",
                columns: [
                  TableBuilder.createFilterableBySelectionColumn(
                    'Type', 
                    'Type', 
                    [
                      { id: Type.Person, value: 'Person'}, 
                      { id: Type.LegalPerson, value: 'Legal person'}
                    ],
                    {width: 150}
                  )
                ]
              },{
                Header: "Name",
                columns: [ TableBuilder.createFilterableColumn('Complete name', 'CompleteName') ]
              }, {
                Header: "Information",
                columns: [
                  TableBuilder.createFilterableColumn('Phone', 'Phone',{ width: 150 }),
                  { Header: "Document Id", accessor: 'DocumentId', filterable: false, width:150},
                  { Header: "Email", accessor: 'Email', filterable: false }
                ]
              }, {
                Header: "Options",
                columns: [
                  { 
                    Header: "Options", 
                    filterable: false,
                    width:70,
                    Cell: row =>(
                      <div>
                        <ImageButton 
                          onClick={this.editItem.bind(this, row.original)} 
                          className={ExternalClasses.buttons.edit}
                          title="Edit customer"
                        ></ImageButton>
                        {
                          row.original.Deletable ?
                          <ImageButton 
                            onClick={this.deleteItem.bind(this, row.original)} 
                            className={ExternalClasses.buttons.delete}
                            title="Delete customer"
                          ></ImageButton>
                          : null
                        }
                      </div>
                    )
                  }
                ]
              }
            ]}
            defaultPageSize={12}
            className={ExternalClasses.list}
          />
        </Table>
      </div>
    );
  }
};