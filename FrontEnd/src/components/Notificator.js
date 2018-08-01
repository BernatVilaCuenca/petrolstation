import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
const Notifications = require('../entities/Notifications/Notifications');
const Events = require('../events/Notificator');
const Config = require("../config");

export default class Notificator extends Component {    
    constructor(props){
        super(props);
        let self=this;
        self.state = {
            notifications: {
                version: new Date().getTime(),
                data:[]
            }
        };
        global.eventManager.on(
            Events.Notificate,
            function(notificationIds){
                if(notificationIds && notificationIds.length>0){

                    let notifications=[];
                    for(let iNotification in notificationIds)
                        notifications.push(Notifications[notificationIds[iNotification]]); 
                    
                    let version = new Date().getTime();
                    self.setState({
                        notifications:{
                            version,
                            data: notifications     
                        }
                    });
                    setTimeout(
                        self.deleteNotifications.bind(self, version), 
                        Config.application.notificatons.timeToLive
                    );
                }
            }
        );
    }
    deleteNotifications(version){         
        let self = this;
        if(self.state.notifications.version === version)
            self.setState({
                notifications:{
                    data: []
                }
            });                    
    }
    render() {
        const vertical='top';
        const horizontal='right'; 
        const styles={
            Error: {'backgroundColor': '#FF6666', 'color': 'white'},
            Warning: {'backgroundColor': '#FFFF99', 'color': 'white'},
            Information: {'backgroundColor': '#CCFF99', 'color': 'black'}
        };
        return(
            this.state.notifications.data.map(
                function(notification, index){
                    const position = {'paddingTop': `${ 75 * index }px`};
                    return (                        
                        <Snackbar
                            key={index}
                            anchorOrigin={{ vertical, horizontal }}
                            style={position}
                            open={true}
                        >
                            <SnackbarContent
                                message={<h4>{notification.message}</h4>}
                                style={styles[notification.type]}
                            />                        
                        </Snackbar>
                    )
                }
            )        
        );
    }
}