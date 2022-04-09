import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { DisplayCourse } from "./DisplayCourse";

function addCourse(): JSX.Element {
    return <DisplayCourse></DisplayCourse>;
}

export function SemesterLayout(): JSX.Element {
    const [semester, setSemester] = useState<string>(""); // current inputted semester
    const [semesterList, setSemesterList] = useState<string[]>([]); // store inputted semester into an array of semesters

    function updateSemester(event: React.ChangeEvent<HTMLInputElement>) {
        setSemester(event.target.value);
    }
    // adds inputted semester to semester list, does not allow repeat semester names
    function addSemester() {
        if (!semesterList.includes(semester) && semester !== "") {
            setSemesterList([...semesterList, semester]);
        }
        setSemester("");
    }

    return (
        <div style={{ border: "1px solid black", padding: "10px" }}>
            {semesterList.map((semester: string) => (
                <Container key={semester}>
                    <div key={semester}>
                        <h4>{semester}</h4>
                    </div>
                    <DisplayCourse></DisplayCourse>
                    <hr></hr>
                </Container>
            ))}
            <Form.Group>
                <Form.Control
                    value={semester}
                    onChange={updateSemester}
                    placeholder="Type semester here"
                ></Form.Control>
            </Form.Group>
            <Button onClick={addSemester}>Add New Semester</Button>
        </div>
    );
}
