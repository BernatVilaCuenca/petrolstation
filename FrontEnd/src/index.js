import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Main from './components/Main';
import Employees from './components/humanResources/employees/List';

const EventManager = require('./events/Manager');
global.eventManager = new EventManager();

const Dispatcher = require('./dispatcher/Dispatcher');
global.dispatcher = new Dispatcher();

ReactDOM.render(
    <Router>
        <div>
            <Route exact path='/' component={Main}></Route>
            <Route path='/employees' component={Employees}></Route>
        </div>
    </Router>
    , document.getElementById('root')
);
