import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
    render(<App />);
});

test("Can remove a course", () => {
    const REMOVE = screen.getAllByRole("button", {
        name: /Remove/i
    });
    userEvent.click(REMOVE[0]);
});

test("Can edit then reset a course", () => {
    const EDIT = screen.getAllByRole("button", {
        name: /Edit Course/i
    });
    userEvent.click(EDIT[0]);
    const EDITboxes = screen.getAllByRole("textbox");
    userEvent.type(EDITboxes[0], " name");
    userEvent.type(EDITboxes[1], " description");
    userEvent.type(EDITboxes[2], " credits");
    userEvent.type(EDITboxes[3], " prereqs");
    userEvent.type(EDITboxes[4], " restricts");
    userEvent.type(EDITboxes[5], " breadths");
    userEvent.type(EDITboxes[6], " terms");
    const SAVE = screen.getAllByRole("button", { name: /Save Changes/i });
    userEvent.click(SAVE[0]);

    const RESET = screen.getAllByRole("button", {
        name: /Reset/i
    });
    userEvent.click(RESET[0]);
});

test("Can clear all courses", () => {
    const CLEAR = screen.getAllByRole("button", {
        name: /Clear Courses/i
    });
    userEvent.click(CLEAR[0]);
});

test("Can input a new course", () => {
    const DEPT = screen.getAllByRole("textbox");
    userEvent.type(DEPT[0], "CISC");
    const ID = screen.getAllByRole("combobox");
    userEvent.selectOptions(ID[0], "275");
    const ADD = screen.getAllByRole("button", { name: /Add Course/i });
    userEvent.click(ADD[0]);
});

test("Can show more / less for courses", () => {
    const MORE = screen.getAllByRole("button", { name: /Show More/i });
    userEvent.click(MORE[0]);
    const LESS = screen.getAllByRole("button", { name: /Show Less/i });
    userEvent.click(LESS[0]);
});
