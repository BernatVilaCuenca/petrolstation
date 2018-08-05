import React from 'react';

const _ = require("lodash");
const StyledComponents = require("../../../styles/StyledComponents/Detail").styles;
const ExternalClasses = require("../../../styles/ExternalClasses/Detail");
const PersonDataFactory = require("../../../entities/Trading/Customers/PersonDataFactory");
const StringUtils = require("../../../utils/String");

export default class PersonDataComponent extends React.Component {
    constructor(props){
        super(props);
        let self=this;
        self.state = {
            data: PersonDataFactory.create()
        };
    }
    componentDidUpdate(){
        let self=this;

        let oldData = self.state.data;
        let newData = self.props.data;

        if(! _.isEqual(oldData, newData)){
            if(newData === null) newData = PersonDataFactory.create();
            for(var property in newData){
                if(
                    newData.hasOwnProperty(property) &&
                    newData[property] === null
                )
                    newData[property] = StringUtils.Empty;
            }
            self.setState({data: newData});
        }
    }
    handleChange = (name) => event => {
        let self=this;
        let personData = self.state.data;
        personData[name] = event.target.value;
        self.setState({ data: personData });
        self.props.onChange(personData);
    };
    render(){
        const LabelSizeM = StyledComponents.labels.M;
        const LabelRequired = StyledComponents.labels.required;
        const InputSizeM = StyledComponents.inputs.M;
        const InputSizeL = StyledComponents.inputs.L;
        const InputSizeXL = StyledComponents.inputs.XL;

        return (
            <div id="PersonData">
                <div>
                  <LabelSizeM>Name <LabelRequired>*</LabelRequired></LabelSizeM>
                  <InputSizeL
                    type="text"
                    value={this.state.data.Name}
                    onChange={this.handleChange('Name')}
                    id="PersonData_Name"
                    className={ExternalClasses.controls}
                  />
                  <LabelSizeM>Surname <LabelRequired>*</LabelRequired></LabelSizeM>
                  <InputSizeXL
                    type="text"
                    value={this.state.data.Surname}
                    onChange={this.handleChange('Surname')}
                    id="PersonData_Surname"
                    className={ExternalClasses.controls}
                  />
                  <LabelSizeM>Document Id <LabelRequired>*</LabelRequired></LabelSizeM>
                  <InputSizeM
                    type="text"
                    value={this.state.data.DocumentId}
                    onChange={this.handleChange('DocumentId')}
                    id="PersonData_DocumentId"
                    className={ExternalClasses.controls}
                  />
                </div>
                <div>
                  <LabelSizeM>Phone <LabelRequired>*</LabelRequired></LabelSizeM>
                  <InputSizeL
                    type="text"
                    value={this.state.data.Phone}
                    onChange={this.handleChange('Phone')}
                    id="PersonData_Phone"
                    className={ExternalClasses.controls}
                  />
                  <LabelSizeM>Email </LabelSizeM>
                  <InputSizeXL
                    type="text"
                    value={this.state.data.Email}
                    onChange={this.handleChange('Email')}
                    id="PersonData_Email"
                    className={ExternalClasses.controls}
                  />
                </div>
            </div>
        );
    }
};