const db = require("../config/db");

class Article {
    constructor({title, author, body, urlimg}) {
        this.title = title;
        this.author = author;
        this.body = body;
        this.urlimg = urlimg;
    }

    save() {
        let d = new Date();
        let yyyy = d.getFullYear();
        let mm = d.getMonth() + 1;
        let dd = d.getDate();

        let createdAt = `${yyyy}-${mm}-${dd}`;

        let sql = `
        INSERT INTO article(
            title,
            body,
            createdAt,
            author,
            urlimg
        )
        VALUES(
            '${this.title}',
            '${this.body}',
            '${createdAt}',
            '${this.author}',
            '${this.urlimg}'
        )
        `;

        return db.execute(sql);
    }

    static findAll() {
        let sql = "SELECT * FROM article;";

        return db.execute(sql);
    }

    static findById(id) {
        let sql = `SELECT * FROM article WHERE id = ?`;

        return db.execute(sql, [id]);
    }

    static delete(id) {
        let sql = `DELETE FROM article WHERE id = ?`;

        return db.execute(sql, [id]);
    }

    static update(id, article) {

        console.log(article);
        console.log(id);

        const sql = `UPDATE article SET 
            title = ?, 
            body = ?, 
            author = ?, 
            urlimg = ? 
            WHERE id = ?`;

        const params = [
            article.title,
            article.body,
            article.author,
            article.urlimg,
            id
        ];

        return db.execute(sql, params);
    }
}

module.exports = Article;