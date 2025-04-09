const e = require("express");
const Article = require("../models/Article");

exports.getAllArticles = async (req, res, next) => {
    try {
        const [articles, _] = await Article.findAll();

        res.status(200).json({articles});
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.createNewArticle = async (req, res, next) => {
    try {
        let {title, author, body} = req.body;
        let article = new Article(title, author, body);

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
        let [article, _] = await Article.findById(postId);

        res.status(200).json({article: article[0]})
    } catch (error) {
        console.log(error);
        next(error);
    }
};