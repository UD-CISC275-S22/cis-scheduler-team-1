import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
    render(<App />);
});

test("Modal appears on click", () => {
    const ADDPOOL = screen.getByRole("button", { name: /Add to Pool/i });

    const hideButton = screen.getAllByRole("button", {
        name: /Show Less/i
    });
    userEvent.click(hideButton[1]);
    userEvent.click(hideButton[2]);

    const INPUT = screen.getAllByRole("textbox");
    userEvent.type(INPUT[1], "CISC");
    const CODE = screen.getAllByRole("combobox");
    userEvent.selectOptions(CODE[0], "275");

    userEvent.click(ADDPOOL);

    const ADD = screen.getAllByRole("button", {
        name: /Add/i
    });

    userEvent.click(ADD[1]);
});

test("Can select a semester from dropdown", () => {
    const ADDPOOL = screen.getByRole("button", { name: /Add to Pool/i });

    const hideButton = screen.getAllByRole("button", {
        name: /Show Less/i
    });
    userEvent.click(hideButton[1]);
    userEvent.click(hideButton[2]);

    const INPUT = screen.getAllByRole("textbox");
    userEvent.type(INPUT[1], "CISC");
    const CODE = screen.getAllByRole("combobox");
    userEvent.selectOptions(CODE[0], "275");

    userEvent.click(ADDPOOL);

    const ADD = screen.getAllByRole("button", {
        name: /Add/i
    });

    userEvent.click(ADD[1]);

    const SELECT = screen.getAllByRole("combobox");
    userEvent.selectOptions(SELECT[1], "Spring Second Semester");
});

test("Can select a semester from dropdown and change mind", () => {
    const ADDPOOL = screen.getByRole("button", { name: /Add to Pool/i });

    const hideButton = screen.getAllByRole("button", {
        name: /Show Less/i
    });
    userEvent.click(hideButton[1]);
    userEvent.click(hideButton[2]);

    const INPUT = screen.getAllByRole("textbox");
    userEvent.type(INPUT[1], "CISC");
    const CODE = screen.getAllByRole("combobox");
    userEvent.selectOptions(CODE[0], "275");

    userEvent.click(ADDPOOL);

    const ADD = screen.getAllByRole("button", {
        name: /Add/i
    });

    userEvent.click(ADD[1]);

    const SELECT = screen.getAllByRole("combobox");
    userEvent.selectOptions(SELECT[1], "Spring Second Semester");
    userEvent.selectOptions(SELECT[1], "Fall First Semester");

    const SAVE = screen.getAllByRole("button", { name: /Save/i });
    userEvent.click(SAVE[0]);
});
