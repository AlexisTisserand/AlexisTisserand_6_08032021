const mongoose = require('mongoose')

const Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

const sauceSchema = new Schema({
    id: {type: ObjectId, required: true},
    userId: {type: String, required: true},
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: true},
    heat: {type: Number, required: true},
    likes: {type: Number, required: true},
    dislikes: {type: Number, required: true},
    usersLiked: {type: [String], required: true},
    usersDisliked: {type: [String], required: true},
});

module.exports = mongooser.model('Sauce', sauceSchema);