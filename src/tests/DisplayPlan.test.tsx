import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
    render(<App />);
});

test("textbox to input a new semester appears", () => {
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
    const typeSemester = screen.getAllByRole("textbox");
    expect(typeSemester).toHaveLength(2);
    // one for semester and one for the pool
});
test("can add new semester", () => {
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
    const typeSemester = screen.getAllByRole("textbox");
    userEvent.type(typeSemester[0], "Spring");
    const ADDbutton = screen.getByRole("button", { name: /Add New Semester/i });
    userEvent.click(ADDbutton);
    const title = screen.getByText("Spring");
    expect(title).toBeInTheDocument();
});

test("can clear all semesters", () => {
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
    const typeSemester = screen.getAllByRole("textbox");
    userEvent.type(typeSemester[0], "Spring");
    const ADDbutton = screen.getByRole("button", { name: /Add New Semester/i });
    userEvent.click(ADDbutton);
    const title = screen.getByText("Spring");
    const DELETEbutton = screen.getByRole("button", {
        name: /Clear Semesters/i
    });
    userEvent.click(DELETEbutton);
    expect(title).not.toBeInTheDocument();
});

test("Can collapse semester (show less)", () => {
    //const DEFAULT = screen.getByText("CISC 108");
    const LESSbutton = screen.getAllByRole("button", { name: /Show Less/i });
    userEvent.click(LESSbutton[1]);
    expect(LESSbutton[1]).toBeInTheDocument();
});

test("Can show more once collapsed semester (show more button)", () => {
    //const DEFAULT = screen.getByText("CISC 108");
    const LESSbutton = screen.getAllByRole("button", { name: /Show Less/i });
    userEvent.click(LESSbutton[1]);
    const MOREbutton = screen.getAllByRole("button", { name: /Show More/i });
    expect(MOREbutton[0]).toBeInTheDocument();
});

test("Can move courses from semesters to pool", () => {
    //const DEFAULT = screen.getByText("CISC 108");
    const MOVEbutton = screen.getAllByRole("button", {
        name: /Move to Course Pool/i
    });
    userEvent.click(MOVEbutton[0]);
});

// Plan List coverage applied here too
test("Can delete a degree plan entirely", () => {
    const DELETE = screen.getAllByRole("button", {
        name: /Delete Degree Plan/i
    });
    const DEFAULT = screen.getByText("First Year CIS");
    userEvent.click(DELETE[0]);
    expect(DEFAULT).not.toBeInTheDocument();
});
