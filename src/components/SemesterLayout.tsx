import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { DisplayCourse } from "./DisplayCourse";

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

    function deleteSemester(semester: string) {
        const updatedList = [...semesterList];
        const index = updatedList.indexOf(semester);
        updatedList.splice(index, 1);
        setSemesterList(updatedList);
    }

    function clearSemesters() {
        setSemesterList([]);
    }

    //track total credits in semester function

    return (
        <div>
            <div className="bg-white border m-2 p-2">
                {semesterList.map((semester: string) => (
                    <Container key={semester}>
                        <div key={semester}>
                            <h4>{semester}</h4>
                        </div>
                        <DisplayCourse></DisplayCourse>
                        <Button onClick={() => deleteSemester(semester)}>
                            Delete Semester
                        </Button>
                        <hr></hr>
                    </Container>
                ))}
            </div>
            <Form.Group>
                <Form.Control
                    value={semester}
                    onChange={updateSemester}
                    placeholder="Type semester here"
                ></Form.Control>
            </Form.Group>
            <Button onClick={addSemester}>Add New Semester</Button>
            <Button onClick={clearSemesters}>Clear Semesters</Button>
        </div>
    );
}
