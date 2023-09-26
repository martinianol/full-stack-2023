const lodash = require("lodash");

const { chain, countBy, groupBy, sortBy } = lodash;

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const sumLikes = (acc, currentValue) => {
    return acc + currentValue.likes;
  };

  return blogs.reduce(sumLikes, 0);
};

const favoriteBlog = (blogs) => {
  const maxLike = Math.max(...blogs.map((blog) => blog.likes));
  const blogWithMaxLikes = blogs.find((blog) => blog.likes === maxLike);
  return blogWithMaxLikes;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return "Blog list is empty";
  }

  const topAuthor = chain(blogs)
    .groupBy("author")
    .map((group, author) => {
      return { author: author, blogs: group.length };
    })
    .maxBy("blogs")
    .value();

  return topAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
