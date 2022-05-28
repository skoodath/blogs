const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./test_helper");

console.log(helper);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.blogList);
});

test("returns a list of blogs", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("return blog count as two from database", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(helper.blogList.length);
});
test("verifies if unique idenfier is called id", async () => {
  const response = await api.get("/api/blogs");

  const id = response.body.map((res) => res.id);

  expect(id).toBeDefined();
});
test("that a new blog post can be added", async () => {
  const newPost = {
    title: "Testing a new post",
    author: "Shiju Nambiar",
    url: "http://localhost:3003/api/blogs/testing-a-new-post",
    likes: 0,
  };
  await api
    .post("/api/blogs")
    .send(newPost)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogAdded = await helper.blogsInDB();
  expect(blogAdded).toHaveLength(helper.blogList.length + 1);

  const content = blogAdded.map((blog) => blog.title);

  expect(content).toContain("Testing a new post");
});
test("that likes defaults to 0", async () => {
  const newPost = {
    title: "Testing a new post",
    author: "Shiju Nambiar",
    url: "http://localhost:3003/api/blogs/likes-defaults-to-zero",
  };
  await api
    .post("/api/blogs")
    .send(newPost)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogAdded = await helper.blogsInDB();
  expect(blogAdded).toHaveLength(helper.blogList.length + 1);

  const content = blogAdded.map((blog) => blog.likes);

  expect(content).toContain(0);
});

test("that note without title and URL are not saved", async () => {
  const newPost = {
    author: "Shiju Nambiar",
  };
  await api.post("/api/blogs").send(newPost).expect(400);

  const blogAdded = await helper.blogsInDB();
  expect(blogAdded).toHaveLength(helper.blogList.length);
});

test("Blogpost can be deleted", async () => {
  const blogPosts = await helper.blogsInDB();
  const blogToDelete = blogPosts[1];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const remainingBlogs = await helper.blogsInDB();

  expect(remainingBlogs).toHaveLength(helper.blogList.length - 1);
});
test("Checks if likes are increasing", async () => {
  const blogPosts = await helper.blogsInDB();
  const blogToUpdate = blogPosts[0];

  const updatePost = {
    likes: 2,
  };

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatePost).expect(200);

  const updatedBlog = await helper.blogsInDB();

  const content = updatedBlog[0].likes;

  expect(content).toBe(2);
});
