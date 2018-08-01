import React from 'react';

const StyledComponents = require("../../../styles/StyledComponents/Detail").styles;
const ExternalClasses = require("../../../styles/ExternalClasses/Detail");

const ControlsUtils = require("../../../utils/Controls");
const Events = require('../../../events/Trading/Customers');
const ContactFactory = require("../../../entities/Trading/Customers/ContactFactory");

export default class ContactsComponent extends React.Component {
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
                    data: result.Contacts,
                    currentId: result._id
                });                
            }
        );
    }
    componentWillReceiveProps(newProps) {
        if(newProps && newProps.enabled)
            ControlsUtils.showElement("Contacts");
        else
            ControlsUtils.hideElement("Contacts");
    };
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
        const LabelSizeS = StyledComponents.labels.S;
        const LabelSizeM = StyledComponents.labels.M;
        const LabelRequired = StyledComponents.labels.required;
        const InputSizeL = StyledComponents.inputs.L;
        const InputSizeM = StyledComponents.inputs.M;
        
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
                            Name: `Contacts_Name${index}`,
                            Surname: `Contacts_Surname${index}`,
                            DocumentId: `Contacts_DocumentId${index}`,
                            Phone: `Contacts_Phone${index}`,
                            Email: `Contacts_Email${index}`
                        };
                        return (
                            <div key={index}>
                                <div>
                                    <LabelSizeS>Name <LabelRequired>*</LabelRequired></LabelSizeS>
                                    <InputSizeL
                                        type="text"
                                        value={contact.Name}
                                        onChange={self.handleChange('Name', index)}
                                        id={controlId.Name}
                                        className={ExternalClasses.controls}
                                    />
                                    <LabelSizeS>Surname <LabelRequired>*</LabelRequired></LabelSizeS>
                                    <InputSizeL
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
                                    <LabelSizeS>Phone <LabelRequired>*</LabelRequired></LabelSizeS>
                                    <InputSizeL
                                        type="text"
                                        value={contact.Phone}
                                        onChange={self.handleChange('Phone', index)}
                                        id={controlId.Phone}
                                        className={ExternalClasses.controls}
                                    />
                                    <LabelSizeS>Email </LabelSizeS>
                                    <InputSizeL
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
                <hr/>
            </div>
        );
    }
};