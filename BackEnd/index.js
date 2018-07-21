const DataBaseManager = require("./Data/Manager");
DataBaseManager.Init();

const ServiceManager = require("./Service/Manager");
ServiceManager.Init();

const ServerManager = require("./ServerManager");
ServerManager.Start();
