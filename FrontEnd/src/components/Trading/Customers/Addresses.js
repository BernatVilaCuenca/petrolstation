import React from 'react';

const StyledComponents = require("../../../styles/StyledComponents/Detail").styles;
const ExternalClasses = require("../../../styles/ExternalClasses/Detail");

const Events = require('../../../events/Trading/Customers');
const AddressFactory = require("../../../entities/Trading/Customers/AddressFactory");
const ControlUtils = require("../../../utils/Controls");

export default class AddressesComponent extends React.Component {
    constructor(props){
        super(props);
        let self=this;
        self.state = {
            data: []
        };
        global.eventManager.on(
            Events.GetOne,
            function(result){
                self.setState({ 
                    data: result.Addresses,
                    currentId: result._id 
                });
                for(let index in result.Addresses)
                    self.appendTownsOnSelectDepartment (index);                
            }
        );
    }
    addAddress = () => {
        let self=this;
        let addresses = self.state.data;
        addresses.push(AddressFactory.create())
        self.setState({ data: addresses });
    };
    deleteAddress = (index) => () => {
        let self=this;
        let addresses = self.state.data;
        addresses.splice(index, 1);
        self.setState({ data: addresses });
    };
    appendTownsOnSelectDepartment = (index) => {
        let self=this;
        let addresses = self.state.data;
        let selectedDepartment = addresses[index].DepartmentId;
        
        for(let iDepartment in global.departments)
            if(global.departments[iDepartment]._id === selectedDepartment){
                ControlUtils.appendOptionsToSelectControl(
                    `Address_TownId${index}`, 
                    global.departments[iDepartment].Towns, 
                    addresses[index].TownId,
                    {Text: 'Name', Value: '_id'}
                );
                break;
            }     
    };
    handleDepartmentChange = (index) => event => {
        let self=this;
        let addresses = self.state.data;
        addresses[index].DepartmentId = event.target.value;
        self.setState({ data: addresses });
        self.props.onChange(addresses);
        self.appendTownsOnSelectDepartment(index);        
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
                        onClick={this.addAddress} 
                        className={ExternalClasses.buttons.add}
                        aria-hidden="true"
                        style={StyleAlignedImageButton}
                    ></ImageButton>
                </div>
                {
                    this.state.data.map(function(address, index){
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