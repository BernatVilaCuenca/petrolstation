import "../../../styles/List.css";
import "react-table/react-table.css";

import React, { Component } from 'react';
import Menu from '../../Menu';
import ReactTable from "react-table";
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import Detail from "./Detail";

const ActionRequest = require('../../../dispatcher/ActionRequest');
const Modules = require('../../../dispatcher/Modules');
const Actions = require('../../../dispatcher/Trading/Customers/Actions');
const Events = require('../../../events/Trading/Customers');
const Type = require("../../../entities/Trading/Customers/Type");
const CustomerFactory = require("../../../entities/Trading/Customers/CustomerFactory");

export default class CustomersList extends Component {
  constructor(){
    super();

    let self=this;
    self.state = {
      items:[],
      currentItem: CustomerFactory.create(),
      open: {
        Detail: false,
        Delete: false
      }
    };
    self.classNames = {
      content: 'content',
      gridOptionButton: 'gridOptionButton'
    };
    global.eventManager.on(
      Events.GetAll,
      function(result){
        self.setState({items: result});
      }
    );
    global.eventManager.on(
      Events.GetOne,
      function(result){
        self.setState({currentItem: result});
      }
    );
    this.editItem = this.editItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.closeDetail = this.closeDetail.bind(this);
  }

  componentDidMount(){
    let actionRequest = new ActionRequest(Modules.Customers, Actions.GetAll);
    global.dispatcher.dispatch(actionRequest);
  }
  editItem(id){
    let self=this;
    let actionRequest = new ActionRequest(Modules.Customers, Actions.GetOne, id);
    global.dispatcher.dispatch(actionRequest);
    self.setState({open: {Detail: true}});
  }
  deleteItem(id){
  }
  closeDetail() {
    this.setState({open:{Detail: false}});
  }
  render() {
    return (
      <div>
          <Menu/>
          <Detail 
            open={this.state.open.Detail} 
            currentItem={this.state.currentItem} 
            onClose={this.closeDetail}
          />
          <div className={this.classNames.content}>
            <ReactTable
            data={ this.state.items }
            columns={[
              {
                Header: "Type",
                columns: [
                  { 
                    Header: "Type", 
                    id: 'Type',
                    accessor: row => row.Type === Type.Person ? "Person" : "Legal person"
                  }
                ]
              },{
                Header: "Name",
                columns: [
                  { 
                    Header: "CompleteName", 
                    accessor: 'CompleteName'
                  }
                ]
              }, {
                Header: "Information",
                columns: [
                  { 
                    Header: "Phone", 
                    accessor: 'Phone'
                  },
                  { 
                    Header: "DocumentId", 
                    accessor: 'DocumentId'
                  },
                  { 
                    Header: "Email", 
                    accessor: 'Email'
                  }
                ]
              }, {
                Header: "Options",
                columns: [
                  { 
                    Header: "Options", 
                    Cell: row =>(
                      <div>
                        <Button onClick={this.editItem.bind(this, row.original._id)} className={this.classNames.gridOptionButton} variant="contained" size="small"><SaveIcon/>Edit</Button>
                        <Button onClick={this.deleteItem.bind(this, row.original._id)} className={this.classNames.gridOptionButton} variant="contained" color="secondary" size="small"><DeleteIcon/>Delete</Button>
                      </div>
                    )
                  }
                ]
              }
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
          />
        </div>
      </div>
    );
  }
};
