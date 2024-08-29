module.exports = function(RED) {
    function SendShout(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        this.flatastic = RED.nodes.getNode(n.flatastic);

        node.on('input', function (msg) {
            node.flatastic.post("/shouts", {shout: msg.payload});
        });

    }

    RED.nodes.registerType("send-shout", SendShout);

}