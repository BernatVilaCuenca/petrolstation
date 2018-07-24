const GraphQLClient = require("graphql-client")

class ApiClient{
    constructor(){
        this.client = GraphQLClient({
            url: `http://${ global.config.graphQlServer.server }:${ global.config.graphQlServer.port }/graphql`
        });
    }
    query(query, variables, callBack, errorCallBack){
        this.client.query(query, variables)
        .then(callBack)
        .catch(errorCallBack);
    }
}
module.exports = ApiClient;