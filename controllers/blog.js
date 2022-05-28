const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken")

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {username: 1});
  response.json(blogs);
});

/* const getTokenFrom = request => {
  const authorization = request.get("authorization")
  if(authorization && authorization.toLowerCase().startsWith("bearer ")){
    return authorization.split(" ")[1]
  }
  return null;
} */

blogRouter.post("/", async (request, response) => {
  const body = request.body;

  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if(!decodedToken.id) {
    return response.status(401).json({error: "token missing or invalid"})
  }

  const user = await User.findById(decodedToken.id)

  if (body.title === undefined || body.url === undefined) {
    return response.status(400).json({
      error: "Content missing",
    });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  });

  const newBlog = await blog.save();
  user.blogs = user.blogs.concat(newBlog._id)
  await user.save()
  response.status(201).json(newBlog);
});

blogRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  const blog = await Blog.findById(id);

  if(!decodedToken.id) {
    return response.status(401).json({error: "token missing or invalid"})
  } else if (blog.user.toString() !== decodedToken.id ){
    return response.status(401).json({error: "User not authorized to delete"})
  }
    await Blog.findByIdAndRemove(id);
    response.status(204).end();

  
});

blogRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const { likes } = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { likes },
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  );
  response.json(updatedBlog);
});

module.exports = blogRouter;
