const moongose = require('mongoose');

const PostSchema = new moongose.Schema({
    author: String,
    place: String,
});