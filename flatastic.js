module.exports = function (RED) {
    "use strict";
    var ky = require("ky");
    var api =  ky.create({
        prefixUrl: "https://api.flatastic-app.com/index.php/api",
        headers: {
            "accept": "application/json, text/plain, */*",
            "accept-language": "de-CH,de;q=0.9,en-US;q=0.8,en-CH;q=0.7,en;q=0.6,ar-JO;q=0.5,ar;q=0.4,de-DE;q=0.3",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "x-api-key": credentials.apiKey,
            "x-api-version": "2.0.0",
            "x-client-version": "2.3.20"
        },
        hooks: {
            afterResponse: [
                async (request, options, response) => {
                if (response.status === 401)
                    this.log("Authenticating");
                    const token = await api.post("/auth/login", {json: {email: credentials.username, password: credentials.password}}).json()
                    credentials.apiKey = token.X-API-TOKEN;
                    request.headers.set('Authorization', `token ${credentials.apiKey}`);
                    return ky(request);
                }
            ]
        }
    });

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

    Flatastic.prototype.get = function (url, opts) {
        var node = this;
        opts = opts || {};

        return new Promise(function (resolve, reject) {
           try{
               const response = api.get(url);
               resolve(response);
           } catch (e) {
               reject(e);
           }
        });
    }

    Flatastic.prototype.post = function (url,data,opts) {
        var node = this;
        opts = opts || {};

        return new Promise(function (resolve, reject) {
            try{
                const response = api.post(url, {json: data});
                resolve(response);
            } catch (e) {
                reject(e);
            }
        });
    }
}