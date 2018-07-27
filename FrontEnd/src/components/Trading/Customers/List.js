import "react-table/react-table.css";

import React, { Component } from 'react';
import ReactTable from "react-table";
import Menu from '../../Menu';
import Detail from "./Detail";

const ActionRequest = require('../../../dispatcher/ActionRequest');
const Modules = require('../../../dispatcher/Modules');
const Actions = require('../../../dispatcher/Trading/Customers/Actions');
const Events = require('../../../events/Trading/Customers');
const Type = require("../../../entities/Trading/Customers/Type");

const ExternalClasses = require("../../../styles/ExternalClasses/List");
const StyledComponents = require("../../../styles/StyledComponents/List").styles;

export default class CustomersList extends Component {
  constructor(){
    super();

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
  deleteItem = (id) => {
    let self=this;    
    self.setState({open: {Delete: true}, currentId: id});
  }
  closeDetail = () => {
    this.setState({open: {Detail: false}});
  }
  render() {
    const buttonStyle = {marginLeft:'5px', cursor: 'pointer'};
    const ImageButton = StyledComponents.buttons.image;
    return (
      <div>
          <Menu/>
          <Detail 
            open={this.state.open.Detail} 
            id={this.state.currentId} 
            onClose={this.closeDetail}
          />
          <div>
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
                columns: [ { Header: "Complete name", accessor: 'CompleteName'} ]
              }, {
                Header: "Information",
                columns: [
                  { Header: "Phone", accessor: 'Phone' },
                  { Header: "Id", accessor: 'DocumentId'},
                  { Header: "Email", accessor: 'Email' }
                ]
              }, {
                Header: "Options",
                columns: [
                  { 
                    Header: "Options", 
                    Cell: row =>(
                      <div>
                        <ImageButton 
                          onClick={this.deleteItem.bind(this, row.original._id)} 
                          className={ExternalClasses.buttons.delete}
                          aria-hidden="true"
                          style={buttonStyle}
                        ></ImageButton>
                        <ImageButton 
                          onClick={this.editItem.bind(this, row.original._id)} 
                          className={ExternalClasses.buttons.edit}
                          aria-hidden="true"
                          style={buttonStyle}
                        ></ImageButton>                        
                      </div>
                    )
                  }
                ]
              }
            ]}
            defaultPageSize={10}
            className={ExternalClasses.list}
          />
        </div>
      </div>
    );
  }
};
