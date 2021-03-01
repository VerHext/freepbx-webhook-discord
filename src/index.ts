const express = require("express");
const app = express();
const port = 8080; // default port to listen
const bodyParser = require("body-parser");
const axios = require("axios");
const moment = require("moment");

app.use(express.json());

const send_webhook = (number: string, src: string) => {
  axios.post(process.env.DISCORD_WEBHOOK, {
    content: null,
    embeds: [
      {
        title: `Neuer Anruf von ${number}`,
        description: `Anruf am: ${moment().format(
          "DD-MM-YYYY,"
        )} um ${moment().format("HH:mm")} Uhr.\n\nWarteschlange: ${src}`,
        color: 3770921,
        author: {
          name: "KlexHub SIP",
        },
      },
    ],
  });
};

app.get("/:phoneNr/:src", (req: any, res: any) => {
  console.dir(req.params.phoneNr);
  send_webhook(req.params.phoneNr, req.params.src || "");
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
