import React from 'react';

const StyledComponents = require("../../../styles/StyledComponents/Detail").styles;
const ExternalClasses = require("../../../styles/ExternalClasses/Detail");

const LegalPersonDataFactory = require("../../../entities/Trading/Customers/LegalPersonDataFactory");

export default class LegalPersonDataComponent extends React.Component {
    constructor(props){        
        super(props);        
        let self=this;
        self.state = {
            data: LegalPersonDataFactory.create()
        };
    }
    dataChanged(prevProps){
        let self=this;
        for(var property in prevProps.data){
            if(prevProps.data[property] !== self.props.data[property])
                return true;
        }
        return false;
    }
    componentDidUpdate(prevProps){
        let self=this;
        if(self.dataChanged(prevProps))
            self.setState({data: self.props.data});        
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
                    value={this.state.data.BusinessName}
                    onChange={this.handleChange('BusinessName')}
                    id="LegalPersonData_BusinessName"
                    className={ExternalClasses.controls}
                  />
                  <LabelSizeS>Id <LabelRequired>*</LabelRequired></LabelSizeS>                    
                  <InputSizeL
                    type="text"
                    value={this.state.data.DocumentId}
                    onChange={this.handleChange('DocumentId')}
                    id="LegalPersonData_DocumentId"
                    className={ExternalClasses.controls}
                  />
                </div>
                <div>
                  <LabelSizeS>Phone <LabelRequired>*</LabelRequired></LabelSizeS>                    
                  <InputSizeL
                    type="text"
                    value={this.state.data.Phone}
                    onChange={this.handleChange('Phone')}
                    id="LegalPersonData_Phone"
                    className={ExternalClasses.controls}
                  />
                  <LabelSizeS>Email </LabelSizeS>                    
                  <InputSizeL
                    type="text"
                    value={this.state.data.Email}
                    onChange={this.handleChange('Email')}
                    id="LegalPersonData_Email"
                    className={ExternalClasses.controls}
                  />
                </div>
                <hr/>
              </div>
        );
    }
};