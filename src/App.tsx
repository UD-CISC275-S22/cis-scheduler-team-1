import React from "react";
import "./App.css";
import { SemesterLayout } from "./semesterLayout";

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">UD Course Scheduler</header>
            <p>
                Edit <code>src/App.tsx</code> and save. This page will
                automatically reload.
            </p>
            Team 1: Jenn Werth and Disha Thakar
            <SemesterLayout></SemesterLayout>
        </div>
    );
}

export default App;
