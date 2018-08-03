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

const MenuOptions = require("./MenuOptions");

export default class Menu extends Component {
    
  render() {
    let styles = {
      content: { dispaly: 'block', float: 'left', height: '100vh', minWidth:'150px' },
      link: {
        normal: { textDecoration: 'none', color:'#000000', fontSize:'15px' }
      }
    };
    styles.link.selected = Object.assign ({ }, styles.link.normal, {fontWeight: 'bold'});    

    return (      
        <Paper style={styles.content}>
        <MenuList >
          <MenuItem>
            <ListItemIcon>
              <CustomersIcon />
            </ListItemIcon>
            <Link 
              to="/Customers" 
              style={ global.selectedMenuOption === MenuOptions.Customers ? styles.link.selected : styles.link.normal }
            >
              Customers
            </Link>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ProvidersIcon />
            </ListItemIcon>
            <Link 
              to="/Providers" 
              style={ global.selectedMenuOption === MenuOptions.Providers ? styles.link.selected : styles.link.normal }
            >
              Providers
            </Link>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <BudgetsIcon />
            </ListItemIcon>
            <Link 
              to="/Budgets" 
              style={ global.selectedMenuOption === MenuOptions.Budgets ? styles.link.selected : styles.link.normal }
            >
              Budgets
            </Link>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <InvoicesIcon />
            </ListItemIcon>
            <Link 
              to="/Invoices" 
              style={ global.selectedMenuOption === MenuOptions.Invoices ? styles.link.selected : styles.link.normal }
            >
              Invoices
            </Link>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ReportsIcon />
            </ListItemIcon>
            <Link 
              to="/Reports" 
              style={ global.selectedMenuOption === MenuOptions.Reports ? styles.link.selected : styles.link.normal }
            >
              Reports
            </Link>
          </MenuItem>
        </MenuList>
      </Paper>
    );
  }
};