const expres = require('express');
const multer = require('multer');
const uploadConfig = require('../config/upload');
const PostController = require('../controller/PostController');
const LikeController = require('../controller/LikeController');

const routes = new expres.Router();
const upload = multer(uploadConfig);

// MIDDLEWARE, interceptador de chamadas do servidor. ( as rotas )
routes.post('/posts', upload.single('image') , PostController.store);
routes.get('/posts', PostController.index);
routes.post('/posts/:id/like', LikeController.store);

module.exports = routes;