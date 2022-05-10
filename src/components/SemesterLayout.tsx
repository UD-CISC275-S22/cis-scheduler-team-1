import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Degreeplan } from "../interfaces/degreeplan";
import { DisplayCourse } from "./DisplayCourse";
import { Semester } from "../interfaces/semester";
import { Course } from "../interfaces/course";

export function SemesterLayout({
    plan,
    editPlan,
    editPool
}: {
    plan: Degreeplan;
    editPlan: (id: number, newPlan: Degreeplan) => void;
    editPool: (courses: Course[]) => void;
}): JSX.Element {
    const blankSemester = { id: 0, title: "", courses: [], credits: 0 };
    const [semester, setSemester] = useState<Semester>(blankSemester); // current inputted semester
    //const [semesterList, setSemesterList] = useState<Semester[]>([]); // store inputted semester into an array of semesters

    function inputSemester(event: React.ChangeEvent<HTMLInputElement>) {
        setSemester({
            id: plan.semesters.length, // always want semester id to increment
            title: event.target.value,
            courses: [],
            credits: 0
        });
    }

    // adds inputted semester to semester list, does not allow repeat semester names
    function addSemester() {
        if (!plan.semesters.includes(semester) && semester.title !== "") {
            //setSemesterList([...semesterList, semester]);
            editPlan(plan.id, {
                ...plan,
                semesters: [...plan.semesters, semester]
            });
        }
    }

    function editSemester(id: number, newSemester: Semester) {
        const updatedSemesters = plan.semesters.map(
            (semester: Semester): Semester =>
                semester.id === id ? newSemester : semester
        );
        //setSemesterList(updatedSemesters);
        editPlan(plan.id, {
            ...plan,
            semesters: updatedSemesters,
            totalCredits: trackDegreeCredits(updatedSemesters)
        });
    }

    function trackDegreeCredits(semesters: Semester[]): number {
        const semesterCredits = semesters.map(
            (semester: Semester): number => semester.credits
        );
        const total = semesterCredits.reduce(
            (currentTotal: number, credits: number) => currentTotal + credits
        );
        return total;
    }

    // semesters is a list of semesters os if we edit the courses we have to edit that semester adn then edit that semeseter in degree plan

    function deleteSemester(semester: Semester) {
        const updatedList = [...plan.semesters];
        const index = updatedList.indexOf(semester);
        updatedList.splice(index, 1);
        //setSemesterList(updatedList);
        editPlan(plan.id, {
            ...plan,
            semesters: updatedList,
            totalCredits: trackDegreeCredits(updatedList)
        });
    }

    function clearSemesters() {
        //setSemesterList([]);
        editPlan(plan.id, {
            ...plan,
            semesters: [],
            totalCredits: 0
        });
    }

    //track total credits in semester function

    return (
        <div>
            <div className="bg-white border m-2 p-2">
                {plan.semesters.map((semester: Semester) => (
                    <Container key={semester.title}>
                        <div key={semester.title}>
                            <h4>{semester.title}</h4>
                        </div>
                        <DisplayCourse
                            plan={plan}
                            semester={semester}
                            editPlan={editPlan}
                            editSemester={editSemester}
                            trackDegreeCredits={trackDegreeCredits}
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
                    onChange={inputSemester}
                    placeholder="Type semester here"
                ></Form.Control>
            </Form.Group>
            <Button onClick={addSemester}>Add New Semester</Button>
            <Button onClick={clearSemesters}>Clear Semesters</Button>
        </div>
    );
}
