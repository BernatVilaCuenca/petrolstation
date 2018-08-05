import Styled from 'styled-components';

const data = {
    inputs: {
        XS: Styled.input`width: 60px; margin-right: 5px; display: inline-block;`,
        S: Styled.input`width: 90px; margin-right: 5px; display: inline-block;`,
        M: Styled.input`width: 115px; margin-right: 5px; display: inline-block;`,
        L: Styled.input`width: 210px; margin-right: 5px; display: inline-block;`,
        XL: Styled.input`width: 260px; margin-right: 5px; display: inline-block;`,
        XXL: Styled.input`width: 595px; margin-right: 5px; display: inline-block;`
    },
    buttons: {
        S: Styled.button`width: 85px; margin-right: 5px; cursor: pointer`,
        image: Styled.span`margin-right: 5px; cursor: pointer`
    },
    labels: {
        XS: Styled.label`width: 60px; margin-right: 5px; display: inline-block;`,
        S: Styled.label`width: 90px; margin-right: 5px; display: inline-block;`,
        M: Styled.label`width: 115px; margin-right: 5px; display: inline-block;`,
        L: Styled.label`width: 210px; margin-right: 5px; display: inline-block;`,
        XL: Styled.label`width: 260px; margin-right: 5px; display: inline-block;`,
        XXL: Styled.label`width: 595px; margin-right: 5px; display: inline-block;`,
        required: Styled.label`color: red; font-weight: bold`
    },
    selects: {
        XS: Styled.select`width: 60px; margin-right: 5px; display: inline-block;`,
        S: Styled.select`width: 90px; margin-right: 5px; display: inline-block;`,
        M: Styled.select`width: 115px; margin-right: 5px; display: inline-block;`,
        L: Styled.select`width: 210px; margin-right: 5px; display: inline-block;`,
        XL: Styled.select`width: 260px; margin-right: 5px; display: inline-block;`,
        XXL: Styled.select`width: 595px; margin-right: 5px; display: inline-block;`,
        required: Styled.select`color: red; font-weight: bold`
    },
    title: Styled.h3`font-weight: bold`,
    subTitle: Styled.h4`font-weight: bold; color:#808080`,
    form: Styled.div`display:block; float:left; width:80vw; padding-left:10px`
};
export const styles = data;