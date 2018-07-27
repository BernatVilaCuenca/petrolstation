import React from 'react';

const StyledComponents = require("../../../styles/StyledComponents/Detail").styles;

const LegalPersonDataFactory = require("../../../entities/Trading/Customers/LegalPersonDataFactory");
const Type = require("../../../entities/Trading/Customers/Type");
const ControlsUtils = require("../../../utils/Controls");
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
        const LabelSizeS = StyledComponents.labels.S;
        const LabelRequired = StyledComponents.labels.required;
        const InputSizeL = StyledComponents.inputs.L;

        return (
            <div id="LegalPersonData">
                <div>
                  <LabelSizeS>Name <LabelRequired>*</LabelRequired></LabelSizeS>
                  <InputSizeL
                    type="text"
                    label="Name"
                    value={this.state.data.BusinessName}
                    onChange={this.handleChange('BusinessName')}
                  />
                  <LabelSizeS>Id <LabelRequired>*</LabelRequired></LabelSizeS>                    
                  <InputSizeL
                    type="text"
                    label="DocumentId"
                    value={this.state.data.DocumentId}
                    onChange={this.handleChange('DocumentId')}
                  />
                </div>
                <div>
                  <LabelSizeS>Phone <LabelRequired>*</LabelRequired></LabelSizeS>                    
                  <InputSizeL
                    type="text"
                    label="Phone"
                    value={this.state.data.Phone}
                    onChange={this.handleChange('Phone')}
                  />
                  <LabelSizeS>Email <LabelRequired>*</LabelRequired></LabelSizeS>                    
                  <InputSizeL
                    type="text"
                    label="Email"
                    value={this.state.data.Email}
                    onChange={this.handleChange('Email')}
                  />
                </div>
                <hr/>
              </div>
        );
    }
};