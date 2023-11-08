import Blog from "./Blog";
import blogsService from "../services/blogs";

const Blogs = ({ blogs, user, handleRemove }) => {
  const handleLike = async (newBlog) => {
    await blogsService.editBlog(newBlog);
  };

  return (
    <>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          isBlogCreatorUser={blog.user?.username === user.username}
          handleRemove={handleRemove}
          onBlogLike={handleLike}
        />
      ))}
    </>
  );
};

export default Blogs;
