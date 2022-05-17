import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
    render(<App />);
});

test("Can edit a course, renders an editor screen", () => {
    const EDIT = screen.getAllByRole("button", {
        name: /Edit Course/i
    });
    userEvent.click(EDIT[0]);
    const SAVE = screen.getAllByRole("button", { name: /Save Changes/i });
    expect(SAVE[0]).toBeInTheDocument();
});

test("Can cancel edits", () => {
    const EDIT = screen.getAllByRole("button", {
        name: /Edit Course/i
    });
    userEvent.click(EDIT[0]);
    const CANCEL = screen.getAllByRole("button", { name: /Cancel/i });
    userEvent.click(CANCEL[0]);
    expect(CANCEL[0]).not.toBeInTheDocument();
});

test("textboxes available for edits", () => {
    const EDIT = screen.getAllByRole("button", {
        name: /Edit Course/i
    });
    userEvent.click(EDIT[0]);
    const EDITboxes = screen.getAllByRole("textbox");
    expect(EDITboxes).toHaveLength(11);
    // should add an additional 7 textboxes to the already existing ones on screen
});

test("changes will be saved", () => {
    const EDIT = screen.getAllByRole("button", {
        name: /Edit Course/i
    });
    userEvent.click(EDIT[0]);
    const EDITboxes = screen.getAllByRole("textbox");
    // check to see if can type into all of the boxes and save changes
    userEvent.type(EDITboxes[0], " name");
    userEvent.type(EDITboxes[1], " description");
    userEvent.type(EDITboxes[2], " credits");
    userEvent.type(EDITboxes[3], " prereqs");
    userEvent.type(EDITboxes[4], " restrictions");
    userEvent.type(EDITboxes[5], " breadths");
    userEvent.type(EDITboxes[6], " term");
    const SAVE = screen.getAllByRole("button", { name: /Save Changes/i });
    userEvent.click(SAVE[0]);
});
