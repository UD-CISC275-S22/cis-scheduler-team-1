import React from "react";
import "./App.css";
import { SemesterLayout } from "./semesterLayout";

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
                Welcome to UD Course Scheduler
            </header>
            <p>
                To add a new semester, click Add Semester. To add classes, enter
                a valid course ID and click Add Course.
            </p>
            Team 1: Jenn Werth and Disha Thakar
            <SemesterLayout></SemesterLayout>
        </div>
    );
}

export default App;
