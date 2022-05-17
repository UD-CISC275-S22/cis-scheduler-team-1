import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
//import { SemesterLayout } from "./SemesterLayout";

test("Renders semester layout that allows you to input courses", () => {
    render(<App />);
    const degree = screen.getAllByRole("button", {
        name: /Create New Degree Plan/i
    });
    userEvent.click(degree[0]);
    const save = screen.getAllByRole("button", {
        name: /Save/i
    });
    userEvent.click(save[0]);
    const semester = screen.getByRole("button", {
        name: /Add New Semester/i
    });
    expect(semester).toBeInTheDocument();
    // after adding a degree plan and saving, semester button appears to add semesters to plan
});

/* test("Can create own semester title", () => {
    render(<SemesterLayout />);
    const typebox = screen.getByPlaceholderText(/Type semester here/i);
    expect(typebox).toBeInTheDocument();
}); */

/* test("Will not create semester if nothing inputted", () => {
    render(<SemesterLayout />);
    const typebox = screen.getByPlaceholderText(/Type semester here/i);
    userEvent.click(typebox);
    expect(screen).not.toContainElement("button", { name: /Add Course/i });
}); */
