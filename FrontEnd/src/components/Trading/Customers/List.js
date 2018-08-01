import "react-table/react-table.css";

import React, { Component } from 'react';
import ReactTable from "react-table";
import Menu from '../../Menu';
import Notificator from '../../Notificator';
import Ribbon from './Ribbon';
import Detail from "./Detail";
import TableBuilder from "../../TableBuilder";

const ActionRequest = require('../../../dispatcher/ActionRequest');
const Modules = require('../../../dispatcher/Modules');
const Actions = require('../../../dispatcher/Trading/Customers/Actions');
const Events = require('../../../events/Trading/Customers');
const Type = require("../../../entities/Trading/Customers/Type");

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
      currentId: null,
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
    let actionRequest = new ActionRequest(Modules.Customers, Actions.GetAll);
    global.dispatcher.dispatch(actionRequest);
  }
  editItem = (id) => {
    let self=this;      
    self.setState({open: {Detail: true}, currentId: id});  
  }
  newItem = () => {
    let self=this;      
    self.setState({open: {Detail: true}, currentId: null});  
  }
  deleteItem = (id) => {
    let self=this;    
    self.setState({open: {Delete: true}, currentId: id});
  }
  closeDetail = () => {
    this.setState({open: {Detail: false}});
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
            id={this.state.currentId} 
            onClose={this.closeDetail}
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
                    ]
                  )
                ]
              },{
                Header: "Name",
                columns: [ TableBuilder.createFilterableColumn('Complete name', 'CompleteName') ]
              }, {
                Header: "Information",
                columns: [
                  TableBuilder.createFilterableColumn('Phone', 'Phone'),
                  { Header: "Document Id", accessor: 'DocumentId', filterable: false},
                  { Header: "Email", accessor: 'Email', filterable: false }
                ]
              }, {
                Header: "Options",
                columns: [
                  { 
                    Header: "Options", 
                    filterable: false,
                    Cell: row =>(
                      <div>
                        <ImageButton 
                          onClick={this.deleteItem.bind(this, row.original._id)} 
                          className={ExternalClasses.buttons.delete}
                          title="Delete customer"
                        ></ImageButton>
                        <ImageButton 
                          onClick={this.editItem.bind(this, row.original._id)} 
                          className={ExternalClasses.buttons.edit}
                          title="Edit customer"
                        ></ImageButton>                        
                      </div>
                    )
                  }
                ]
              }
            ]}
            defaultPageSize={20}
            className={ExternalClasses.list}
          />
        </Table>
      </div>
    );
  }
};