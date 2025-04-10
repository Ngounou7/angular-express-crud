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

        
        const allowedFields = ['title', 'author', 'body', 'urlimg'];
        console.log(article);
        const setClauses = [];
        const values = [];

        allowedFields.forEach(field => {
            if (article.hasOwnProperty(field)) {
                setClauses.push(`${field} = ?`);
                values.push(article[field]);
            }
        });

        if (setClauses.length === 0) {
            throw new Error('No valid fields provided for update. Allowed fields: title, author, body');
        }

        values.push(id);
        
        const sql = `UPDATE article SET ${setClauses.join(', ')} WHERE id = ?`;

        try {
            const [result] = db.execute(sql, values);
            
            if (result.affectedRows === 0) {
                throw new Error('Article not found or no changes made');
            }
    
            return {
                success: true,
                message: 'Article updated successfully',
                affectedRows: result.affectedRows
            };
        } catch (error) {
            console.error('Database update error:', error);
            
            if (error.code === 'ER_DATA_TOO_LONG') {
                throw new Error('Field value too long');
            }
            
            throw error;
        }
    }
}

module.exports = Article;