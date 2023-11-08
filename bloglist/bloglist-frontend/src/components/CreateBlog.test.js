import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateBlog from "./CreateBlog";

test("the form calls the event handler passed as props with the correct payload", async () => {
  const mockCreateBlogHandler = jest.fn();

  render(<CreateBlog createBlog={mockCreateBlogHandler} />);

  const inputTitle = screen.getByTestId("input-title");
  const inputAuthor = screen.getByTestId("input-author");
  const inputUrl = screen.getByTestId("input-url");
  expect(inputTitle).toBeInTheDocument();
  expect(inputAuthor).toBeInTheDocument();
  expect(inputUrl).toBeInTheDocument();

  const titleValue = "Test Title";
  const authorValue = "Test Mosby";
  const urlValue = "www.test.com";

  fireEvent.change(inputTitle, {
    target: {
      value: titleValue,
    },
  });
  fireEvent.change(inputAuthor, {
    target: {
      value: authorValue,
    },
  });
  fireEvent.change(inputUrl, {
    target: {
      value: urlValue,
    },
  });

  expect(inputTitle).toHaveValue("Test Title");
  expect(inputAuthor).toHaveValue("Test Mosby");
  expect(inputUrl).toHaveValue("www.test.com");

  const user = userEvent.setup();
  const createButton = screen.getByText("CREATE");
  await user.click(createButton);

  const expectedPayload = {
    author: authorValue,
    title: titleValue,
    url: urlValue,
  };

  expect(mockCreateBlogHandler).toHaveBeenCalledTimes(1);
  expect(mockCreateBlogHandler).toHaveBeenCalledWith(expectedPayload);
});
