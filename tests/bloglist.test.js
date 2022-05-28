const totalLikes = require("../utils/list_helper").totalLikes;
const dummy = require("../utils/list_helper").dummy;

test("dummy returns one", () => {
  const blogs = []

  const result = dummy(blogs)

  expect(result).toBe(1)
})

describe("Total likes", () => {
  test("of empty list is zero", () => {
    const blogs = [];
    const result = totalLikes(blogs);
    expect(result).toBe(0);
  });
  test("if there is only one blog in the list, total likes is same as number of likes", () => {
    const blogs = [
      { 
        title: "Blog 1", 
        author: "Shiju", 
        url: "blog1.com", 
        likes: 6 
      }
    ];
    const result = totalLikes(blogs);
    expect(result).toBe(6);
  });
  test("total likes of all blogs combined is 30", () => {
    const blogs = [
      { title: "blog1", likes: 2 },
      { title: "blog2", likes: 13 },
      { title: "blog3", likes: 11 },
      { title: "blog4", likes: 4 },
    ];
    const result = totalLikes(blogs);
    expect(result).toBe(30);
  });
});
