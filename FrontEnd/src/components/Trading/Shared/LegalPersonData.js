import React from 'react';

const _ = require("lodash");
const StyledComponents = require("../../../styles/StyledComponents/Detail").styles;
const ExternalClasses = require("../../../styles/ExternalClasses/Detail");
const LegalPersonDataFactory = require("../../../entities/Trading/Customers/LegalPersonDataFactory");
const StringUtils = require("../../../utils/String");

export default class LegalPersonDataComponent extends React.Component {
    constructor(props){        
        super(props);        
        let self=this;
        self.state = {
            data: LegalPersonDataFactory.create()
        };
    }
    componentDidUpdate(){
        let self=this;

        let oldData = self.state.data;
        let newData = self.props.data;

        if(! _.isEqual(oldData, newData)){
            if(newData === null) newData = LegalPersonDataFactory.create();
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
        let legalPersonData = self.state.data;
        legalPersonData[name] = event.target.value;
        self.setState({ data: legalPersonData });
        self.props.onChange(legalPersonData);
    };
    render(){
        const LabelSizeM = StyledComponents.labels.M;
        const LabelRequired = StyledComponents.labels.required;
        const InputSizeM = StyledComponents.inputs.M;
        const InputSizeL = StyledComponents.inputs.L;
        const InputSizeXL = StyledComponents.inputs.XL;

        return (
            <div id="LegalPersonData">
                <div>
                  <LabelSizeM>Name <LabelRequired>*</LabelRequired></LabelSizeM>
                  <InputSizeL
                    type="text"
                    value={this.state.data.BusinessName}
                    onChange={this.handleChange('BusinessName')}
                    id="LegalPersonData_BusinessName"
                    className={ExternalClasses.controls}
                  />
                  <LabelSizeM>Id <LabelRequired>*</LabelRequired></LabelSizeM>                    
                  <InputSizeM
                    type="text"
                    value={this.state.data.DocumentId}
                    onChange={this.handleChange('DocumentId')}
                    id="LegalPersonData_DocumentId"
                    className={ExternalClasses.controls}
                  />
                </div>
                <div>
                  <LabelSizeM>Phone <LabelRequired>*</LabelRequired></LabelSizeM>                    
                  <InputSizeL
                    type="text"
                    value={this.state.data.Phone}
                    onChange={this.handleChange('Phone')}
                    id="LegalPersonData_Phone"
                    className={ExternalClasses.controls}
                  />
                  <LabelSizeM>Email </LabelSizeM>                    
                  <InputSizeXL
                    type="text"
                    value={this.state.data.Email}
                    onChange={this.handleChange('Email')}
                    id="LegalPersonData_Email"
                    className={ExternalClasses.controls}
                  />
                </div>
            </div>
        );
    }
};