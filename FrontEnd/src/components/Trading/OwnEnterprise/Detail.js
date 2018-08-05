import React, { Component } from 'react';

import Menu from '../../Menu';
import Notificator from '../../Notificator';
import Ribbon from './Ribbon';
import Address from "../../Shared/Address";

const StringUtils = require("../../../utils/String");
const ActionRequest = require('../../../dispatcher/ActionRequest');
const Modules = require('../../../dispatcher/Modules');
const Actions = require('../../../dispatcher/Trading/OwnEnterprise/Actions');
const Events = require('../../../events/Trading/OwnEnterprise');
const OwnEnterpriseFactory = require("../../../entities/Trading/OwnEnterprise/OwnEnterpriseFactory");
const NotificatorEvents =require('../../../events/Notificator');
const Validator = require("./Validator")
const Notifications = require("../../../entities/Notifications/Notifications")

const ExternalClasses = require("../../../styles/ExternalClasses/Detail");
const StyledComponents = require("../../../styles/StyledComponents/Detail").styles;

export default class OwnEnterpriseDetail extends Component {
    constructor(){
      super();
      global.selectedMenuOption = MenuOptions.OwnEnterprise;

      let self = this;
      self.state = {
          item: OwnEnterpriseFactory.create()
      };
      global.eventManager.on(
        Events.GetOne,
        function(result){
            let item = result;
            let completeNumber = item.Account.CompleteNumber;
            if((!StringUtils.IsNullOrEmpty(completeNumber)) && completeNumber.length === 24){
                item.Account.DetailedNumber = [
                    completeNumber.substr(0,4), completeNumber.substr(4,4), completeNumber.substr(8,4),
                    completeNumber.substr(12,4), completeNumber.substr(16,4), completeNumber.substr(20)
                ];
            }     
            self.setState({item});
        }
      );
      global.eventManager.on(
        Events.Update, 
        function(){
          global.eventManager.emit(NotificatorEvents.Notificate, [Notifications.SuccessTradingOwnEnterpriseUpdate.id]);
        }
      );
    }
    componentDidMount(){
        global.dispatcher.dispatch(
            new ActionRequest(Modules.OwnEnterprise, Actions.GetOne)
        );
    }
    handleBankChange = () => event => {
        let self=this;
        let item = self.state.item;
        item.Account.Bank = event.target.value;
        self.setState({ item });
    };
    handleChange = (name) => event => {
        let self=this;
        let item = self.state.item;
        item[name] = event.target.value;
        self.setState({ item });
    };
    handleChangeOnDetailedNumber = (index) => event => {
        let self=this;
        let item = self.state.item;
        item.Account.DetailedNumber[index] = event.target.value;
        self.setState({ item });
    };
    prepareItemBeforeSaving = () => {
        let self = this;        
        let {Account, ...item} = self.state.item;
        item.Account = {
            Bank: Account.Bank,
            CompleteNumber: Account.CompleteNumber
        }
        return item;
    };
    save = () => {
        let self = this;
        if(Validator.Validate()){
            let item = self.prepareItemBeforeSaving();
            global.dispatcher.dispatch(
                new ActionRequest(Modules.OwnEnterprise, Actions.Update, item)
            );     
        } else
            global.eventManager.emit(NotificatorEvents.Notificate, [Notifications.ErrorFillingForm.id]);
    }
    onChangeAddress = (index, data) => {
        let self=this;
        let item = self.state.item;
        item.Address = data;
        self.setState({ item });
    };
    render(){
        const LabelSizeM = StyledComponents.labels.M;
        const LabelRequired = StyledComponents.labels.required;
        const InputSizeXS = StyledComponents.inputs.XS;
        const InputSizeM = StyledComponents.inputs.M;
        const InputSizeL = StyledComponents.inputs.L;
        const InputSizeXL = StyledComponents.inputs.XL;
        const ContentDetail = StyledComponents.form;

        let self = this;
        return (   
            <div>   
              <Menu/>
              <Notificator/>
              <Ribbon
                onSave={self.save}
              />
              <ContentDetail>
                    <div>
                        <LabelSizeM>Complete name <LabelRequired>*</LabelRequired></LabelSizeM>
                        <InputSizeL
                            type="text"
                            value={self.state.item.CompleteName}
                            onChange={self.handleChange('CompleteName')}
                            id="CompleteName"
                            className={ExternalClasses.controls}
                        />
                        <LabelSizeM>Business name <LabelRequired>*</LabelRequired></LabelSizeM>
                        <InputSizeXL
                            type="text"
                            value={self.state.item.TradingName}
                            onChange={self.handleChange('TradingName')}
                            id="TradingName"
                            className={ExternalClasses.controls}
                        />
                        <LabelSizeM>Id <LabelRequired>*</LabelRequired></LabelSizeM>                    
                        <InputSizeM
                            type="text"
                            value={self.state.item.DocumentId}
                            onChange={self.handleChange('DocumentId')}
                            id="DocumentId"
                            className={ExternalClasses.controls}
                        />
                    </div>
                    <div>
                        <LabelSizeM>Phone <LabelRequired>*</LabelRequired></LabelSizeM>                    
                        <InputSizeL
                            type="text"
                            value={self.state.item.Phone}
                            onChange={self.handleChange('Phone')}
                            id="Phone"
                            className={ExternalClasses.controls}
                        />
                        <LabelSizeM>Email </LabelSizeM>                    
                        <InputSizeXL
                            type="text"
                            value={self.state.item.Email}
                            onChange={self.handleChange('Email')}
                            id="Email"
                            className={ExternalClasses.controls}
                        />
                    </div>
                    <br/>
                    <div>
                        <LabelSizeM>Bank <LabelRequired>*</LabelRequired></LabelSizeM>                    
                        <InputSizeL
                            type="text"
                            value={self.state.item.Account.Bank}
                            onChange={self.handleBankChange()}
                            id="Bank"
                            className={ExternalClasses.controls}
                        />
                        <LabelSizeM>Account </LabelSizeM>               
                        {     
                            self.state.item.Account.DetailedNumber.map(
                                function(detailedNumber, index){
                                    return (
                                        <InputSizeXS
                                            maxLength={4}
                                            key={index}
                                            type="text"
                                            value={detailedNumber}
                                            onChange={self.handleChangeOnDetailedNumber(index)}
                                            id={`DetailedNumber_${index}`}
                                            className={ExternalClasses.controls}
                                        />
                                    );
                                }
                            )
                        }
                    </div>
                    <br/>
                    <Address 
                        index={0} 
                        data={self.state.item.Address} 
                        onChange={self.onChangeAddress}
                    />
                </ContentDetail>
            </div>
        );
    }
}