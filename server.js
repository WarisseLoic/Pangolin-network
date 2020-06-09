require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const url_basic = "/api/" + process.env.VERSION_API;
const bodyParser = require('body-parser');
const schema = require('./users_schema');

app.use(bodyParser.json());

mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser: true},
    () => {
        console.log("Connect to Db");
    }
);

const db = mongoose.connection;
db.on('error', (e) => console.error(e));

app.use((req, res, next) => {
    console.log("Api call");
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
})

app.post(url_basic + '/', async (req, res) => {
    console.log("New Request : \n" + req.body); 
    const new_data = new schema({
        name: req.body.name,
        password: req.body.password
    });
    try {
        const post_save = await new_data.save();
        res.json(post_save);
    } catch (e) {
        res.json({message: e});
    }
})

app.get(url_basic + '/id=:n_id', async (req, res) => {
    try {
        const data = await schema.findById(req.params.n_id);
        res.json(data);
    } catch (e) {
        res.json({message: e});
    }
});

app.get(url_basic + '/list', async (req, res) => {
    try {
        schema.find({}, (err, users) => {
            res.json(users);
        })
    } catch (e) {
        res.json({message: e});
    }
});

app.get(url_basic + '/name=:n_name', async (req, res) => {
    try {
        db.collection("users").find({name: req.params.n_name}).toArray((err, result) => {
            res.json(result);
          });
    } catch (e) {
        res.json({message: e});
    }
})

app.delete(url_basic + '/id=:n_id', async (req, res) => {
    try {
        res.json(await schema.deleteOne({_id: req.params.n_id}));
    } catch (e) {
        res.json({message: e});
    }
})

app.put(url_basic + '/id=:n_id/:var=:value', async (req, res) => {
    try {
        console.log("Modification de : " + req.params.var + " Par : " + req.params.value);
        if (req.params.var === "name") {
            res.json(await schema.updateOne({_id: req.params.n_id}, {$set: {name: req.params.value}}));
        } else if (req.params.var === "age") {
            res.json(await schema.updateOne({_id: req.params.n_id}, {$set: {age: req.params.value}}));
        } else if (req.params.var === "familly") {
            res.json(await schema.updateOne({_id: req.params.n_id}, {$set: {familly: req.params.value}}));
        } else if (req.params.var === "race") {
            res.json(await schema.updateOne({_id: req.params.n_id}, {$set: {race: req.params.value}}));
        } else if (req.params.var === "origin") {
            res.json(await schema.updateOne({_id: req.params.n_id}, {$set: {origin: req.params.value}}));
        } else if(req.params.var === "add_friend") {
            res.json(await schema.updateOne({_id: req.params.n_id}, {$push: {friends: req.params.value}}));
        } else if(req.params.var === "add_friend") {
            res.json(await schema.updateOne({_id: req.params.n_id}, {$push: {friends: req.params.value}}));
        } else if(req.params.var === "rem_friend") {
            res.json(await schema.updateOne({_id: req.params.n_id}, {$pull: {friends: req.params.value}}));
        } else {
            console.log("This value is not supported" + req.params.value + " " + req.params.value);
            res.json("This value is not supported" + req.params.value + " " + req.params.value);
        }
    } catch (e) {
        res.json({message: e});
    }
})

app.listen(process.env.LOCAL_HOST_PORT, () => {
    console.log("Start Server");
})