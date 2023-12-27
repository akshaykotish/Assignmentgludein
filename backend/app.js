const express = require("express");
var cors = require('cors');

const [Connect, CreateCategory, CreateVideo, GetVideo, GetVideosByCategory, GetVideos, GetCategories, SearchVideos] = require("./db");
const app = express();
const port = process.env.PORT || 4000;

Connect();

app.use(express.json());

app.use(cors());

app.get("/", async (req, res)=>{
    res.send("Hello");
});

app.post("/CreateCategory", (req, res)=>{
    try{
        CreateCategory(req.body.id, req.body.name);
        res.send({status: "ok"});
    }
    catch(e){
        res.status(400).send({sucess: false, msg: "Something went wrong."});
    }
});

app.post("/CreateVideo", (req, res)=>{
    try{
        CreateVideo(req.body.id, req.body.title, req.body.description, req.body.playbackurls, req.body.categoryId, req.body.thumbnail);
        res.send({status: "ok"});
    }
    catch(e)
    {
        res.status(400).send({sucess: false, msg: "Something went wrong."});
    }
});

app.post("/VideoById", async (req, res)=>{
    try{
        const data = await GetVideo(req.body.id);
        if(data.length == 0)
        {
            res.send({status: "Not found"});
        }
        else{
            res.send(data);
        }
    }
    catch(e)
    {
        res.status(400).send({sucess: false, msg: "Something went wrong."});
    }
});


app.post("/VideosByCategoryId", async (req, res)=>{
    try{
        const data = await GetVideosByCategory(req.body.category_id);
        if(data.length == 0)
        {
            res.send({status: "Not found"});
        }
        else{
            res.send(data);
        }
    }
    catch(e)
    {
        res.status(400).send({sucess: false, msg: "Something went wrong."});
    }
});

app.get("/VideoList", async (req, res)=>{
    try{
        const data = await GetVideos();
        if(data.length == 0)
        {
            res.send({status: "Not found"});
        }
        else{
            res.send(data);
        }
    }
    catch(e)
    {
        res.status(400).send({sucess: false, msg: "Something went wrong."});
    }
});

app.get("/CategoryList", async (req, res)=>{
    try{
        const data = await GetCategories();
        if(data.length == 0)
        {
            res.send({status: "Not found"});
        }
        else{
            res.send(data);
        }
    }
    catch(e)
    {
        res.status(400).send({sucess: false, msg: "Something went wrong."});
    }
});

app.post("/SearchVideos", async (req, res)=>{
    try{
        const data = await SearchVideos(req.body.search);
        if(data.length == 0)
        {
            res.send({status: "Not found"});
        }
        else{
            res.send(data);
        }
    }
    catch(e)
    {
        res.status(400).send({sucess: false, msg: "Something went wrong."});
    }
});

app.listen(port, ()=>{
    console.log(`Live on port ${port}`);
});