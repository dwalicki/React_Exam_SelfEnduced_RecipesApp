const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    chef:{
        type:String,
        required:true
    },
    instructions:{
        type:String,
        default:'n/a'
    },
    ingredients:{
        type:String,
        default:'n/a'
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    },
    price:{
        type:String,
        default:'n/a'
    },
    ownerId:{
        type:String,
        required:true
    }
},{timestamps:true})

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = { Recipe }