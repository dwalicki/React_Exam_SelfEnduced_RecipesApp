const config = {
    production:{
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    default:{
        SECRET: 'SECRETPASSWORD123',
        DATABASE: 'mongodb://localhost:27017/recipeApp'
    }
}

exports.get = function get(env){
    return config[env] || config.default
}