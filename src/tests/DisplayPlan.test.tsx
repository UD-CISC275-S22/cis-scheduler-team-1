import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

describe("Degree Plan Tests", () => {
    beforeEach(() => {
        render(<App />);
    });

    test("Check if course code displays correctly", () => {
        const code = screen.queryByText("HONR290");
        expect(code).toBeInTheDocument();
    });
    test("Check if course title displays correctly", () => {
        const title = screen.queryByText(
            "Honors Colloquium: Arts and Humanities Topics"
        );
        expect(title).toBeInTheDocument();
    });
    test("Check if course credit displays correctly", () => {
        const credits = screen.queryByText(3);
    });
});
