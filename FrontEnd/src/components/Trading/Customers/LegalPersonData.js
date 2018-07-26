import "../../../styles/Trading/Customers/Detail.css";

import React from 'react';

const LegalPersonDataFactory = require("../../../entities/Trading/Customers/LegalPersonDataFactory");
const Type = require("../../../entities/Trading/Customers/Type");
const ControlsUtils = require("../../../utils/Controls");
const DetailClasses = require("../../../styles/Detail");
const Events = require('../../../events/Trading/Customers');

export default class LegalPersonDataComponent extends React.Component {
    constructor(props){
        super(props);
        let self=this;
        this.state = {
            data: LegalPersonDataFactory.create()
        };
        global.eventManager.on(
            Events.GetOne,
            function(result){
                var legalPersonData = LegalPersonDataFactory.create();
                if(result && result.Type === Type.LegalPerson)
                legalPersonData = result.LegalPersonData;
                self.setState({ data: legalPersonData });
            }
        );
    }
    componentWillReceiveProps(newProps) {
        if(newProps && newProps.enabled)
            ControlsUtils.ShowElement("LegalPersonData");
        else
            ControlsUtils.HideElement("LegalPersonData");
    }
    handleChange = (name) => event => {
        let self=this;
        let legalPersonData = self.state.data;
        legalPersonData[name] = event.target.value;
        self.setState({ data: legalPersonData });
        self.props.onChange(legalPersonData);
    };
    render(){
        return (
            <div id="LegalPersonData">
                <div className={DetailClasses.formSection}>
                  <label className={DetailClasses.controls.size.S}>Name <label className={DetailClasses.labels.required}>*</label></label>                    
                  <input
                    type="text"
                    label="Name"
                    className={DetailClasses.controls.size.L}
                    value={this.state.data.BusinessName}
                    onChange={this.handleChange('BusinessName')}
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