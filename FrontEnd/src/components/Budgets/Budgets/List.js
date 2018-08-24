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
const Actions = require('../../../dispatcher/Budgets/Budgets/Actions');
const Events = require('../../../events/Budgets/Budgets');
const BudgetFactory = require("../../../entities/Budgets/Budgets/BudgetFactory");
const States = require("../../../entities/Budgets/Budgets/States");

const ExternalClasses = require("../../../styles/ExternalClasses/List");
const StyledComponents = require("../../../styles/StyledComponents/List").styles;
const MenuOptions = require("../../MenuOptions");

export default class BudgetsList extends Component {
  constructor(){
    super();
    global.selectedMenuOption = MenuOptions.Budgets;

    let self=this;
    self.state = {
      items: [],
      currentItem: BudgetFactory.create(),
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
    global.dispatcher.dispatch(new ActionRequest(Modules.Budgets, Actions.GetAll));
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
    newState.currentItem = BudgetFactory.create();
    self.setState(newState);
  }
  deleteItem = (item) => {
    let self = this;
    let newState = self.state;
    newState.open.Delete = true;
    newState.currentItem = item;
    self.setState(newState);
  }
  lockItem = (item) => {
  }
  reopenItem = (item) => {
  }
  sendMail = (item) => {
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
                Header: "Information",
                columns: [ 
                  TableBuilder.createFilterableColumn('Date', 'BudgetDate') ,
                  TableBuilder.createFilterableColumn('Number', 'BudgetNumber') 
                ]
              }, {
                Header: "Customer",
                columns: [ TableBuilder.createFilterableColumn('Customer', 'CustomerCompleteName') ]
              }, {
                Header: "Address",
                columns: [ TableBuilder.createFilterableColumn('Address', 'CompleteAddress') ]
              }, {
                Header: "State",
                columns: [  
                  { 
                    Header: "State", 
                    filterable: false,
                    width:70,
                    Cell: row =>(
                      <div>
                        {
                          row.original.StateData.StateName === States.Created ?
                          <ImageButton 
                            className={ExternalClasses.buttons.edit}
                            title="Created"
                          ></ImageButton>
                          : null
                        }
                        {
                          row.original.StateData.StateName === States.Locked ?
                          <ImageButton 
                            className={ExternalClasses.buttons.lock}
                            title="Locked"
                          ></ImageButton>
                          : null
                        }
                        {
                          row.original.StateData.StateName === States.Sent ?
                          <ImageButton 
                            className={ExternalClasses.buttons.sendMail}
                            title="Sent"
                          ></ImageButton>
                          : null
                        }
                      </div>
                    )
                  }
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
                        {
                          row.original.Actions.Edit ?
                          <ImageButton 
                            onClick={this.editItem.bind(this, row.original)} 
                            className={ExternalClasses.buttons.edit}
                            title="Edit budget"
                          ></ImageButton>
                          : null
                        }
                        {
                          row.original.Actions.Delete ?
                          <ImageButton 
                            onClick={this.deleteItem.bind(this, row.original)} 
                            className={ExternalClasses.buttons.delete}
                            title="Delete budget"
                          ></ImageButton>
                          : null
                        }
                        {
                          row.original.Actions.Lock ?
                          <ImageButton 
                            onClick={this.lockItem.bind(this, row.original)} 
                            className={ExternalClasses.buttons.lock}
                            title="Lock budget"
                          ></ImageButton>
                          : null
                        }
                        {
                          row.original.Actions.Reopen ?
                          <ImageButton 
                            onClick={this.reopenItem.bind(this, row.original)} 
                            className={ExternalClasses.buttons.reopen}
                            title="Reopen budget"
                          ></ImageButton>
                          : null
                        }
                        {
                          row.original.Actions.SendMail ?
                          <ImageButton 
                            onClick={this.sendMail.bind(this, row.original)} 
                            className={ExternalClasses.buttons.sendMail}
                            title="Send mail"
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