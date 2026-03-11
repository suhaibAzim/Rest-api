let express = require("express");
let app = express();
let path = require("path");
const {v4 : uuidv4} = require('uuid');
const methodOverride = require("method-override");  //for put,patch,delete

app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname,"views")); //connect ejs+index.js

app.use(express.static(path.join(__dirname,"public"))); //link view+public folder
 
//dataBase is posts
let posts = [
    {
        id:uuidv4(),  //unique ID aa gyi
        username: "Legit",
        content: "Bgis eSport analyst + assulter"
    },
    {
        id:uuidv4(),
        username:"Goblin",
        content: "Bmps MVP + Champians team IQOOSOUL"
    },
    {
        id:uuidv4(),
        username: "Nakul",
        content: "Nakul from Prime Blind, current in IGL in S8UL"
    }
]

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

app.post("/posts",(req,res)=>{
    let {username , content} = req.body;
    let id = uuidv4(); //unique ID by npm package UUID
    posts.push({id , username , content});
    res.redirect("/posts")   // default method GET;
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.patch("/posts/:id",(req,res)=>{
    let { id } = req.params;
    let newContent = req.body.content;

    let post = posts.find((p)=> p.id == id);
    post.content = newContent;
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
    const {id} = req.params;
    let post = posts.find((p)=> p.id == id);
    res.render("update.ejs",{post});
})

app.get("/posts/:id",(req,res)=>{
    const {id} = req.params;
    let post = posts.find((p)=> p.id == id);

    if(post){ //post exixt krti hain
        res.render("showPost.ejs", {post} );
    }
})

app.delete("/posts/:id",(req,res)=>{
    const {id} = req.params;
    posts = posts.filter((p)=> p.id !== id);
    res.redirect("/posts");
})

app.listen(3000,()=>{
    console.log(`server run on link http://localhost:3000`);
})
