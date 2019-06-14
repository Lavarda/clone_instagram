const Post = require('../models/Post');

module.exports = {
    // Dar um insert dos registro no banco com os likes.
    async store(req,res) {
        const post = await Post.findById(req.params.id);

        post.likes += 1;

        await post.save();

        req.io.emit('like', post);

        return res.json(post);
    },
}