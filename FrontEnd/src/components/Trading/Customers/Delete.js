import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

const ExternalClasses = require("../../../styles/ExternalClasses/Detail");
const StyledComponents = require("../../../styles/StyledComponents/Detail").styles;

const ActionRequest = require('../../../dispatcher/ActionRequest');
const Modules = require('../../../dispatcher/Modules');
const Actions = require('../../../dispatcher/Trading/Customers/Actions');
const Events = require('../../../events/Trading/Customers');
const NotificatorEvents =require('../../../events/Notificator');
const Notifications = require("../../../entities/Notifications/Notifications")

export default class CustomersDetail extends React.Component {
  constructor(props){
    super(props);

    global.eventManager.on(
        Events.Delete, 
        function(){
          global.eventManager.emit(NotificatorEvents.Notificate, [Notifications.SuccessTradingCustomersDelete.id]);
          global.dispatcher.dispatch(new ActionRequest(Modules.Customers, Actions.GetAll));
        }
      );
  }
  delete = () => {
    let self = this;
    global.dispatcher.dispatch(new ActionRequest(Modules.Customers, Actions.Delete, self.props.item._id));
    self.props.onClose();
  };
  close = () => {
    let self = this;
    self.props.onClose();
  };
  render(){
    const ButtonSizeS = StyledComponents.buttons.S;
    const Title = StyledComponents.title;
    const DivConfirmationStyle = { display: 'block', float: 'left', width: '100%', vAlign: 'center', height: '50px'};
    return (
        <div>
            <Dialog
            open={this.props.open}
            onClose={this.close}
            maxWidth={'sm'}
            fullWidth={true}
            >
            <DialogContent>
                <form>
                <Title>Delete request</Title>
                <div style={DivConfirmationStyle}>
                    Do you really want to delete the customer <b>{this.props.item.CompleteName }</b> ?
                </div>
                <ButtonSizeS type="button" onClick={this.delete} className={ExternalClasses.buttons.primary} >Yes</ButtonSizeS>
                <ButtonSizeS type="button" onClick={this.close} className={ExternalClasses.buttons.secondary} >No</ButtonSizeS>              
                </form>
            </DialogContent>
            </Dialog>
        </div>
    );
  }
}