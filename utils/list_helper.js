const dummy = (blogs) => {
  return 1;
};


const totalLikes = (array) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };
  return array.length === 1 ? array[0].likes : array.reduce(reducer, 0);
};

const favoriteBlog = (array) => {
  const reducer = (max, item) => {
    return !max || item.likes > max.likes ? item : max;
  };
  return array.length !== 0 ? array.reduce(reducer, 0) : null;
};

const mostBlogs = (array) => {
  let count = 1;
  let first = array[0].author;
  for (let val of array) {
    if(val.author === first){
      count++;
    }
  }
}

module.exports = { dummy, totalLikes, favoriteBlog };
