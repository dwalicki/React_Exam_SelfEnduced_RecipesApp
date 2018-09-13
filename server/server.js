const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const app = express();


mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE)

const { User } = require('./models/user');
const { Recipe } = require('./models/recipe');
const { auth } = require('./middleware/auth');

app.use(bodyParser.json());
app.use(cookieParser());

// GET //

app.get('/api/auth',auth,(req,res)=>{
    res.json({
        isAuth:true,
        id:req.user._id,
        email:req.user.email,
        name:req.user.name,
        lastname:req.user.lastname
    })
})

app.get('/api/logout',auth,(req,res)=>{
    req.user.deleteToken(req.token,(err,user)=>{
        if(err) return res.status(400).send(err);
        res.sendStatus(200)
    })
})

app.get('/api/getRecipe',(req,res)=>{
    let id = req.query.id;

    Recipe.findById(id,(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc)
    })
})

app.get('/api/recipes',(req,res)=>{
    // localhost:3001/api/recipes?skip=3&limit=2&order=asc
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    // ORDER = asc || desc
    Recipe.find().skip(skip).sort({_id:order}).limit(limit).exec((err,doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc);
    })
})

app.get('/api/getChef',(req,res)=>{
    let id = req.query.id;

    User.findById(id,(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.json({
            name: doc.name,
            lastname: doc.lastname
        })
    })
})

app.get('/api/users',(req,res)=>{
    User.find({},(err,users)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(users)
    })
})

app.get('/api/user_posts',(req,res)=>{
    Recipe.find({ownerId:req.query.user}).exec((err,doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc)
    })
})

// POST //

app.post('/api/recipe',(req,res)=>{
    const recipe = new Recipe(req.body)

    recipe.save((err,doc)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            post:true,
            recipeId: doc._id
        })
    })
});

app.post('/api/register',(req,res)=>{
    const user = new User(req.body)

    user.save((err,doc)=>{
        if(err) return res.json({success:false});
        res.status(200).json({
            success:true,
            user:doc
        })
    })
})

app.post('/api/login', (req,res)=>{

    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user) return res.json({isAuth:false,message:'Email not found'})

        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch) return res.json({
                isAuth:false,
                message:'Incorrect password'
            });
            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err);

                res.cookie('auth',user.token).json({
                    isAuth:true,
                    id:user._id,
                    email:user.email
                })
            })
        })
    })
})

// UPDATE //

app.post('/api/recipe_update',(req,res)=>{
    Recipe.findByIdAndUpdate(req.body._id,req.body,{new:true},(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.json({
            success:true,
            doc
        })
    })
})

// DELETE //

app.delete('/api/delete_recipe',(req,res)=>{
    let id = req.query.id;

    Recipe.findByIdAndRemove(id,(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.json(true)
    })
})

const port = process.env.PORT || 3001;
app.listen(port,()=>{
    console.log('Server is running on ' + port)
})