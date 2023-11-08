import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

const testBlog = {
  title: "Testing Title",
  author: "Test Mosby",
  url: "www.testing.com",
  likes: 10,
};

test("renders content correctly", () => {
  const fakeHandleRemove = () => {};

  const { container } = render(
    <Blog blog={testBlog} handleRemove={fakeHandleRemove} />
  );

  const elementTitleAndAuthor = container.querySelector(".title");
  const elementUrl = container.querySelector(".url");
  const elementLikes = container.querySelector(".likes");

  expect(elementTitleAndAuthor).toBeDefined();
  expect(elementTitleAndAuthor).toHaveTextContent(
    `${testBlog.title} ${testBlog.author}`
  );
  expect(elementUrl).toBe(null);
  expect(elementLikes).toBe(null);
});

test("renders url and likes when show detail button is pressed", async () => {
  const fakeHandleRemove = () => {};

  const { container } = render(
    <Blog blog={testBlog} handleRemove={fakeHandleRemove} />
  );

  const user = userEvent.setup();
  const showDetailsButton = screen.getByText("View");
  await user.click(showDetailsButton);

  const elementUrl = container.querySelector(".url");
  const elementLikes = container.querySelector(".likes");

  expect(elementUrl).toHaveTextContent(testBlog.url);
  expect(elementLikes).toHaveTextContent(`Likes ${testBlog.likes}`);
});

test("when pressing n times the like button the event handler is called n times", async() => {
  const fakeHandleRemove = () => {};

  const { container } = render(
    <Blog blog={testBlog} handleRemove={fakeHandleRemove} />
  );

  const user = userEvent.setup();
  const showDetailsButton = screen.getByText("View");
  await user.click(showDetailsButton);

  const likeButton = container.querySelector("#like-button")

  await like
})
