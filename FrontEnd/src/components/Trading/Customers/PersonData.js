import React from 'react';

const StyledComponents = require("../../../styles/StyledComponents/Detail").styles;
const ExternalClasses = require("../../../styles/ExternalClasses/Detail");

const PersonDataFactory = require("../../../entities/Trading/Customers/PersonDataFactory");
const Type = require("../../../entities/Trading/Customers/Type");
const ControlsUtils = require("../../../utils/Controls");
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
            ControlsUtils.showElement("PersonData");
        else
            ControlsUtils.hideElement("PersonData");
    }
    handleChange = (name) => event => {
        let personData = this.state.data;
        personData[name] = event.target.value;
        this.setState({ data: personData });
        this.props.onChange(personData);
    };
    render(){

        const LabelSizeS = StyledComponents.labels.S;
        const LabelRequired = StyledComponents.labels.required;
        const InputSizeL = StyledComponents.inputs.L;
        const InputSizeM = StyledComponents.inputs.M;

        return (
            <div id="PersonData">
                <div>
                  <LabelSizeS>Name <LabelRequired>*</LabelRequired></LabelSizeS>
                  <InputSizeL
                    type="text"
                    value={this.state.data.Name}
                    onChange={this.handleChange('Name')}
                    id="PersonData_Name"
                    className={ExternalClasses.controls}
                  />
                  <LabelSizeS>Surname <LabelRequired>*</LabelRequired></LabelSizeS>
                  <InputSizeL
                    type="text"
                    value={this.state.data.Surname}
                    onChange={this.handleChange('Surname')}
                    id="PersonData_Surname"
                    className={ExternalClasses.controls}
                  />
                  <LabelSizeS>Id <LabelRequired>*</LabelRequired></LabelSizeS>
                  <InputSizeM
                    type="text"
                    value={this.state.data.DocumentId}
                    onChange={this.handleChange('DocumentId')}
                    id="PersonData_DocumentId"
                    className={ExternalClasses.controls}
                  />
                </div>
                <div>
                  <LabelSizeS>Phone <LabelRequired>*</LabelRequired></LabelSizeS>
                  <InputSizeL
                    type="text"
                    value={this.state.data.Phone}
                    onChange={this.handleChange('Phone')}
                    id="PersonData_Phone"
                    className={ExternalClasses.controls}
                  />
                  <LabelSizeS>Email </LabelSizeS>
                  <InputSizeL
                    type="text"
                    value={this.state.data.Email}
                    onChange={this.handleChange('Email')}
                    id="PersonData_Email"
                    className={ExternalClasses.controls}
                  />
                </div>
                <hr/>
            </div>
        );
    }
};