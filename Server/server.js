require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const authRoute = require("./router/auth-router");
const contactRoute = require('./router/contact-router');
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");

const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");


// let's tackle cors
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
}
app.use(cors(corsOptions));

//MiddleWare
app.use(express.json());

//Router
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data",serviceRoute);

// Adim route
app.use("/api/admin", adminRoute);
app.use(errorMiddleware);


const PORT = process.env.PORT;

connectDb().then(() =>{
    app.listen(PORT, () => {
        console.log(`server is running at port: ${PORT}`);
    });
});
