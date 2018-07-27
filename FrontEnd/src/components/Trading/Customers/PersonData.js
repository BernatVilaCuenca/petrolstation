import React from 'react';

const StyledComponents = require("../../../styles/StyledComponents/Detail").styles;

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
                    label="Name"
                    value={this.state.data.Name}
                    onChange={this.handleChange('Name')}
                  />
                  <LabelSizeS>Surname <LabelRequired>*</LabelRequired></LabelSizeS>
                  <InputSizeL
                    type="text"
                    label="Surname"
                    value={this.state.data.Surname}
                    onChange={this.handleChange('Surname')}
                  />
                  <LabelSizeS>Id <LabelRequired>*</LabelRequired></LabelSizeS>
                  <InputSizeM
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