import React from 'react';

const _ = require("lodash");
const StyledComponents = require("../../../styles/StyledComponents/Detail").styles;
const ExternalClasses = require("../../../styles/ExternalClasses/Detail");
const AddressFactory = require("../../../entities/Trading/Customers/AddressFactory");
const ArrayUtils = require("../../../utils/Array");
const StringUtils = require("../../../utils/String");

export default class AddressesComponent extends React.Component {
    constructor(props){
        super(props);
        let self=this;
        self.state = {
            data: [],
            towns: []
        };
    }
    createTownsListForDepartment(iAddress, departmentId){
        let self = this;
        let towns = self.state.towns;
        for(let iDepartment in global.departments){
            let department = global.departments[iDepartment];
            if(department._id === departmentId){
                towns[iAddress] = department.Towns;
                break;
            }
        }
        self.setState ({
            towns
        });
    }
    componentDidUpdate(){
        let self=this;
        let oldData = self.state.data;
        let newData = self.props.data;

        if(! ArrayUtils.isEqual(oldData, newData)){            
            for(let i in newData){
                if(newData[i] === null) newData[i] = AddressFactory.create();
                for(var property in newData[i]){
                    if(
                        newData[i].hasOwnProperty(property) &&
                        newData[i][property] === null
                    )
                        newData[i][property] = StringUtils.Empty;
                }
                self.createTownsListForDepartment(i, newData[i].DepartmentId);
            }            
            self.setState({ data: newData });            
        }
    }
    addAddress = () => {
        let self=this;        
        let addresses = self.state.data;
        addresses.push(AddressFactory.create());
        let towns = self.state.towns;
        towns.push([]);
        self.setState({ 
            data: addresses,
            towns
        });
    };
    deleteAddress = (index) => () => {
        let self=this;
        let addresses = self.state.data;
        addresses.splice(index, 1);
        let towns = self.state.towns;
        towns.splice(index, 1);
        self.setState({ 
            data: addresses,
            towns
        });
    };
    handleDepartmentChange = (index) => event => {
        let self=this;
        let addresses = self.state.data;
        addresses[index].DepartmentId = event.target.value;
        self.setState({ data: addresses });
        self.props.onChange(addresses);
        self.createTownsListForDepartment(index, addresses[index].DepartmentId);
    };
    handleChange = (name, index) => event => {
        let self=this;
        let addresses = self.state.data;
        addresses[index][name] = event.target.value;
        self.setState({ data: addresses });
        self.props.onChange(addresses);
    };
    render(){
        let self = this;
        const SubTitle = StyledComponents.subTitle;
        const ImageButton = StyledComponents.buttons.image;
        const LabelSizeXS = StyledComponents.labels.XS;
        const LabelSizeS = StyledComponents.labels.S;
        const LabelSizeM = StyledComponents.labels.M;
        const LabelRequired = StyledComponents.labels.required;
        const InputSizeXS = StyledComponents.inputs.XS;
        const InputSizeM = StyledComponents.inputs.M;
        const InputSizeL = StyledComponents.inputs.L;
        const SelectSizeL = StyledComponents.selects.L;
        
        const StyleAlignedElement = {float:'left', marginRight: '10px'};
        const StyleAlignedImageButton = {float:'left', marginRight: '10px', marginTop: '10px'};
        const StyleAlignedSection = {width:'100%', float:'left'};
        
        return (
            <div id="Contacts">
                <div style={StyleAlignedSection}>
                    <SubTitle style={StyleAlignedElement}>Addresses</SubTitle>
                    <ImageButton 
                        onClick={self.addAddress} 
                        className={ExternalClasses.buttons.add}
                        aria-hidden="true"
                        style={StyleAlignedImageButton}
                    ></ImageButton>
                </div>
                {
                    self.state.data.map(function(address, index){
                        const controlId = {
                            DepartmentId: `Address_DepartmentId${index}`,
                            TownId: `Address_TownId${index}`,
                            PostCode: `Address_PostCode${index}`,
                            StreetName: `Address_StreetName${index}`,
                            HouseNumber: `Address_HouseNumber${index}`,
                            FlatNumber: `Address_FlatNumber${index}`,
                            Door: `Address_Door${index}`,
                            Others: `Address_Others${index}`
                        };
                        return (
                            <div key={index}>
                                <div>
                                    <LabelSizeS>Department <LabelRequired>*</LabelRequired></LabelSizeS>
                                    <SelectSizeL 
                                        value={address.DepartmentId} 
                                        onChange={self.handleDepartmentChange(index)}
                                        id={controlId.DepartmentId} 
                                        className={ExternalClasses.controls}
                                    >
                                        <option value="">Seleccionar ...</option>
                                    {                                        
                                        global.departments.map(function(department){
                                            return(<option key={department._id} value={department._id}>{department.Name}</option>);
                                        })
                                    }
                                    </SelectSizeL>
                                    <LabelSizeS>Town <LabelRequired>*</LabelRequired></LabelSizeS>
                                    <SelectSizeL 
                                        value={address.TownId} 
                                        id={controlId.TownId} 
                                        onChange={self.handleChange('TownId', index)}
                                        className={ExternalClasses.controls}
                                    >
                                        <option value="">Select an option ...</option>
                                    {
                                        self.state.towns[index].map(function(town){
                                            return(<option key={town._id} value={town._id}>{town.Name}</option>);
                                        })
                                    }
                                    </SelectSizeL>
                                    <LabelSizeM>PostCode <LabelRequired>*</LabelRequired></LabelSizeM>
                                    <InputSizeM
                                        type="text"
                                        value={address.PostCode}
                                        id={controlId.PostCode} 
                                        onChange={self.handleChange('PostCode', index)}
                                        className={ExternalClasses.controls}
                                    />
                                </div>
                                <div>
                                    <LabelSizeS>Street <LabelRequired>*</LabelRequired></LabelSizeS>
                                    <InputSizeL
                                        type="text"
                                        value={address.StreetName}
                                        id={controlId.StreetName} 
                                        onChange={self.handleChange('StreetName', index)}
                                        className={ExternalClasses.controls}
                                    />
                                    <LabelSizeS>Building <LabelRequired>*</LabelRequired></LabelSizeS>
                                    <InputSizeXS
                                        type="text"
                                        value={address.HouseNumber}
                                        id={controlId.HouseNumber} 
                                        onChange={self.handleChange('HouseNumber', index)}
                                        className={ExternalClasses.controls}
                                    />
                                    <LabelSizeXS>Flat</LabelSizeXS>
                                    <InputSizeXS
                                        type="text"
                                        value={address.FlatNumber}
                                        id={controlId.FlatNumber} 
                                        onChange={self.handleChange('FlatNumber', index)}
                                        className={ExternalClasses.controls}
                                    />
                                    <LabelSizeXS>Door</LabelSizeXS>
                                    <InputSizeXS
                                        type="text"
                                        value={address.Door}
                                        id={controlId.Door} 
                                        onChange={self.handleChange('Door', index)}
                                        className={ExternalClasses.controls}
                                    />
                                </div>
                                <div>
                                    <LabelSizeS>Others</LabelSizeS>
                                    <InputSizeL
                                        type="text"
                                        value={address.Others}
                                        id={controlId.Others} 
                                        onChange={self.handleChange('Others', index)}
                                        className={ExternalClasses.controls}
                                    />
                                    <ImageButton 
                                        onClick={self.deleteAddress(index)} 
                                        className={ExternalClasses.buttons.delete}
                                    ></ImageButton>
                                </div>
                                <br/>
                            </div>
                        );
                    })
                }
                <hr/>
            </div>
        );
    }
};