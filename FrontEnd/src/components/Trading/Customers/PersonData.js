import "../../../styles/Trading/Customers/Detail.css";

import React from 'react';

const PersonDataFactory = require("../../../entities/Trading/Customers/PersonDataFactory");
const Type = require("../../../entities/Trading/Customers/Type");
const ControlsUtils = require("../../../utils/Controls");
const DetailClasses = require("../../../styles/Detail");
const Events = require('../../../events/Trading/Customers');

export default class PersonDataComponent extends React.Component {
    constructor(props){
        super(props);
        let self=this;
        this.state = {
            data: PersonDataFactory.create()
        };
        global.eventManager.on(
            Events.GetOne,
            function(result){
                var personData = PersonDataFactory.create();
                if(result && result.Type === Type.Person)
                    personData = result.PersonData;
                self.setState({ data: personData });
            }
        );
    }
    componentWillReceiveProps(newProps) {
        if(newProps && newProps.enabled)
            ControlsUtils.ShowElement("PersonData");
        else
            ControlsUtils.HideElement("PersonData");
    }
    handleChange = (name) => event => {
        let self=this;
        let personData = this.state.data;
        personData[name] = event.target.value;
        this.setState({ data: personData });
        this.props.onChange(personData);
    };
    render(){
        return (
            <div id="PersonData">
                <div className={DetailClasses.formSection}>
                  <label className={DetailClasses.controls.size.S}>Name <label className={DetailClasses.labels.required}>*</label></label>                    
                  <input
                    type="text"
                    label="Name"
                    className={DetailClasses.controls.size.L}
                    value={this.state.data.Name}
                    onChange={this.handleChange('Name')}
                  />
                  <label className={DetailClasses.controls.size.S}>Surname <label className={DetailClasses.labels.required}>*</label></label>
                  <input
                    type="text"
                    label="Surname"
                    className={DetailClasses.controls.size.L}
                    value={this.state.data.Surname}
                    onChange={this.handleChange('Surname')}
                  />
                  <label className={DetailClasses.controls.size.S}>Id <label className={DetailClasses.labels.required}>*</label></label>
                  <input
                    type="text"
                    label="DocumentId"
                    className={DetailClasses.controls.size.M}
                    value={this.state.data.DocumentId}
                    onChange={this.handleChange('DocumentId')}
                  />
                </div>
                <div className={DetailClasses.formSection}>
                  <label className={DetailClasses.controls.size.S}>Phone <label className={DetailClasses.labels.required}>*</label></label>
                  <input
                    type="text"
                    label="Phone"
                    className={DetailClasses.controls.size.L}
                    value={this.state.data.Phone}
                    onChange={this.handleChange('Phone')}
                  />
                  <label className={DetailClasses.controls.size.S}>Email <label className={DetailClasses.labels.required}>*</label></label>
                  <input
                    type="text"
                    label="Email"
                    className={DetailClasses.controls.size.L}
                    value={this.state.data.Email}
                    onChange={this.handleChange('Email')}
                  />
                </div>
            </div>
        );
    }
};