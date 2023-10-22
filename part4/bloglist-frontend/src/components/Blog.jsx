import { useState } from "react";
import blogsService from "../services/blogs";
const Blog = ({ blog }) => {
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
          </>
        )}
      </div>
    </>
  );
};

export default Blog;
