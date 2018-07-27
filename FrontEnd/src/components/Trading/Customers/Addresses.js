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
        this.state = {
            data: []
        };
        global.eventManager.on(
            Events.GetOne,
            function(result){
                if(result)
                    self.setState({ data: result.Addresses });
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
    handleDepartmentChange = (index) => event => {
        let self=this;
        let addresses = self.state.data;
        addresses[index].DepartmentId = event.target.value;
        self.setState({ data: addresses });
        self.props.onChange(addresses);

        for(var department in global.departments){
            if(department._id === event.target.value)
                ControlUtils.AppendOptionsToSelectControl(
                    `TownId${index}`, 
                    department.Towns, 
                    {Text: 'Name', Value: '_id'}
                );            
        }        
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
        const LabelSizeS = StyledComponents.labels.S;
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
                        onClick={this.addContact} 
                        className={ExternalClasses.buttons.add}
                        aria-hidden="true"
                        style={StyleAlignedImageButton}
                    ></ImageButton>
                </div>
                {
                    this.state.data.map(function(address, index){
                        const controlId = {
                            DepartmentId: `DepartmentId${index}`,
                            TownId: `TownId${index}`,
                            PostCode: `PostCode${index}`,
                            StreetName: `StreetName${index}`,
                            HouseNumber: `HouseNumber${index}`,
                            FlatNumber: `FlatNumber${index}`,
                            Door: `Door${index}`,
                            Others: `Others${index}`
                        };
                        return (
                            <div key={index}>
                                <div>
                                    <LabelSizeS>Department <LabelRequired>*</LabelRequired></LabelSizeS>
                                    <SelectSizeL 
                                        value={address.DepartmentId} 
                                        onChange={self.handleDepartmentChange}
                                        id={controlId.DepartmentId} 
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
                                        onChange={self.handleChange(controlId.TownId, index)}
                                    >
                                        <option value="">Select an option ...</option>
                                    </SelectSizeL>
                                    <LabelSizeS>PostCode <LabelRequired>*</LabelRequired></LabelSizeS>
                                    <InputSizeM
                                        type="text"
                                        label="PostCode"
                                        value={address.PostCode}
                                        id={controlId.PostCode} 
                                        onChange={self.handleChange(controlId.PostCode, index)}
                                    />
                                </div>
                                <div>
                                    <LabelSizeS>Street <LabelRequired>*</LabelRequired></LabelSizeS>
                                    <InputSizeL
                                        type="text"
                                        label="StreetName"
                                        value={address.StreetName}
                                        id={controlId.StreetName} 
                                        onChange={self.handleChange(controlId.StreetName, index)}
                                    />
                                    <LabelSizeS>Building number <LabelRequired>*</LabelRequired></LabelSizeS>
                                    <InputSizeXS
                                        type="text"
                                        label="HouseNumber"
                                        value={address.HouseNumber}
                                        id={controlId.HouseNumber} 
                                        onChange={self.handleChange(controlId.HouseNumber, index)}
                                    />
                                    <LabelSizeS>Flat</LabelSizeS>
                                    <InputSizeXS
                                        type="text"
                                        label="FlatNumber"
                                        value={address.FlatNumber}
                                        id={controlId.FlatNumber} 
                                        onChange={self.handleChange(controlId.FlatNumber, index)}
                                    />
                                    <LabelSizeS>Door</LabelSizeS>
                                    <InputSizeXS
                                        type="text"
                                        label="Door"
                                        value={address.Door}
                                        id={controlId.Door} 
                                        onChange={self.handleChange(controlId.Door, index)}
                                    />
                                </div>
                                <div>
                                    <LabelSizeS>Others</LabelSizeS>
                                    <InputSizeL
                                        type="text"
                                        label="Others"
                                        value={address.Others}
                                        id={controlId.Others} 
                                        onChange={self.handleChange(controlId.Others, index)}
                                    />
                                    <ImageButton 
                                        onClick={self.deleteAddress(index)} 
                                        className={ExternalClasses.buttons.delete}
                                        aria-hidden="true"
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