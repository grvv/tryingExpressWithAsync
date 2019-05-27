const axios = require("axios");
const async = require("async");
const Post = require("../models/posts.model.js");

module.exports = async (req, res) => {
  jspPosts = await axios.get("https://jsonplaceholder.typicode.com/posts");

  //   console.log(jspPosts.data);
  async.eachSeries(
    jspPosts.data,
    function(post, asyncdone) {
      //   post.save(asyncdone);
      //   console.log("Post saved");

      new Post({
        userId: post.userId,
        id: post.id,
        title: post.title,
        body: post.body
      }).save(asyncdone);
    },
    function(err) {
      //   if (err) return console.log(err);
      //   done(); // or `done(err)` if you want the pass the error up

      if (err) {
        return res.status(500).send({
          message: "Something went wrong"
        });
      }
    }
  );

  //   res.send({ msg: "Hello World" });
};
