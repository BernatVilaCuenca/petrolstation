import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { Link } from "react-router-dom";
import ListItemIcon from '@material-ui/core/ListItemIcon';

import CustomersIcon from '@material-ui/icons/Person';
import ProvidersIcon from '@material-ui/icons/ContactPhone';
import BudgetsIcon from '@material-ui/icons/Folder';
import InvoicesIcon from '@material-ui/icons/FolderSpecial';
import ReportsIcon from '@material-ui/icons/Assessment';

export default class Menu extends Component {
    
  render() {
    const linkStyle = { textDecoration: 'none', color:'#000000', fontSize:'15px' };
    const divMenuStyle = { float: 'left', width: '150px', height: '975px' };
    return (
      <Paper style={divMenuStyle}>
      <MenuList style={divMenuStyle}>
        <MenuItem>
          <ListItemIcon>
            <CustomersIcon />
          </ListItemIcon>
          <Link to="/Customers" style={linkStyle}>Customers</Link>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ProvidersIcon />
          </ListItemIcon>
          <Link to="/Providers" style={linkStyle}>Providers</Link>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <BudgetsIcon />
          </ListItemIcon>
          <Link to="/Budgets" style={linkStyle}>Budgets</Link>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <InvoicesIcon />
          </ListItemIcon>
          <Link to="/Invoices" style={linkStyle}>Invoices</Link>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ReportsIcon />
          </ListItemIcon>
          <Link to="/Reports" style={linkStyle}>Reports</Link>
        </MenuItem>
      </MenuList>
    </Paper>
    );
  }
};