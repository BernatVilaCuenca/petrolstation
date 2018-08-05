import React from 'react';
import SaveIcon from '@material-ui/icons/Save';

const StyledComponents = require("../../../styles/StyledComponents/Ribbon").styles;

export default class Ribbon extends React.Component {
    render() {
        const Title = StyledComponents.title;
        const Ribbon = StyledComponents.ribbon;
        const ImageButton = StyledComponents.buttons.image;

        return (
            <Ribbon>
                <Title>
                    <h3>Company</h3>
                </Title>
                <ImageButton title="Save">
                    <SaveIcon onClick={ this.props.onSave } />
                </ImageButton>                
            </Ribbon>
        );
    }
}