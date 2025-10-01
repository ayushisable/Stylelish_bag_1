const express = require("express");
const app = express();
const port = 5000;

require("dotenv").config();

const db = require("./config/mongoose-connection");
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const indexRoutes = require("./routes/index")

const expressSession = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const path = require("path");
const exp = require("constants");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");
app.use(
  expressSession({
    resave:false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET || "fallbackSecret"
  })
) ;
app.use(flash());
app.use(express.static("public"));



// app.get("/",(req,res)=>{
//   res.send("hey");
// });

app.use("/",indexRoutes);
app.use("/owners",ownersRouter);
app.use("/users", usersRouter);
app.use("/products",productsRouter);

app.listen( port,()=>{
  console.log('port is 5000');
  
})