module.exports = app => {
  const posts = require("../controllers/post.controller.js");
  const jsonplaceholder = require("./jsonplaceholder.js");

  // Create a new Post
  app.post("/post", posts.create);

  // Retrieve all Posts
  app.get("/posts", posts.findAll);

  // Retrieve a single post with PostId
  app.get("/posts/:postId", posts.findOne);

  // Update a post with PostId
  app.put("/posts/:postId", posts.update);

  // Delete a post with PostId
  app.delete("/posts/:postId", posts.delete);

  app.get("/addPost", jsonplaceholder);
};
