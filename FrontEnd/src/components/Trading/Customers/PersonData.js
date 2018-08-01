import React from 'react';

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
    objectChanged(oldData, newData){
        let self=this;

        if(oldData === null && newData !== null) return true;
        if(oldData !== null && newData === null) return true;

        for(var property in oldData){
            if(
                oldData.hasOwnProperty(property) &&
                newData.hasOwnProperty(property) &&
                oldData[property] !== newData[property]
            )
                return true;
        }
        return false;
    }
    componentDidUpdate(prevProps){
        let self=this;

        let oldData = prevProps.data;
        let newData = self.props.data;

        if(self.objectChanged(oldData, newData)){
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