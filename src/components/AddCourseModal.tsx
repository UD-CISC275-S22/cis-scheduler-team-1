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
    //const [id, setID] = useState<number>(0);

    // find the matching semester in the plan, add course to courses[] in the semester and update plan
    // so need to have editSemester function
    function saveAll() {
        /*         //const updatedCourses = [...semester.courses, course];
        editSemester(id, {
            ...semester,
            courses: [...semester.courses, course]
        });

        // remove course from pool
        const updated = plan.pool.filter(
            (current: Course): boolean => current !== course
        );
        editPool(updated); */

        const updatedCourses = [...semester.courses, course];
        const updatedPool = plan.pool.filter(
            (current: Course): boolean => current !== course
        );
        const updatedSem = {
            ...semester,
            courses: updatedCourses
        };
        const updatedSemesters = plan.semesters.map((current: Semester) =>
            current.id === semester.id ? updatedSem : current
        );
        editPlan(plan.id, {
            ...plan,
            semesters: updatedSemesters,
            pool: updatedPool
        });
        handleClose();

        /*
        const updatedCourses = [...semester.courses, newCourse];
                //setCourseList(updatedCourses);
                setCreditCount(trackSemCredits(updatedCourses));
                editSemester(semester.id, {
                    ...semester,
                    courses: updatedCourses,
                    credits: trackSemCredits(updatedCourses)
        */
    }

    function updateChoice(event: ChangeEvent) {
        // find the semester that was chosen
        const sem = plan.semesters.filter(
            (semester: Semester): boolean =>
                semester.title === event.target.value
        );
        setSemester({
            id: sem[0].id,
            title: sem[0].title,
            credits: sem[0].credits,
            courses: [...sem[0].courses, course]
        });
        //setID(sem[0].id);
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
                            <Form.Select
                                value={semester.title}
                                onChange={updateChoice}
                                placeholder="Select Semester"
                            >
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
