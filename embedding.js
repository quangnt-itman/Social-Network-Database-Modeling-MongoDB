const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fs10-social-network", {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
  .then(() => console.log("Connect Success"))
  .catch(console.log)

const CommentSchema = new mongoose.Schema({
  content: { type: String }
})
const Comment = mongoose.model("Comment", CommentSchema, "Comment")


const PostSchema = new mongoose.Schema({
  title: { type: String, required: true }, // not null (true), nullable (false)
  content: { type: String },
  comments: [CommentSchema] //
})
const Post = mongoose.model("Post", PostSchema, "Post")


const createPost = async (title, content) => {
  return await Post.create({ title, content })
}

// createPost("Covid 19", "Sap co vaccine")
const comment = new Comment({ content: "Chac chan :)" })

Post.findById("5f5f7113909e1c0818816ea8")
  .then(post => {
    if (!post) return Promise.reject({ message: "Post Not Found" })

    post.comments.push(comment);

    return post.save()
  })
  .then(console.log)
  .catch(console.log)