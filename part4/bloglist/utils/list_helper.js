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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
