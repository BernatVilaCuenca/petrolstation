const GeneralActions = require('../Actions');
let Actions = Object.assign(
    GeneralActions,
    {
        Lock: 'Lock',
        Send: 'Send'
    }
);
module.exports = Actions;