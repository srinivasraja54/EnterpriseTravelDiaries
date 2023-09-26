const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const blogSchema = new Schema({
    id: { type: String, required: true, unique: true },
    blogTitle: { type: String },
    userName: { type: String },
    userId: { type: String},
    blogText: String,
    imageDirectory: String,
    createTime: Date,
    lastUpdateTime: Date,
    tags: String,
    likes: Number,        
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;