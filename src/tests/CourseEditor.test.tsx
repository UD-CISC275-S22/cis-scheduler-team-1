import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
    render(<App />);
});

test("Edit option appears", () => {
    const button = screen.getAllByRole("button", {
        name: /Edit Course/i
    });
    userEvent.click(button[0]);
});

test("Able to edit different parts of course", () => {
    const hideButton = screen.getAllByRole("button", { name: /Show Less/i });
    userEvent.click(hideButton[1]);
    const button = screen.getAllByRole("button", {
        name: /Edit Course/i
    });
    userEvent.click(button[0]);
    const EDITboxes = screen.getAllByRole("textbox");
    expect(EDITboxes).toHaveLength(10);
});

test("Can type into the course editors and save", () => {
    const hideButton = screen.getAllByRole("button", { name: /Show Less/i });
    userEvent.click(hideButton[1]);
    const button = screen.getAllByRole("button", {
        name: /Edit Course/i
    });
    userEvent.click(button[0]);
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
});

test("Can type into the course editors and cancel", () => {
    const hideButton = screen.getAllByRole("button", { name: /Show Less/i });
    userEvent.click(hideButton[1]);
    const button = screen.getAllByRole("button", {
        name: /Edit Course/i
    });
    userEvent.click(button[0]);
    const EDITboxes = screen.getAllByRole("textbox");
    userEvent.type(EDITboxes[0], " name");
    userEvent.type(EDITboxes[1], " description");
    userEvent.type(EDITboxes[2], " credits");
    userEvent.type(EDITboxes[3], " prereqs");
    userEvent.type(EDITboxes[4], " restricts");
    userEvent.type(EDITboxes[5], " breadths");
    userEvent.type(EDITboxes[6], " terms");
    const CANCEL = screen.getAllByRole("button", { name: /Cancel/i });
    userEvent.click(CANCEL[0]);
});

test("Can change credits of a course and save", () => {
    const hideButton = screen.getAllByRole("button", { name: /Show Less/i });
    userEvent.click(hideButton[1]);
    const button = screen.getAllByRole("button", {
        name: /Edit Course/i
    });
    userEvent.click(button[0]);
    const EDITboxes = screen.getAllByRole("textbox");
    userEvent.type(EDITboxes[2], "{selectall}{delete}");
    userEvent.type(EDITboxes[2], "1");

    const SAVE = screen.getAllByRole("button", { name: /Save Changes/i });
    userEvent.click(SAVE[0]);
});
