const e = require("express");
const Article = require("../models/Article");

exports.getAllArticles = async (req, res, next) => {
    try {
        const articles = await Article.findAll();

        res.status(200).json(articles);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.createNewArticle = async (req, res, next) => {
    try {
        let {title, author, body} = req.body;
        let imagePath = req.file ? req.file.path : null;
        // console.log(title);
        // console.log(body);
        // console.log(req.body);
        // console.log(imagePath);
        let article = new Article({
            title, 
            author, 
            body,
            urlimg: imagePath
        });

        article = await article.save();

        res.status(201).json({message: "Article created"});
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.findById = async (req, res, next) => {
    try {
        let postId = req.params.id;
        let article = await Article.findById(postId);

        res.status(200).json({article: article[0]})
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const articleId = parseInt(req.params.id);
        // console.log(articleId);
        // console.log(req.body);
        const { title, author, body } = req.body;
        const imagePath = req.file ? req.file.path : null;

        if (!title || !author || !body) {
            return res.status(400).json({
                success: false,
                message: 'Title, author, and body are required'
            });
        }

        let article = new Article({
            title, 
            author, 
            body,
            urlimg: imagePath
        });

        //console.log(article);

        const [affectedRows] = await Article.update(article, articleId);

        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Article not found or no changes made'
            });
        }

        const updatedArticle = await Article.findById(articleId);

        res.status(200).json({
            success: true,
            message: 'Article updated successfully',
            article: updatedArticle
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.deleteById = async (req, res, next) => {
    try {
        const articleId = parseInt(req.params.id);
        // console.log(articleId);
        const result = await Article.delete(articleId);

        if (result === 0) {
            return res.status(404).json({ 
                success: false,
                message: 'Article not found' 
            });
        }

        res.status(200).json({
            success: true,
            message: 'Article deleted successfully'
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};