const bcrypt = require("bcrypt")
const User = require("../models/user")
const app = require("../app")
const supertest = require("supertest")
const api = supertest(app)
const helper = require("./test_helper")

describe("when there is only a single user", () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("s3kret", 10)
    const user = new User({username: "root", passwordHash})

    await user.save()
  })

  test("new user creation is successful", async () =>{
    const userAtStart = await helper.usersInDb();

    const newUser = {
      username: "testuser",
      name: "Test User",
      password: "s3kret"
    }

    await api
    .post("/api/users")
    .send(newUser)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const userAtEnd = await helper.usersInDb()

  expect(userAtEnd).toHaveLength(userAtStart.length + 1)

  const usernames = userAtEnd.map(user => user.username)

  expect(usernames).toContain(newUser.username)

  })
  test("fails if user already exists in db", async () => {
    const userAtStart = await helper.usersInDb()

    const newUser = {
      username: "root",
      name: "",
      password: "s3kret"
    }

    const result = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain("username already exist")

    const userAtEnd = await helper.usersInDb()

    expect(userAtEnd).toEqual(userAtStart)
  })
})