import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
    render(<App />);
});

test("Renders degree plan modal when Create Degree Plan button is clicked", () => {
    const button = screen.getAllByRole("button", {
        name: /Create New Degree Plan/i
    });
    userEvent.click(button[0]);
    const popUp = screen.getAllByRole("dialog"); // two dialogs in a modal, major and type
    expect(popUp).toHaveLength(2);
});

test("Modal closes on close", () => {
    const CREATEbutton = screen.getAllByRole("button", {
        name: /Create New Degree Plan/i
    });
    userEvent.click(CREATEbutton[0]);
    const CLOSEbutton = screen.getAllByRole("button", {
        name: /Close/i
    });
    userEvent.click(CLOSEbutton[0]);
    expect(CLOSEbutton[0]).not.toBeInTheDocument();
});

test("Modal closes on save", () => {
    const hideButton = screen.getAllByRole("button", { name: /Show Less/i });
    userEvent.click(hideButton[0]);
    const CREATEbutton = screen.getAllByRole("button", {
        name: /Create New Degree Plan/i
    });
    userEvent.click(CREATEbutton[0]);

    const BOXES = screen.getAllByRole("combobox");
    userEvent.selectOptions(BOXES[0], "BA");
    // userEvent.selectOptions(BOXES[1], "Computer Science");

    const SAVEbutton = screen.getAllByRole("button", {
        name: /Save/i
    });
    userEvent.click(SAVEbutton[0]);
    expect(SAVEbutton[0]).not.toBeInTheDocument();
});

test("Adds new degree plan save", () => {
    const hideButton = screen.getAllByRole("button", { name: /Show Less/i });
    userEvent.click(hideButton[0]);
    const CREATEbutton = screen.getAllByRole("button", {
        name: /Create New Degree Plan/i
    });
    userEvent.click(CREATEbutton[0]);

    const BOXES = screen.getAllByRole("combobox");
    userEvent.selectOptions(BOXES[0], "BA");
    userEvent.selectOptions(BOXES[1], "Computer Science");

    const SAVEbutton = screen.getAllByRole("button", {
        name: /Save/i
    });
    userEvent.click(SAVEbutton[0]);
    const newdegree = screen.getByRole("heading", { name: /BA/ });
    expect(newdegree).toBeInTheDocument();
});

test("Can add different degrees", () => {
    const hideButton = screen.getAllByRole("button", { name: /Show Less/i });
    userEvent.click(hideButton[0]);
    const CREATEbutton = screen.getAllByRole("button", {
        name: /Create New Degree Plan/i
    });
    userEvent.click(CREATEbutton[0]);

    const BOXES = screen.getAllByRole("combobox");
    userEvent.selectOptions(BOXES[0], "BS");
    userEvent.selectOptions(BOXES[1], "Computer Science");

    const SAVEbutton = screen.getAllByRole("button", {
        name: /Save/i
    });
    userEvent.click(SAVEbutton[0]);
    const newdegree = screen.getByRole("heading", { name: /BS/ });
    expect(newdegree).toBeInTheDocument();
});
