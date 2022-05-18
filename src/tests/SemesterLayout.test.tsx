import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
    render(<App />);
});

test("can delete semesters", () => {
    const DEFAULT = screen.getByText("Fall First Semester");
    const DELETE = screen.getAllByRole("button", { name: /Delete Semester/i });
    userEvent.click(DELETE[0]);
    expect(DEFAULT).not.toBeInTheDocument();
});

test("can edit semesters", () => {
    const DELETE = screen.getAllByRole("button", { name: /Remove/i });
    userEvent.click(DELETE[0]);
});

/* test("Will not create semester if nothing inputted", () => {
    render(<SemesterLayout />);
    const typebox = screen.getByPlaceholderText(/Type semester here/i);
    userEvent.click(typebox);
    expect(screen).not.toContainElement("button", { name: /Add Course/i });
}); */
