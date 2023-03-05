const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mynewdb");
const schema = {name: String, id: String, marks: Number};
const monmodel = mongoose.model("people",schema);

//GET operation
app.get("/fetch/:id",async (req,res) =>
{
    let fetch_id = req.params.id;
    console.log("Inside get function")

    monmodel.find({id: fetch_id}).then((data) =>
    {
        if(data.length==0)
        {
            res.send("No documents found")
        }
        else
        {
            res.send(data);
        }
    }).catch((err) =>
    {
        console.log(err);
    })
})

//FETCH ALL
app.get("/fetchall", async (req,res) =>
{
    console.log("Inside get function");
    monmodel.find().then((data) =>
    {
        if(data.length==0)
        {
            res.send("No document found");
        }
        else
        {
            res.send(data);
        }
    }).catch((err) =>
    {
        console.log(err);
    })
})

//POST operation
app.post("/post",async (req,res) =>
{
    console.log("Inside post function");
    const id = new monmodel({name: req.body.name, id: req.body.id, marks: req.body.marks});
    id.save().then((data) =>
    {
        res.json(id);
    }).catch((err) =>
    {
        console.log(err);
    })
});

//PUT operation
app.put("/update/:id",async (req,res) =>
{
    console.log("Inside put function");
    let update_id = req.params.id;
    let update_name = req.body.name;
    let update_marks = req.body.marks;

    monmodel.findOneAndUpdate({id: update_id}, {$set: {name: update_name, marks: update_marks}}).then((data) =>
    {
        res.send("Updated")
    }).catch((err) =>
    {
        console.log(err);
    })
})
monmodel.insertMany()
//DELETE operation
app.delete("/delete/:id",(req,res) =>
{
    let delete_id = req.params.id;
    monmodel.findOneAndDelete({id: delete_id}).then((data) =>
    {
        if(data==null)
        {
            res.send("No data found");
        }
        else
        {
            res.send("Deleted")
        }
    }).catch((err) =>
    {
        console.log(err);
    })
})

app.listen(3000);