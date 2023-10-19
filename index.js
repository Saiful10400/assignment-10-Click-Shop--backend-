const express = require("express");
const app=express()
const cors=require("cors")
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

    const database = client.db("Electronic_shop").collection("Products")
    
// all post methodes here.
    app.post("/send/phone",async(req,res)=>{
        const data=req.body
        console.log("hittinng")
        const result=await database.insertOne(data)
        await res.send(result)
    })
    // data get by brand.
    app.get("/brand/:name",async(req,res)=>{
      const brandName=req.params.name
      const query={brand:brandName}
     
      const cursor=await database.find(query)
       res.send(await cursor.toArray())
      
    })
    // data get by id.
    app.get("/update/:id",async(req,res)=>{
      const id=req.params.id
      const query={_id:new ObjectId(id)}
     
      const cursor=await database.findOne(query)
      await res.send(cursor)
      
    })
    // get best deal data.
    app.get("/products/best_deals",async(req,res)=>{
      const query={bestdeall:"true"}
      const result=await database.find(query)
      res.send(await result.toArray())

    })
    // get flagship
    app.get("/products/flagship",async(req,res)=>{
      const query={quality:"flagship",type:"phone"}
      const result=await database.find(query)
      res.send(await result.toArray())

    })
    // update fild handle.
    app.post("/product/update",async(req,res)=>{
      const data=req.body
      const query={_id:new ObjectId(data.id)}
      const willUpdate={
        $set:{
          productName:data.productName,
          url:data.url,
          brand:data.brand,
          type:data.type,
          price:data.price,
          ratings:data.ratings,
          description:data.description,
          quality:data.quality,
          ram:data.ram,
          rom:data.rom,
          bestdeall:data.bestdeall
        }
      }
      const option={upsert:true}
      const result=await database.updateOne(query,willUpdate,option)
      await res.send(result)
    })

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
  }
}
run().catch(console.dir);




// 

app.get("/",(req,res)=>{
    res.send("server is running")
})


app.listen(port)


 