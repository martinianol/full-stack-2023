const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const sumLikes = (acc, currentValue) => {
    return acc + currentValue.likes;
  };


  return blogs.reduce(sumLikes, 0);
};

module.exports = {
  dummy,
  totalLikes,
};
