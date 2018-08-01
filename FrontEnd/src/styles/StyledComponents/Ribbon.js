import Styled from 'styled-components';

const data = {
    buttons: {
        image: Styled.div`
            float:left;
            margin-top: 20px; 
            margin-left: 10px; 
            padding-left: 2px;
            border-radius: 5px;
            width:30px;
            cursor: pointer;
            &:hover {
                background-color: #D9E8DD
            }
        `
    },
    title: Styled.div`float: left; margin-left: 10px; font-weight: bold`,
    ribbon: Styled.div`float: left; width: 90%`
};
export const styles = data;