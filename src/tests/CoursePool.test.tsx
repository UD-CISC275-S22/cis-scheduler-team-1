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
    //userEvent.type(INPUT[0], "CISC");
});
