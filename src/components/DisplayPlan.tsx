import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Degreeplan } from "../interfaces/degreeplan";
import { Semester } from "../interfaces/semester";
import { CoursePool } from "./CoursePool";
import { RequirementView } from "./RequirementView";
import { SemesterLayout } from "./SemesterLayout";

export function DisplayPlan({
    plan,
    editPlan
}: {
    plan: Degreeplan;
    editPlan: (id: number, newDegree: Degreeplan) => void;
}): JSX.Element {
    const [fullView, setFullView] = useState<boolean>(true);
    const blankSemester = { id: 0, title: "", courses: [], credits: 0 };

    const [addedSemester, setAddedSemester] = useState<Semester>(blankSemester); // current inputted semester

    function changeFullView() {
        setFullView(!fullView);
    }

    function editPool(newPool: Course[]) {
        editPlan(plan.id, {
            ...plan,
            pool: newPool
        });
    }

    function trackCredits(semesters: Semester[]): number {
        const semesterCredits = semesters.map(
            (semester: Semester): number => semester.credits
        );
        const total = semesterCredits.reduce(
            (currentTotal: number, credits: number) => currentTotal + credits
        );
        return total;
    }

    // semester edit functions

    function clearSemesters() {
        editPlan(plan.id, {
            ...plan,
            semesters: [],
            totalCredits: 0
        });
    }

    function addSemester() {
        if (
            !plan.semesters.includes(addedSemester) &&
            addedSemester.title !== ""
        ) {
            editPlan(plan.id, {
                ...plan,
                semesters: [...plan.semesters, addedSemester]
            });
        }
    }

    function inputSemester(event: React.ChangeEvent<HTMLInputElement>) {
        setAddedSemester({
            id: plan.semesters.length, // always want semester id to increment
            title: event.target.value,
            courses: [],
            credits: 0
        });
    }

    function editSemester(id: number, newSemester: Semester) {
        const updatedSemesters = plan.semesters.map(
            (semester: Semester): Semester =>
                semester.id === id ? newSemester : semester
        );
        editPlan(plan.id, {
            ...plan,
            semesters: updatedSemesters,
            totalCredits: trackCredits(updatedSemesters)
        });
    }

    // need the edit semester function here so that pool can access it
    return fullView ? (
        <div>
            <Row>
                <Col xs={8} className="bg-grey border m-2 p-2">
                    <Container>
                        <h3 key={plan.title}>{plan.title}</h3>
                        <Button onClick={changeFullView}>Show Less</Button>
                        {plan.semesters.map((semester: Semester) => (
                            <Container key={semester.title}>
                                <div key={semester.title}>
                                    <h4>{semester.title}</h4>
                                </div>
                                <SemesterLayout
                                    plan={plan}
                                    editPlan={editPlan}
                                    semester={semester}
                                ></SemesterLayout>
                            </Container>
                        ))}
                        <Form.Group>
                            <Form.Control
                                onChange={inputSemester}
                                placeholder="Type semester here"
                            ></Form.Control>
                        </Form.Group>
                        <Button onClick={addSemester}>Add New Semester</Button>
                        <Button onClick={clearSemesters}>
                            Clear Semesters
                        </Button>
                        <hr></hr>
                    </Container>
                </Col>
                <Col>
                    <Row>
                        <Container>
                            <RequirementView plan={plan}></RequirementView>
                        </Container>
                    </Row>
                    <Row>
                        <Container>
                            <CoursePool
                                plan={plan}
                                editPool={editPool}
                                editSemester={editSemester}
                                editPlan={editPlan}
                            ></CoursePool>
                        </Container>
                    </Row>
                </Col>
            </Row>
        </div>
    ) : (
        <div>
            <h3 key={plan.title}>{plan.title}</h3>
            <Button onClick={changeFullView}>Show More</Button>
        </div>
    );
}
