const favoriteBlog = require("../utils/list_helper").favoriteBlog;

describe("Favorite Blog", () => {
  test("return null if no blogs found", () => {
    const blogs = [];

    expect(favoriteBlog(blogs)).toEqual(null);
  });
  test("returns the blog with most likes", () => {
    const blogs = [
      { title: "blog1", likes: 2 },
      { title: "blog2", likes: 13 },
      { title: "blog3", likes: 18 },
    ];
    const result = favoriteBlog(blogs);

    expect(result).toEqual({ title: "blog3", likes: 18 });
  });
});
