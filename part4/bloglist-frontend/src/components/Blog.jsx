import { useState } from "react";
const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [showDetails, setShowDetails] = useState(false);

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
              Likes {blog.likes} <button>like</button>
            </div>
            {blog.user && <div>{blog.user?.name}</div>}
          </>
        )}
      </div>
    </>
  );
};

export default Blog;
