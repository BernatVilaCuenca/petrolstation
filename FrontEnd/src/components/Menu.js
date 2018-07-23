import React, { Component } from 'react';
import { Manager, Target, Popper } from 'react-popper';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { Link } from "react-router-dom";

export default class Menu extends Component {
    state = {
        open: false,
    };
    handleToggle = () => {
        this.setState(state => ({ open: !state.open }));
    };
    handleClose = event => {
        if (this.target1.contains(event.target)) return;        
        this.setState({ open: false });
    };

  render() {
    const { open } = this.state;
    const linkStyle = { textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' };
    return (
      <div>
        <Manager>
          <Target>
            <div
              ref={node => {
                this.target1 = node;
              }}
            >
              <Button
                aria-owns={open ? 'menu-list-grow' : null}
                aria-haspopup="true"
                onClick={this.handleToggle}
              >
                Menu
              </Button>
            </div>
          </Target>
          <Popper
            placement="bottom-start"
            eventsEnabled={open}
          >
            <ClickAwayListener onClickAway={this.handleClose}>
              <Grow in={open} id="menu-list-grow" style={{ transformOrigin: '0 0 0' }}>
                <Paper>
                  <MenuList role="menu">
                    <MenuItem>
                        <Link to="/employees" style={linkStyle}>Employees</Link>
                    </MenuItem>
                  </MenuList>
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        </Manager>
      </div>
    );
  }
};