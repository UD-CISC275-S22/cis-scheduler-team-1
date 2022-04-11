import React from "react";
import "./App.css";
import { SemesterLayout } from "./semesterLayout";

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
                Welcome to the University of Delaware Course Scheduler!
            </header>
            <p>
                Click through course, semester, and degree options to plan your
                next four years!
            </p>
            Team 1: Jenn Werth and Disha Thakar
            <SemesterLayout></SemesterLayout>
        </div>
    );
}

export default App;
