import Blog from "./Blog";

const Blogs = ({ blogs, user, handleRemove }) => {
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
