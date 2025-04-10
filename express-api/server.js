require("dotenv").config();
const cors = require('cors');

const Express = require("express");

const app = Express();
app.use(Express.json());
app.use(cors({
    origin: 'http://localhost:4200', // Your Angular app's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));



app.use("/articles", require("./routes/postRoutes"));

app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);

    res.status(500).json({
        message: "Something went wrong",
    });
});

app.listen(3000, () => console.log("Server running on port 3000"));