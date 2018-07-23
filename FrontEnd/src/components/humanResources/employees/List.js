import "../../../styles/List.css";
import "react-table/react-table.css";

import React, { Component } from 'react';
import Menu from '../../Menu';
import ReactTable from "react-table";
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

const ActionRequest = require('../../../dispatcher/ActionRequest');
const Modules = require('../../../dispatcher/Modules');
const Actions = require('../../../dispatcher/humanResources/Employees/Actions');
const Events = require('../../../events/humanResources/Employees');

export default class EmployeesList extends Component {
  constructor(){
    super();

    let self=this;
    self.state={
      items:[]
    };
    self.classNames = {
      content: 'content',
      gridOptionButton: 'gridOptionButton'
    };

    global.eventManager.on(
      Events.GetAll,
      function(data){
        self.setState({items: data});
      }
    );

    this.editItem = this.editItem.bind(this);
  }
  componentDidMount(){
    let actionRequest = new ActionRequest(
      Modules.Employees,
      Actions.GetAll,
      null
    );
    global.dispatcher.dispatch(actionRequest);
  }
  editItem(id, a, b){
    console.log(id);
    console.log(a);
    console.log(b);
  }
  render() {
    return (
      <div>
          <Menu/>
          <div className={this.classNames.content}>
            <ReactTable
            data={ this.state.items }
            columns={[
              {
                Header: "Name",
                columns: [
                  { Header: "First Name", accessor: "name" },
                  { Header: "Last Name", accessor: "surname" }
                ]
              }, {
                Header: "Info",
                columns: [
                  { Header: "Age", accessor: "age" }
                ]
              }, {
                Header: "Options",
                columns: [
                  { 
                    Header: "Options", 
                    Cell: row =>(
                      <div>
                        <Button onClick={this.editItem.bind(this, row.id)} className={this.classNames.gridOptionButton} variant="contained" size="small"><SaveIcon/>Edit</Button>
                        <Button className={this.classNames.gridOptionButton} variant="contained" color="secondary" size="small"><DeleteIcon/>Delete</Button>
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
