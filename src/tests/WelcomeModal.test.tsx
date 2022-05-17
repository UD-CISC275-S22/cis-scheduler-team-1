import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("WecomeModal Test", () => {
    beforeEach(() => {
        render(<App />);
    });

    test("Opening the website shows the pop-up Welcome Message", () => {
        const typeText = screen.queryByText(
            "Welcome To The UDEL Course Planner!"
        );
        expect(typeText).toBeInTheDocument();
    });
});
