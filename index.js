const express = require('express');
const { url } = require('inspector');
const { v4: uuidv4 } = require('uuid');
const app = express();
const methodOverride = require('method-override')

app.use(methodOverride('_method'));


let port = 3300;

const path = require('path');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.set(express.static(path.join(__dirname,'public')));
app.use(express.static(__dirname + '/public'));


let posts = [
    {
        RoomNo : 201,
        id : uuidv4(),
        username : "Daiyan Alam",
        content : "Fan is Runnig Slow",
    },
    {
        RoomNo : 205,
        id : uuidv4(),
        username : "Raju",
        content : "Light is Not Working",
    },
    {
        RoomNo : 401,
        id : uuidv4(),
        username : "Rizwan Naik",
        content : "There is Not Light in Looby",
    },
]



app.get('/posts',(req,res)=>{
    res.render('index.ejs',{posts});
})

app.get('/posts/new',(req,res)=>{
    res.render('new.ejs');
})

app.post('/posts',(req,res)=>{
    console.log(req.body);
    let {username,content,RoomNo} = req.body;
    let id = uuidv4();
    posts.push({id,username,content,RoomNo});
    res.redirect('/posts')
})

app.get('/posts/:id',(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render('show.ejs',{post});
 })

app.patch('/posts/:id',(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=> id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect('/posts');
})

app.delete('/posts/:id',(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=> id !== p.id);
    res.redirect('/posts');
})

app.get('/posts/:id/edit',(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render('edit.ejs',{post});
})

app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})