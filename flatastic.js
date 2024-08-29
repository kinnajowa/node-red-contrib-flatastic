module.exports = function (RED) {
    function Flatastic() {
        RED.nodes.createNode(this, config);
    }
    RED.nodes.registerType("flatastic", Flatastic, {
        credentials: {
            username: {type: 'text'},
            password: {type: 'password'},
            apiKey: {type: 'password'},
        }
    });
}