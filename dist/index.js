"use strict";
var express = require("express");
var app = express();
var port = process.env.PORT || 8080; // default port to listen
var bodyParser = require("body-parser");
var axios = require("axios");
var moment = require("moment");
app.use(express.json());
var send_webhook = function (number, src) {
    axios.post(process.env.DISCORD_WEBHOOK, {
        content: null,
        embeds: [
            {
                title: "Neuer Anruf von " + number,
                description: "Anruf am: " + moment().format("DD-MM-YYYY,") + " um " + moment().format("HH:mm") + " Uhr.\n\nWarteschlange: " + src,
                color: 3770921,
                author: {
                    name: "KlexHub SIP",
                },
            },
        ],
    });
};
app.get("/:phoneNr/:src", function (req, res) {
    console.dir(req.params.phoneNr);
    send_webhook(req.params.phoneNr, req.params.src || "");
    res.send("Hello world!");
});
app.listen(port, function () {
    console.log("server started at http://localhost:" + port);
});
