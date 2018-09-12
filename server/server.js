require ('dotenv').config();

const express = require('express');
const bodyparser= require('body-parser');
const controller = require('./messagesCtrl');
const session = require('express-session');

const app = express();

let { SERVER_PORT, SESSION_SECRET } = process.env;

app.use(bodyparser.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    let badWords = ['ass', 'fuck', 'shit', 'damn'];
    if (req.body.message) {
      let badWordsExist = true;
      for (let i = 0; i < badWords.length; i++) {
        let regex = new RegExp(badWords[i], 'g');
        req.body.message = req.body.message.replace(regex, '****');
      }
      next();
    } else {
      next();
    }
  });



app.get('/api/messages', controller.getAllMessages);

app.get('api/messages/history', controller.history);

app.post('/api/messages', controller.createMessage);


app.listen(SERVER_PORT, ()=> {
    console.log(`Server listening on port ${SERVER_PORT}`)
});