import React from 'react';
import AddCustomerIcon from '@material-ui/icons/PersonAdd';

const StyledComponents = require("../../../styles/StyledComponents/Ribbon").styles;

export default class Ribbon extends React.Component {
    render() {
        const Title = StyledComponents.title;
        const Ribbon = StyledComponents.ribbon;
        const ImageButton = StyledComponents.buttons.image;

        return (
            <Ribbon>
                <Title>
                    <h3>Customers</h3>
                </Title>
                <ImageButton title="Add new customer">
                    <AddCustomerIcon onClick={ this.props.onNewItem } />
                </ImageButton>                
            </Ribbon>
        );
    }
}