import React from "react";
import {
    getAllByText,
    getByText,
    render,
    screen
} from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

test("Renders degree plan modal when Create Degree Plan button is clicked", () => {
    render(<App />);
    const button = screen.getAllByRole("button", {
        name: /Create New Degree Plan/i
    });
    userEvent.click(button[0]);
    const popUp = screen.getAllByRole("dialog");
    expect(popUp).toHaveLength(1);
});

test("Can close modal by clicking save", () => {
    render(<App />);
    const button = screen.getAllByRole("button", {
        name: /Create New Degree Plan/i
    });
    userEvent.click(button[0]);
    const save = screen.getByRole("button", { name: /Save/i });
    expect(save).toBeInTheDocument();
    userEvent.click(save);
    expect(save).not.toBeVisible();
    // after clicking save the modal closes (save button would no longer be visible)
});

test("Saving information allows user to see semester layout", () => {
    render(<App />);
    const button = screen.getAllByRole("button", {
        name: /Create New Degree Plan/i
    });
    userEvent.click(button[0]);
    const save = screen.getByRole("button", { name: /Save/i });
    userEvent.click(save);
    const semesterlayout = screen.getByRole("button", {
        name: /Add New Semester/i
    });
    expect(semesterlayout).toBeInTheDocument();
});

test("Can add additional degree plans, add Plan button remains visible", () => {
    render(<App />);
    const button = screen.getAllByRole("button", {
        name: /Create New Degree Plan/i
    });
    userEvent.click(button[0]);
    const save = screen.getByRole("button", { name: /Save/i });
    userEvent.click(save);
    userEvent.click(button[0]);
    userEvent.click(save);
    const semester = screen.getAllByText(/BS/i);
    expect(semester).toHaveLength(2);
});

test("Can delete degree plan", () => {
    render(<App />);
    const button = screen.getAllByRole("button", {
        name: /Create New Degree Plan/i
    });
    userEvent.click(button[0]);
    const save = screen.getByRole("button", { name: /Save/i });
    userEvent.click(save);
    const semesterButton = screen.getByRole("button", {
        name: /Add New Semester/i
    });
    const deleteButton = screen.getByRole("button", {
        name: /Delete Degree Plan/i
    });
    userEvent.click(deleteButton);
    expect(semesterButton).not.toBeInTheDocument();
    // deleting degree plan deletes the semester layout within it
    // this means semester features would no longer be visible, so this tests to see if button is deleted
});
