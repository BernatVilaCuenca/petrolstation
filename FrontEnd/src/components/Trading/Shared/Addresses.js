import React from 'react';

import Address from "../../Shared/Address";

const StyledComponents = require("../../../styles/StyledComponents/Detail").styles;
const ExternalClasses = require("../../../styles/ExternalClasses/Detail");
const AddressFactory = require("../../../entities/Trading/Customers/AddressFactory");
const ArrayUtils = require("../../../utils/Array");

export default class AddressesComponent extends React.Component {
    constructor(props){
        super(props);
        let self=this;
        self.state = {
            data: []
        };
    }
    componentDidUpdate(){
        let self=this;
        let oldData = self.state.data;
        let newData = self.props.data;

        if(! ArrayUtils.isEqual(oldData, newData))
            self.setState({ data: newData });
    }
    addAddress = () => {
        let self=this;        
        let addresses = self.state.data;
        addresses.push(AddressFactory.create());        
        self.setState({ data: addresses });
    };
    onChangeAddress = (index, data) => {
        let self=this;
        let addresses = self.state.data;
        addresses[index] = data;
        self.setState({ data: addresses });
    };
    onDeleteAddress = (index) => {
        let self=this;
        let addresses = self.state.data;
        addresses.splice(index, 1);
        self.setState({ data: addresses });
    }
    render(){
        let self = this;
        const SubTitle = StyledComponents.subTitle;
        const ImageButton = StyledComponents.buttons.image;
                
        const StyleAlignedElement = {float:'left', marginRight: '10px'};
        const StyleAlignedImageButton = {float:'left', marginRight: '10px', marginTop: '10px'};
        const StyleAlignedSection = {width:'100%', float:'left'};
        
        return (
            <div id="Addresses">
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
                    self.state.data.map(
                        function(address, index){
                            return (
                                <Address 
                                    key={index}
                                    index={index} 
                                    data={address} 
                                    onChange={self.onChangeAddress}
                                    onDelete={self.onDeleteAddress}
                                />
                            );
                        }
                    )
                }
            </div>
        );
    }
};