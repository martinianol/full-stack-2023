const listHelper = require("../utils/list_helper");

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];

const listWithMoreBlogs = [
  { author: "Mars", likes: 10 },
  { author: "Mars2", likes: 15 },
  { author: "Mars3", likes: 20 },
];

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("of empty list is zero", () => {
    const blogs = [];
    const result = listHelper.totalLikes(blogs);

    expect(result).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const blogs = listWithOneBlog;
    const result = listHelper.totalLikes(blogs);

    expect(result).toBe(5);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(listWithMoreBlogs);

    expect(result).toBe(45);
  });

  describe("favorite Blog", () => {
    test("it should return the blog with highest likes", () => {
      const result = listHelper.favoriteBlog(listWithMoreBlogs);

      expect(result).toEqual({ author: "Mars3", likes: 20 });
    });
  });
});
