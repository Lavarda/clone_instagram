const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
    // Coletar os dados do bd ordenando por menor data de criação
    async index(req,res) {
        const posts = await Post.find().sort('-createdAt');

        return res.json(posts);
    },

    // Dar um insert dos registro no banco.
    async store(req,res) {
        const { author, place, description, hastags } = req.body;
        const { filename: image } = req.file;

        const [name] = image.split('.');
        const fileName = ` ${name}.jpg`;

        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality : 70 })
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName)
            )

        fs.unlinkSync(req.file.path);

        const post = await Post.create({
            author,
            place,
            description,
            hastags,
            image: fileName,
        })

        req.io.emit('post', post);

        return res.json(post);
    },
}