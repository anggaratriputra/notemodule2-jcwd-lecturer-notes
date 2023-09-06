import { screen, render, fireEvent } from "@testing-library/react";
import UserCard from "./UserCard";

describe("test component UserCard", () => {
  test("should display username", () => {
    render(<UserCard username="testing" />);
    const userCard = screen.getByText("testing");
    expect(userCard).toBeInTheDocument();
  });

  test("should display capitalize initial username", () => {
    render(<UserCard username="testing" />);
    const userCard = screen.getByText("T");
    expect(userCard).toBeInTheDocument();
  });

  test("icon to be not visible on click add user", () => {
    render(<UserCard username="testing" />);
    const iconButton = screen.getByLabelText("add-user");
    fireEvent.click(iconButton);
    expect(iconButton).not.toBeVisible();
  });
});
