import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { Link } from "react-router-dom";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';

export default class Menu extends Component {
    
  render() {
    const linkStyle = { textDecoration: 'none', color: 'red', fontSize:'20px' };
    const divMenuStyle = { float: 'left', width: '200px' };
    return (
      <div style={divMenuStyle}>
      <Paper>
      <MenuList>
        <MenuItem>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <Link to="/Customers" style={linkStyle}><ListItemText inset primary="Customers" /></Link>
        </MenuItem>
      </MenuList>
    </Paper>
    </div>
    );
  }
};