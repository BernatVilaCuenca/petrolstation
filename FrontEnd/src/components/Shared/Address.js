import React from 'react';
import _ from 'lodash';

const StyledComponents = require("../../styles/StyledComponents/Detail").styles;
const ExternalClasses = require("../../styles/ExternalClasses/Detail");
const AddressFactory = require("../../entities/Trading/Customers/AddressFactory");
const StringUtils = require("../../utils/String");

export default class AddressComponent extends React.Component {
    constructor(props){
        super(props);
        let self=this;
        self.state = {
            data: AddressFactory.create(),
            towns: [],
            index: 0
        };
    }
    componentDidUpdate(){
        let self=this;

        let oldIndex = self.state.index;
        let newIndex = self.props.index;
        if(oldIndex !== newIndex){
            self.setState({index: newIndex});
        }

        let oldData = self.state.data;
        let newData = self.props.data;
        if(! _.isEqual(oldData, newData)){
            if(newData === null) newData = AddressFactory.create();
            for(var property in newData){
                if(
                    newData.hasOwnProperty(property) &&
                    newData[property] === null
                )
                    newData[property] = StringUtils.Empty;
            }
            self.setState({data: newData});
            self.setTownsListForDepartment(newData.DepartmentId);
        }
    }
    setTownsListForDepartment(departmentId){
        let self = this;
        let towns = [];        
        for(let iDepartment in global.departments){
            let department = global.departments[iDepartment];
            if(department._id === departmentId){
                towns = department.Towns;
                break;
            }
        }
        self.setState({ 
            towns
        }); 
    }
    handleDepartmentChange = () => event => {
        let self=this;
        let address = self.state.data;
        address.DepartmentId = event.target.value;
        self.setTownsListForDepartment(address.DepartmentId);
        self.setState({ 
            data: address
        });
        self.props.onChange(self.props.index, address);        
    };
    handleChange = (name) => event => {
        let self=this;
        let address = self.state.data;
        address[name] = event.target.value;
        self.setState({ data: address });
        self.props.onChange(self.props.index, address);
    };
    delete = () => {
        let self=this;
        self.props.onDelete(self.props.index)
    }
    render(){        
        let self = this;
        const ImageButton = StyledComponents.buttons.image;
        const LabelSizeXS = StyledComponents.labels.XS;
        const LabelSizeS = StyledComponents.labels.S;
        const LabelSizeM = StyledComponents.labels.M;
        const LabelRequired = StyledComponents.labels.required;
        const InputSizeXS = StyledComponents.inputs.XS;
        const InputSizeM = StyledComponents.inputs.M;
        const InputSizeL = StyledComponents.inputs.L;
        const InputSizeXXL = StyledComponents.inputs.XXL;
        const SelectSizeL = StyledComponents.selects.L;
        
        let index = self.props.index;
        const controlId = {
            DepartmentId: `Address_DepartmentId_${index}`,
            TownId: `Address_TownId_${index}`,
            PostCode: `Address_PostCode_${index}`,
            StreetName: `Address_StreetName_${index}`,
            HouseNumber: `Address_HouseNumber_${index}`,
            FlatNumber: `Address_FlatNumber_${index}`,
            Door: `Address_Door_${index}`,
            Others: `Address_Others_${index}`
        };
        return (                            
            <div key={index} id={`Address_${index}`} >
                <div>
                    <LabelSizeS>Department <LabelRequired>*</LabelRequired></LabelSizeS>
                    <SelectSizeL 
                        value={self.state.data.DepartmentId} 
                        onChange={self.handleDepartmentChange()}
                        id={controlId.DepartmentId} 
                        className={ExternalClasses.controls}
                    >
                        <option value="">Select an option ...</option>
                    {                                        
                        global.departments.map(function(department){
                            return(<option key={department._id} value={department._id}>{department.Name}</option>);
                        })
                    }
                    </SelectSizeL>
                    <LabelSizeS>Town <LabelRequired>*</LabelRequired></LabelSizeS>
                    <SelectSizeL 
                        value={self.state.data.TownId} 
                        id={controlId.TownId} 
                        onChange={self.handleChange('TownId')}
                        className={ExternalClasses.controls}
                    >
                        <option value="">Select an option ...</option>
                    {
                        self.state.towns.map(function(town){
                            return(<option key={town._id} value={town._id}>{town.Name}</option>);
                        })
                    }
                    </SelectSizeL>
                    <LabelSizeM>PostCode <LabelRequired>*</LabelRequired></LabelSizeM>
                    <InputSizeM
                        type="text"
                        value={self.state.data.PostCode}
                        id={controlId.PostCode} 
                        onChange={self.handleChange('PostCode')}
                        className={ExternalClasses.controls}
                    />
                </div>
                <div>
                    <LabelSizeS>Street <LabelRequired>*</LabelRequired></LabelSizeS>
                    <InputSizeL
                        type="text"
                        value={self.state.data.StreetName}
                        id={controlId.StreetName} 
                        onChange={self.handleChange('StreetName')}
                        className={ExternalClasses.controls}
                    />
                    <LabelSizeS>Building <LabelRequired>*</LabelRequired></LabelSizeS>
                    <InputSizeXS
                        type="text"
                        value={self.state.data.HouseNumber}
                        id={controlId.HouseNumber} 
                        onChange={self.handleChange('HouseNumber')}
                        className={ExternalClasses.controls}
                    />
                    <LabelSizeXS>Flat</LabelSizeXS>
                    <InputSizeXS
                        type="text"
                        value={self.state.data.FlatNumber}
                        id={controlId.FlatNumber} 
                        onChange={self.handleChange('FlatNumber')}
                        className={ExternalClasses.controls}
                    />
                    <LabelSizeXS>Door</LabelSizeXS>
                    <InputSizeXS
                        type="text"
                        value={self.state.data.Door}
                        id={controlId.Door} 
                        onChange={self.handleChange('Door')}
                        className={ExternalClasses.controls}
                    />
                </div>
                <div>
                    <LabelSizeS>Others</LabelSizeS>
                    <InputSizeXXL
                        type="text"
                        value={self.state.data.Others}
                        id={controlId.Others} 
                        onChange={self.handleChange('Others')}
                        className={ExternalClasses.controls}
                    />                                    
                    {
                        self.state.data.hasOwnProperty('Deletable') && self.state.data.Deletable ?
                        <ImageButton 
                            onClick={self.delete} 
                            className={ExternalClasses.buttons.delete}
                        ></ImageButton>
                        : null
                    }
                </div>
                <br/>
            </div>
        );
    }
};