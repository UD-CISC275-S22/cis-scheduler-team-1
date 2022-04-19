import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { DisplayCourse } from "./DisplayCourse";
import { course as Course } from "./interfaces/course";
import { semester as Semester } from "./interfaces/semester";

export function SemesterLayout(): JSX.Element {
    const [semester, setSemester] = useState<string>(""); // current inputted semester
    const [semesterList, setSemesterList] = useState<string[]>([]); // store inputted semester into an array of semesters
    const [semesterListReal, setSemesterListReal] = useState<Semester[]>([]);

    /*function updateSemesterReal(id: number) {
        setSemesterListReal(semesterListReal.target.value);
    }*/

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

    return (
        <div style={{ border: "1px solid black", padding: "10px" }}>
            {semesterList.map((semester: string) => (
                <Container key={semester}>
                    <div key={semester}>
                        <h4>{semester}</h4>
                    </div>
                    {/*there should be a map for semester here where semester is an interface not string[]*/}
                    <DisplayCourse /*course={course}*/></DisplayCourse>

                    <Button onClick={() => deleteSemester(semester)}>
                        Delete Semester
                    </Button>
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
