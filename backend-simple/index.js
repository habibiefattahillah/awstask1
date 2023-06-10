require("dotenv").config();
const express = require("express");
const listEndpoints = require("express-list-endpoints"); 
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const noteRoutes = require("./routes/note");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Routes 
app.use("/api/v1", noteRoutes);
app.listen(process.env.APP_PORT, () => {
    console.log(`server run at http://localhost:${process.env.APP_PORT}/`);
    console.log("List Routes: ",listEndpoints(app));;
})