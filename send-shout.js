module.exports = function(RED) {
    function SendShout(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', function (msg) {
            msg.payload = "Hello World!";
            node.send(msg);
        });

        RED.nodes.registerType("send shout", SendShout);
    }
}