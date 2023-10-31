import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("renders content correctly", () => {
  const blog = {
    title: "Testing Title",
    author: "Test Mosby",
    url: "www.testing.com",
  };
  const fakeHandleRemove = () => {};

  const { container } = render(
    <Blog blog={blog} handleRemove={fakeHandleRemove} />
  );

  const elementTitleAndAuthor = container.querySelector(".title");
  const elementUrl = container.querySelector(".url");
  const elementLikes = container.querySelector(".likes");

  expect(elementTitleAndAuthor).toBeDefined();
  expect(elementTitleAndAuthor).toHaveTextContent(`${blog.title} ${blog.author}`);
  expect(elementUrl).toBe(null);
  expect(elementLikes).toBe(null);
});
