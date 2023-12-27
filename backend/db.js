const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://akshaykotish:WHiVKmZMPvXfYr6Q@cluster0.unes38t.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

var database;

async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function Connect(){
  database = client.db("Assignment");
  await client.connect();
  console.log("Connected");
}

async function CreateCategory(id_c, name_c)
{
  const Category = database.collection("Category");
  
  let doc = {
    id: id_c,
    name: name_c
  }
  var result = await Category.insertOne(doc);
  console.log(`Inserted ${result.insertedId}`);
  return true;
}

async function CreateVideo(id_v, title_v, description_v, playbackUrls_v, categoryId_v, thumbnail_v){
  const Videos = database.collection("Videos");

  let doc = {
      id: id_v,
      title: title_v,
      description: description_v,
      playbackUrls: playbackUrls_v,
      categoryId: categoryId_v,
      thumbnail: thumbnail_v
  }
  
  let result = Videos.insertOne(doc);
  console.log(`Inserted ${result.insertedId}`);
  return true;
}

async function GetVideo(id_v)
{
  const Videos = database.collection("Videos");
  let data = await Videos.find({id: id_v}).toArray(); 
  return data;
}


async function GetVideosByCategory(id_c)
{
  const Videos = database.collection("Videos");
  let data = await Videos.find({categoryId: id_c}).toArray(); 
  return data;
}


async function GetVideos()
{
  const Videos = database.collection("Videos");
  let data = await Videos.find().toArray(); 
  return data;
}


async function GetCategories()
{
  const Category = database.collection("Category");
  let data = await Category.find().toArray(); 
  return data;
}


async function GetCategories()
{
  const Category = database.collection("Category");
  let data = await Category.find().toArray(); 
  return data;
}


async function SearchVideos(search)
{
  const Category = database.collection("Videos");
  let data = await Category.find({title: {$regex: ".*" + search + ".*"}}).toArray(); 
  console.log(data);
  return data;
}

module.exports = [Connect, CreateCategory, CreateVideo, GetVideo, GetVideosByCategory, GetVideos, GetCategories, SearchVideos];