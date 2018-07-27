import Styled from 'styled-components';

const data = {
    inputs: {
        XS: Styled.input`width: 50px; margin-right: 5px`,
        S: Styled.input`width: 80px; margin-right: 5px`,
        M: Styled.input`width: 115px; margin-right: 5px`,
        L: Styled.input`width: 215px; margin-right: 5px`,
        XL: Styled.input`width: 330px; margin-right: 5px`
    },
    buttons: {
        S: Styled.button`width: 80px; margin-right: 5px; cursor: pointer`,
        image: Styled.span`margin-right: 5px; cursor: pointer`
    },
    labels: {
        XS: Styled.label`width: 50px; margin-right: 5px`,
        S: Styled.label`width: 80px; margin-right: 5px`,
        M: Styled.label`width: 115px; margin-right: 5px`,
        L: Styled.label`width: 215px; margin-right: 5px`,
        XL: Styled.label`width: 330px; margin-right: 5px`,
        required: Styled.label`{ color: red; font-weight: bold}`
    },
    selects: {
        XS: Styled.select`width: 50px; margin-right: 5px`,
        S: Styled.select`width: 80px; margin-right: 5px`,
        M: Styled.select`width: 115px; margin-right: 5px`,
        L: Styled.select`width: 215px; margin-right: 5px`,
        XL: Styled.select`width: 330px; margin-right: 5px`,
        required: Styled.select`{ color: red; font-weight: bold}`
    },
    title: Styled.h3`{font-weight: bold}`,
    subTitle: Styled.h4`{font-weight: bold; color:#808080}`
};
export const styles = data;