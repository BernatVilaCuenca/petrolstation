import React from 'react';

const StyledComponents = require("../../../styles/StyledComponents/Detail").styles;
const ExternalClasses = require("../../../styles/ExternalClasses/Detail");
const ContactFactory = require("../../../entities/Trading/Customers/ContactFactory");
const ArrayUtils = require("../../../utils/Array");
const StringUtils = require("../../../utils/String");

export default class ContactsComponent extends React.Component {
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

        if(! ArrayUtils.isEqual(oldData, newData)){
            for(let i in newData){
                if(newData[i] === null) newData[i] = ContactFactory.create();
                for(var property in newData[i]){
                    if(
                        newData[i].hasOwnProperty(property) &&
                        newData[i][property] === null
                    )
                        newData[i][property] = StringUtils.Empty;
                }
            }
            self.setState({data: newData});
        }
    }
    addContact = () => {
        let self=this;
        let contacts = self.state.data;
        contacts.push(ContactFactory.create())
        self.setState({ data: contacts });
    };
    deleteContact = (index) => () => {
        let self=this;
        let contacts = self.state.data;
        contacts.splice(index, 1);
        self.setState({ data: contacts });
    };
    handleChange = (name, index) => event => {
        let self=this;
        let contacts = self.state.data;
        contacts[index][name] = event.target.value;
        self.setState({ data: contacts });
        self.props.onChange(contacts);
    };
    render(){
        let self = this;
        const SubTitle = StyledComponents.subTitle;
        const ImageButton = StyledComponents.buttons.image;
        const LabelSizeM = StyledComponents.labels.M;
        const LabelRequired = StyledComponents.labels.required;
        const InputSizeM = StyledComponents.inputs.M;
        const InputSizeL = StyledComponents.inputs.L;
        const InputSizeXL = StyledComponents.inputs.XL;
        
        const StyleAlignedElement = {float:'left', marginRight: '10px'};
        const StyleAlignedImageButton = {float:'left', marginRight: '10px', marginTop: '10px'};
        const StyleAlignedSection = {width:'100%', float:'left'};
        
        return (
            <div id="Contacts">
                <div style={StyleAlignedSection}>
                    <SubTitle style={StyleAlignedElement}>Contacts</SubTitle>
                    <ImageButton 
                        onClick={this.addContact} 
                        className={ExternalClasses.buttons.add}
                        aria-hidden="true"
                        style={StyleAlignedImageButton}
                    ></ImageButton>
                </div>
                {
                    this.state.data.map(function(contact, index){
                        const controlId = {
                            Name: `Contacts_Name_${index}`,
                            Surname: `Contacts_Surname_${index}`,
                            DocumentId: `Contacts_DocumentId_${index}`,
                            Phone: `Contacts_Phone_${index}`,
                            Email: `Contacts_Email_${index}`
                        };
                        return (
                            <div key={index} id={`Contact_${index}`}>
                                <div>
                                    <LabelSizeM>Name <LabelRequired>*</LabelRequired></LabelSizeM>
                                    <InputSizeL
                                        type="text"
                                        value={contact.Name}
                                        onChange={self.handleChange('Name', index)}
                                        id={controlId.Name}
                                        className={ExternalClasses.controls}
                                    />
                                    <LabelSizeM>Surname <LabelRequired>*</LabelRequired></LabelSizeM>
                                    <InputSizeXL
                                        type="text"
                                        value={contact.Surname}
                                        onChange={self.handleChange('Surname', index)}
                                        id={controlId.Surname}
                                        className={ExternalClasses.controls}
                                    />
                                    <LabelSizeM>Document Id <LabelRequired>*</LabelRequired></LabelSizeM>
                                    <InputSizeM
                                        type="text"
                                        value={contact.DocumentId}
                                        onChange={self.handleChange('DocumentId', index)}
                                        id={controlId.DocumentId}
                                        className={ExternalClasses.controls}
                                    />
                                </div>
                                <div>
                                    <LabelSizeM>Phone <LabelRequired>*</LabelRequired></LabelSizeM>
                                    <InputSizeL
                                        type="text"
                                        value={contact.Phone}
                                        onChange={self.handleChange('Phone', index)}
                                        id={controlId.Phone}
                                        className={ExternalClasses.controls}
                                    />
                                    <LabelSizeM>Email </LabelSizeM>
                                    <InputSizeXL
                                        type="text"
                                        value={contact.Email}
                                        onChange={self.handleChange('Email', index)}
                                        id={controlId.Email}
                                        className={ExternalClasses.controls}
                                    />
                                    <ImageButton 
                                        onClick={self.deleteContact(index)} 
                                        className={ExternalClasses.buttons.delete}
                                    ></ImageButton>
                                </div>
                                <br/>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
};