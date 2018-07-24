import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Main from './components/Main';
import Customers from './components/Trading/Customers/List';

const Config = require("./config");
global.config = Config;

const EventManager = require('./events/Manager');
global.eventManager = new EventManager();

const Dispatcher = require('./dispatcher/Dispatcher');
global.dispatcher = new Dispatcher();

const ApiClient = require("./stores/ApiClient")
global.apiClient = new ApiClient();

ReactDOM.render(
    <Router>
        <div>
            <Route exact path='/' component={Main}></Route>
            <Route path='/Customers' component={Customers}></Route>
        </div>
    </Router>
    , document.getElementById('root')
);
