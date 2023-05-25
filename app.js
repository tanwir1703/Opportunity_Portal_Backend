const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error")


//IMPORT ROUTES
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const jobsTypeRoutes = require("./routes/jobsTypeRoutes")
const jobsRoutes = require("./routes/jobsRoutes")


//DATABASE CONNECTION
mongoose.connect(process.env.DATABASE).then(() => console.log("Database Connected"))
  .catch((err)=>console.log(err));




//MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json({limit: "5mb"}));
app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: true
}));
app.use(cookieParser());
app.use(cors({
  origin: ["https://646f580f870e430bcbb76bfc--reliable-panda-1a9bbb.netlify.app", "http://opportunity-portal-backend.onrender.com"]
}));

//ERROR MIDDLEWARE
app.use(errorHandler);


//ROUTER MIDDLEWARE
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', jobsTypeRoutes);
app.use('/api', jobsRoutes);


//port
const port = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});
