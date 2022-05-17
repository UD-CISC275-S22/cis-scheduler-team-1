import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

test("Can save course field edits", () => {
    render(<App />);
    const button = screen.getAllByRole("button", {
        name: /Edit Course Fields Within Semester /i
    });
    userEvent.click(button[0]);
    const popUp = screen.getAllByRole("dialog");
    expect(popUp).toHaveLength(1);
});
