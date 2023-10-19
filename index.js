const express = require("express");
const app=express()
const cors=require("cors")
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

// middlewares.
app.use(cors())
app.use(express.json())

// port.
const port=process.env.port || 5000

// 




const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.qe6izo7.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
  }
}
run().catch(console.dir);




// 

app.get("/",(req,res)=>{
    res.send("server is running")
})

app.get("/user",(req,res)=>{
    res.send("we are now on user route.")
})

app.listen(port)


 