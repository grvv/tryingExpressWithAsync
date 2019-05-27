const Post = require("../models/posts.model.js");

// Create and Save a new Note
exports.create = (req, res) => {
  // Validate request
  if (!req.body.body || !req.body.userId || !req.body.id || !req.body.title) {
    return res.status(400).send({
      message: "Fields are missing"
      //  message: "Note content can not be empty"
    });
  }

  // Create a Post
  const post = new Post({
    userId: req.body.userId,
    id: req.body.id,
    title: req.body.title,
    body: req.body.body
  });

  // Save Post in the database
  post
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Note."
      });
    });
};

// Retrieve and return all Posts from the database.
exports.findAll = (req, res) => {
  Post.find()
    .then(notes => {
      res.send(notes);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes."
      });
    });
};

// Find a single Post with a PostId
exports.findOne = (req, res) => {
  Post.findById(req.params.postId)
    .then(post => {
      if (!post) {
        return res.status(404).send({
          message: "Post not found with id " + req.params.postId
        });
      }
      res.send(post);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Post not found with id " + req.params.postId
        });
      }
      return res.status(500).send({
        message: "Error retrieving Post with id " + req.params.postId
      });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.title || !req.body.body) {
    return res.status(400).send({
      message: "Post body and title can not be empty"
    });
  }

  // Find note and update it with the request body
  Post.findByIdAndUpdate(
    req.params.postId,
    {
      title: req.body.title,
      body: req.body.body
    },
    { new: true }
  )
    .then(post => {
      if (!post) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.postId
        });
      }
      res.send(post);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.postId
        });
      }
      return res.status(500).send({
        message: "Error updating note with id " + req.params.postId
      });
    });
};

// Delete a post with the specified postId in the request
exports.delete = (req, res) => {
  Post.findByIdAndRemove(req.params.postId)
    .then(post => {
      if (!post) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.postId
        });
      }
      res.send({ message: "Note deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.postId
        });
      }
      return res.status(500).send({
        message: "Could not delete note with id " + req.params.postId
      });
    });
};
