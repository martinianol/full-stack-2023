import { useState } from "react";

const CreateBlog = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    createBlog(newBlog);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create new Blog</h2>
      <div>
        <label>title:</label>
        <input
          data-testid="input-title"
          id="input-title"
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <label>author:</label>
        <input
          data-testid="input-author"
          id="input-author"
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        <label>url:</label>
        <input
          data-testid="input-url"
          id="input-url"
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit" id="create-blog-button">CREATE</button>
    </form>
  );
};

export default CreateBlog;
