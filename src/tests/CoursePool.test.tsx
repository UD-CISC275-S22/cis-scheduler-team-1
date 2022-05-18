import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
    render(<App />);
});

test("can add to course pool", () => {
    const ADDbutton = screen.getByRole("button", { name: /Add to Pool/i });
    expect(ADDbutton).toBeInTheDocument();

    const hideButton = screen.getAllByRole("button", { name: /Show Less/i });
    userEvent.click(hideButton[1]);
    userEvent.click(hideButton[2]);

    const INPUT = screen.getAllByRole("textbox");
    userEvent.type(INPUT[1], "CISC");
    const CODE = screen.getAllByRole("combobox");
    userEvent.selectOptions(CODE[0], "275");

    userEvent.click(ADDbutton);
});

test("can empty course pool", () => {
    const ADDbutton = screen.getByRole("button", { name: /Add to Pool/i });
    expect(ADDbutton).toBeInTheDocument();

    const hideButton = screen.getAllByRole("button", { name: /Show Less/i });
    userEvent.click(hideButton[1]);
    userEvent.click(hideButton[2]);

    const INPUT = screen.getAllByRole("textbox");
    userEvent.type(INPUT[1], "CISC");
    const CODE = screen.getAllByRole("combobox");
    userEvent.selectOptions(CODE[0], "275");

    userEvent.click(ADDbutton);

    const EMPTY = screen.getByRole("button", { name: /Empty Pool/i });
    userEvent.click(EMPTY);
});

test("can delete a single course from course pool", () => {
    const ADDbutton = screen.getByRole("button", { name: /Add to Pool/i });
    expect(ADDbutton).toBeInTheDocument();

    const hideButton = screen.getAllByRole("button", { name: /Show Less/i });
    userEvent.click(hideButton[1]);
    userEvent.click(hideButton[2]);

    const INPUT = screen.getAllByRole("textbox");
    userEvent.type(INPUT[1], "CISC");
    const CODE = screen.getAllByRole("combobox");
    userEvent.selectOptions(CODE[0], "275");

    userEvent.click(ADDbutton);

    const DELETE = screen.getAllByRole("button", { name: /Delete/i });
    userEvent.click(DELETE[0]);
});

test("can add multiple courses to pool", () => {
    const ADDbutton = screen.getByRole("button", { name: /Add to Pool/i });
    expect(ADDbutton).toBeInTheDocument();

    const hideButton = screen.getAllByRole("button", { name: /Show Less/i });
    userEvent.click(hideButton[1]);
    userEvent.click(hideButton[2]);

    const INPUT = screen.getAllByRole("textbox");
    userEvent.type(INPUT[1], "CISC");
    const CODE = screen.getAllByRole("combobox");
    userEvent.selectOptions(CODE[0], "275");

    userEvent.click(ADDbutton);

    userEvent.type(INPUT[1], "MATH");
    userEvent.selectOptions(CODE[0], "242");
    userEvent.click(ADDbutton);
});

test("can add courses from semester to pool then add back to semester", () => {
    const hideButton = screen.getAllByRole("button", { name: /Show Less/i });
    userEvent.click(hideButton[2]);

    const MOVE = screen.getAllByRole("button", {
        name: /Move to Course Pool/i
    });
    userEvent.click(MOVE[0]);

    const ADD = screen.getAllByRole("button", { name: /Add/ });
    userEvent.click(ADD[2]);
});

test("cannot add fake ID", () => {
    const ADDbutton = screen.getByRole("button", { name: /Add to Pool/i });
    expect(ADDbutton).toBeInTheDocument();

    const hideButton = screen.getAllByRole("button", { name: /Show Less/i });
    userEvent.click(hideButton[1]);
    userEvent.click(hideButton[2]);

    const INPUT = screen.getAllByRole("textbox");
    userEvent.type(INPUT[1], "FAKE");

    userEvent.click(ADDbutton);
});
