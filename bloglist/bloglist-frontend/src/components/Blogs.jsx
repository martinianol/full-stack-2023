import Blog from "./Blog";
import blogsService from "../services/blogs";

const Blogs = ({ blogs, user, handleRemove }) => {

  const handleLike = async (blog) => {
    const newBlog = { ...blog, likes: blog.likes + 1 };
    const updatedBlog = await blogsService.editBlog(newBlog);
    setLikes(updatedBlog.likes);
  };

  return (
    <>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          isBlogCreatorUser={blog.user?.username === user.username}
          handleRemove={handleRemove}
        />
      ))}
    </>
  );
};

export default Blogs;
