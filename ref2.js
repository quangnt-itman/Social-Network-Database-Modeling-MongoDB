const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fs10-social-network", {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
  .then(() => console.log("Connect Success"))
  .catch(console.log)

const CommentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  },
  content: { type: String }
})
const Comment = mongoose.model("Comment", CommentSchema, "Comment")

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true }, // not null (true), nullable (false)
  content: { type: String }
})
const Post = mongoose.model("Post", PostSchema, "Post")

const newPost = new Post({
  title: "Covide 19",
  content: 'Co vaccine chua?'
})

const comment1 = new Comment({
  postId: newPost._id,
  content: "Vaccine dang trong giai doan thu nghiem"
})

const comment2 = new Comment({
  postId: newPost._id,
  content: "Vaccine an toan"
})

// Promise.all([
//   newPost.save(),
//   comment1.save(),
//   comment2.save()
// ])
//   .then(console.log)
//   .catch(console.log)

// comment => post
// Comment.find()
//   .populate("postId")
//   .then(console.log)
//   .catch(console.log)

// post => comment
Comment.find({ postId: "5f5f79f16b43f28b6f58778f" })
  .populate("postId")
  .then(console.log)
  .catch(console.log)