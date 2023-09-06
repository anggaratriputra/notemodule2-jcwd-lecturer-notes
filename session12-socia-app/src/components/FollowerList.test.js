/* eslint-disable testing-library/no-debugging-utils */
import { render, screen } from "@testing-library/react";
import FollowerList from "./FollowerList";
import { server } from "../mocks/server";
import { rest } from "msw";

describe("component FollowerList", () => {
  test("display follower name", async () => {
    render(<FollowerList />);
    const followerElement = await screen.findByTestId("follower-item-0");
    expect(followerElement).toBeInTheDocument();
    expect(followerElement.textContent).toBe("Budi");
  });

  test("should render followers from MSW", async () => {
    render(<FollowerList />);
    const followerElement = await screen.findAllByRole("heading");
    expect(followerElement).toHaveLength(2);
  });

  test("should display error", async () => {
    server.use(
      rest.get(
        "https://jsonplaceholder.typicode.com/users",
        (req, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );
    render(<FollowerList />);
    const errorElement = await screen.findByText("Error fetching followers");
    expect(errorElement).toBeInTheDocument();
  });
});
