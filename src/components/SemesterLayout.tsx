import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Degreeplan } from "../interfaces/degreeplan";
import { DisplayCourse } from "./DisplayCourse";
import { Semester } from "../interfaces/semester";

export function SemesterLayout({
    plan,
    editDegree
}: {
    plan: Degreeplan;
    deleteDegree: (id: string) => void;
    editDegree: (id: number, newDegree: Degreeplan) => void;
}): JSX.Element {
    const blankSemester = { id: 0, title: "", courses: [] };
    const [semester, setSemester] = useState<Semester>(blankSemester); // current inputted semester
    const [semesterList, setSemesterList] = useState<Semester[]>([]); // store inputted semester into an array of semesters

    function updateSemester(event: React.ChangeEvent<HTMLInputElement>) {
        setSemester({
            id: plan.id,
            title: event.target.value,
            courses: []
            //courseTotal: 0
        });
    }

    // adds inputted semester to semester list, does not allow repeat semester names
    function addSemester() {
        if (!semesterList.includes(semester) && semester.title !== "") {
            setSemesterList([...semesterList, semester]);
            editDegree(plan.id, {
                ...plan,
                semesters: [...semesterList, semester]
            });
        }
    }

    function editSemester(id: number, newSemester: Semester) {
        setSemesterList(
            semesterList.map(
                (semester: Semester): Semester =>
                    semester.id === id ? newSemester : semester
            )
        );
        editDegree(id, {
            ...plan,
            semesters: [...semesterList, semester]
        });
    }

    // semesters is a list of semesters os if we edit the courses we have to edit that semester adn then edit that semeseter in degree plan

    function deleteSemester(semester: Semester) {
        const updatedList = [...semesterList];
        const index = updatedList.indexOf(semester);
        updatedList.splice(index, 1);
        setSemesterList(updatedList);
        editDegree(plan.id, {
            ...plan,
            semesters: updatedList
        });
    }

    function clearSemesters() {
        setSemesterList([]);
        editDegree(plan.id, {
            ...plan,
            semesters: []
        });
    }

    //track total credits in semester function

    return (
        <div>
            <div className="bg-white border m-2 p-2">
                {semesterList.map((semester: Semester) => (
                    <Container key={semester.title}>
                        <div key={semester.title}>
                            <h4>{semester.title}</h4>
                        </div>
                        <DisplayCourse
                            plan={plan}
                            semester={semester}
                            editDegree={editDegree}
                            editSemester={editSemester}
                        ></DisplayCourse>
                        <Button onClick={() => deleteSemester(semester)}>
                            Delete Semester
                        </Button>
                        <hr></hr>
                    </Container>
                ))}
            </div>
            <Form.Group>
                <Form.Control
                    value={semester.title}
                    onChange={updateSemester}
                    placeholder="Type semester here"
                ></Form.Control>
            </Form.Group>
            <Button onClick={addSemester}>Add New Semester</Button>
            <Button onClick={clearSemesters}>Clear Semesters</Button>
        </div>
    );
}
