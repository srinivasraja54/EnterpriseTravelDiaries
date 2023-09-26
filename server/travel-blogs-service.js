const Blog = require('./travel-blogs-model');
const ReadPreference = require('mongodb').ReadPreference;

require('./mongo').connect();

function get(req, res) {
  const docquery = Blog.find({}).read(ReadPreference.NEAREST);
  docquery
    .exec()
    .then(blogs => {
      res.json(blogs);
    })
    .catch(err => {
      res.status(500).send(err);
    });
}

function create(req, res) {
  const { id, blogTitle, userName, userId, blogText, imageDirectory, createTime, lastUpdateTime, currentRating, numberOfRatings } = req.body;

  const blog = new Blog({ id, blogTitle, userName, userId, blogText, imageDirectory, createTime, lastUpdateTime, currentRating, numberOfRatings });
  blog
    .save()
    .then(() => {
      res.json(blog);
    })
    .catch(err => {
      res.status(500).send(err);
    });
}

function update(req, res) {
  const { id, blogTitle, userName, userId, blogText, imageDirectory, createTime, lastUpdateTime, currentRating, numberOfRatings } = req.body;

  Blog
    .findOne({ id })
    .then(blog => {
      blog.id = id;
      blog.blogTitle = blogTitle;
      blog.userName = userName;
      blog.userName = userName;
      blog.userId = userId;
      blog.blogText = blogText;
      blog.imageDirectory = imageDirectory;
      blog.createTime = createTime;
      blog.lastUpdateTime = lastUpdateTime;
      blog.currentRating = currentRating;
      blog.numberOfRatings = numberOfRatings;
      blog.save().then(res.json(blog));
    })
    .catch(err => {
      res.status(500).send(err);
    });
}

function destroy(req, res) {
  const { id } = req.params;

  Blog.findOneAndRemove({ id })
    .then(blog => {
      res.json(blog);
    })
    .catch(err => {
      res.status(500).send(err);
    });
}


function find(req, res) {
  const { id } = req.params;
  console.log(id)
  Blog.findOne({ id })
    .then(blog => {
      res.json(blog);
    })
    .catch(err => {
      res.status(500).send(err);
    });
}



function search(req, res) {
  const {pattern}  = req.params;
  Blog.find({
    $or: [
      { "blogTitle": { $regex: new RegExp(pattern, 'i') } }, // 'i' for case-insensitive search
      { "blogText": { $regex: new RegExp(pattern, 'i') } },
      { "userName": { $regex: new RegExp(pattern, 'i') } }
    ]
  })
    .then(blog => {
      res.json(blog);
    })    .catch(err => {
      res.status(500).send(err);
    });
}

function getBlogsByUserId(req, res) {
  const {userId}  = req.params;
  const query = {
    userId: userId,
  };
  const projection = {
    id: 1,          
    blogTitle: 1,  
    createTime: 1,
    lastUpdateTime: 1,
    userName: 1,
  };
  Blog.find(query, projection)
  .then((blogs) => {
    res.json(blogs);
  }).catch(err => {
    res.status(500).send(err);
  });
}

module.exports = { get, create, update, destroy, find, search, getBlogsByUserId };
