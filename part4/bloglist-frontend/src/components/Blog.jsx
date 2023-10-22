import { useState } from "react";
import blogsService from "../services/blogs";
const Blog = ({ blog, handleRemove, isBlogCreatorUser = true }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [showDetails, setShowDetails] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const handleLike = async () => {
    const newBlog = { ...blog, likes: likes + 1 };
    const updatedBlog = await blogsService.editBlog(newBlog);
    setLikes(updatedBlog.likes);
  };

  const removeBlog = () => {
    const remove = window.confirm(
      `Remove Blog ${blog.title} by ${blog.author}`
    );
    if (remove) handleRemove(blog.id);
  };

  return (
    <>
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "Hide" : "View"}
        </button>
        {showDetails && (
          <>
            <div>
              <a>{blog.url}</a>
            </div>
            <div>
              Likes {likes} <button onClick={handleLike}>like</button>
            </div>
            {blog.user && <div>{blog.user?.name}</div>}
            {isBlogCreatorUser && <button onClick={removeBlog}>remove</button>}
          </>
        )}
      </div>
    </>
  );
};

export default Blog;
