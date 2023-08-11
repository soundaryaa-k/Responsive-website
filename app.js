const express = require("express");
const path = require("path");
require("./src/db/conn");
const User = require("./src/models/usermessage");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;


const staticpath = path.join(__dirname,"/public");
const Templatepath = path.join(__dirname,"/templates/views");
const Partialpath = path.join(__dirname,"/templates/partials");


app.use('/css',express.static(path.join(__dirname,"./node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname,"./node_modules/bootstrap/dist/js")));
app.use('/jq',express.static(path.join(__dirname,"./node_modules/jquery/dist")));
app.use(express.urlencoded({extended:false}))
app.use(express.static(staticpath))

app.set("view engine","hbs");
app.set("views",Templatepath);
hbs.registerPartials(Partialpath)


// routing
app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/contact",(req,res)=>{
    res.render("contact");
})
app.post("/contact",async(req,res)=>{
    try {
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render("index");
    } catch (error) {
        res.status(500).send(error);
      
    }
})

// server create
app.listen(port,()=>{
     console.log("Server is runnning at port no:"+port);
})