const mongoose = require('mongoose')

const sauceShema = mongoose.Schema({
    id: {type: ObjectId, required: true},
    userId: {type: String, }

})