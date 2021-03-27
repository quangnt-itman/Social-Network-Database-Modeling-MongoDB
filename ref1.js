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
  commentIdArray: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }] //
})
const Post = mongoose.model("Post", PostSchema, "Post")

const newPost = new Post({
  title: "Covide 19",
  content: 'Co vaccine chua?'
})

const comment1 = new Comment({
  content: "Vaccine dang trong giai doan thu nghiem"
})

const comment2 = new Comment({
  content: "Vaccine an toan"
})

newPost.commentIdArray.push(comment1)
newPost.commentIdArray.push(comment2)

// Promise.all([
//   newPost.save(),
//   comment1.save(),
//   comment2.save()
// ])
//   .then(console.log)
//   .catch(console.log)

Post.find()
  .populate("commentIdArray")
  .then(res => console.log(JSON.stringify(res, undefined, 2)))
  .catch(console.log)
