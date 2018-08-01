import React, { Component } from 'react';
import Menu from './Menu';
import MenuOptions from './MenuOptions';

export default class Main extends Component {  
  render() {
    global.selectedMenuOption = MenuOptions.None;
    return (
      <div>
          <Menu/>
      </div>
    );
  }
};