const Express = require("express");
const GraphQLHttp = require("express-graphql");
const Schema = require("./Schema/GeneralSchema");
const Cors = require('cors');
const Config = require('./config');

class ServerManager{
    static Start(){        
        const app = Express();
        app.use(Cors());
        app.use("/graphql", GraphQLHttp({
            schema: Schema,
            graphiql: true
        }));
        app.listen(Config.graphQlServer.port, function(){});
    }
}
module.exports = ServerManager;