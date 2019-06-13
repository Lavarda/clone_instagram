// importações
const express = require('express');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb+srv://Lavarda:vi2107@cluster0-g6df3.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});

app.use(require('./routes.js'));

// Setando a porta do servidor
app.listen(3333);