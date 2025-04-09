const db = require("../config/db");

class Article {
    constructor(title, author, body) {
        this.title = title;
        this.author = author;
        this.body = body;
    }

    save() {
        let d = new Date();
        let yyyy = d.getFullYear();
        let mm = d.getMonth() + 1;
        let dd = d.getDate();

        let createdAt = `${yyyy}-${mm}-${dd}`;
        let urlimg = "";

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
            '${urlimg}'
        )
        `;

        return db.execute(sql);
    }

    static findAll() {
        let sql = "SELECT * FROM article;";

        return db.execute(sql);
    }

    static findById(id) {
        let sql = `SELECT * FROM article WHERE id = ${id}`;

        return db.execute(sql);
    }
}

module.exports = Article;