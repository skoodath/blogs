const Blog = require("../models/blog");
const User = require("../models/user");

const blogList = [
  {
    title: "How to test backend",
    author: "Shiju Nambiar",
    url: "http://localhost:3003/api/blogs/how-to-test-backend",
    likes: 0,
  },
  {
    title: "How to use Supertest for API test",
    author: "Shiju Nambiar",
    url: "http://localhost:3003/api/blogs/how-to-supertest-for-api",
    likes: 0,
  },
];

const blogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  blogList,
  blogsInDB,
  usersInDb
};
