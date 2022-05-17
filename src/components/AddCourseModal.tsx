import React, { useState } from "react";
import { Button, Modal, Form, Row } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Degreeplan } from "../interfaces/degreeplan";
import { Semester } from "../interfaces/semester";

export function AddCourseModal({
    course,
    show,
    handleClose,
    plan,
    editPlan
}: {
    course: Course;
    show: boolean;
    handleClose: () => void;
    plan: Degreeplan;
    editPlan: (id: number, newDegree: Degreeplan) => void;
}) {
    type ChangeEvent = React.ChangeEvent<
        HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >;

    // track which semester the user chooses to imput the course into
    const [semester, setSemester] = useState<Semester>({
        id: 0,
        courses: [],
        title: "",
        credits: 0
    });

    function trackSemCredits(courses: Course[]): number {
        const creditList = courses.map((course: Course): number =>
            parseInt(course.credits.substring(course.credits.length - 1))
        );

        const credits = creditList.reduce(
            (total: number, credit: number) => total + credit,
            0
        );
        return credits;
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

    function saveAll() {
        const updatedCourses = [...semester.courses, course];
        const updatedPool = plan.pool.filter(
            (current: Course): boolean => current !== course
        );
        const updatedSem = {
            ...semester,
            courses: updatedCourses,
            credits: trackSemCredits(updatedCourses)
        };
        setSemester(updatedSem);

        const updatedSemesters = plan.semesters.map((current: Semester) =>
            current.id === semester.id ? updatedSem : current
        );
        editPlan(plan.id, {
            ...plan,
            semesters: updatedSemesters,
            pool: updatedPool,
            totalCredits: trackDegreeCredits(updatedSemesters)
        });
        handleClose();
    }

    function updateChoice(event: ChangeEvent) {
        // find the semester that was chosen
        console.log("onChange called");
        const sem = plan.semesters.filter(
            (semester: Semester): boolean =>
                semester.title === event.target.value
        );
        setSemester(sem[0]);

        console.log("sem[0] / selected semester");
        console.log(sem[0].title);
        console.log("pool courses:");
        console.log(plan.pool);
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add to Semester</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="degreeId" as={Row}>
                        <Form.Label>Select semester:</Form.Label>
                        <Row>
                            <Form.Select onChange={updateChoice}>
                                <option>Select Semester</option>
                                {plan.semesters.map((semester: Semester) => (
                                    <option
                                        key={semester.id}
                                        value={semester.title}
                                    >
                                        {semester.title}
                                    </option>
                                ))}
                            </Form.Select>
                        </Row>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveAll}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
