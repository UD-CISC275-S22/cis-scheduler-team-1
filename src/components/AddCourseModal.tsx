import React, { useState } from "react";
import { Button, Modal, Form, Row } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Degreeplan } from "../interfaces/degreeplan";
import { Semester } from "../interfaces/semester";

export function AddCourseModal({
    course,
    show,
    handleClose,
    editDegree,
    plan,
    add
}: {
    course: Course;
    show: boolean;
    handleClose: () => void;
    editDegree: (id: number, plan: Degreeplan) => void;
    plan: Degreeplan;
    add: (course: Course) => void;
}) {
    type ChangeEvent = React.ChangeEvent<
        HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >;
    const [semester, setSemester] = useState<string>("");

    function trackCredits(courses: Course[]): number {
        const creditList = courses.map((course: Course): number =>
            parseInt(course.credits.substring(course.credits.length - 1))
        );

        const credits = creditList.reduce(
            (total: number, credit: number) => total + credit,
            0
        );
        return credits;
    }
    function editSemester(id: number, newCourse: Course) {
        // find the selected semester in plan
        const selectedSemester = plan.semesters.filter(
            (current: Semester): boolean => current.title === semester
        );
        const updatedCourseList = [...selectedSemester[0].courses, newCourse];
        const updatedSemester = {
            ...selectedSemester,
            courses: updatedCourseList,
            credits: trackCredits(updatedCourseList)
        };
        editDegree(plan.id, {
            ...plan,
            semesters: updatedSemester
        });
    }

    // find the matching semester in the plan, add course to courses[] in the semester and update plan
    // so need to have editSemester function
    function saveAll() {
        add(course);
        handleClose();
    }
    function updateChoice(event: ChangeEvent) {
        setSemester(event.target.value);
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
                                value={semester}
                                onChange={updateChoice}
                                placeholder="Select Semester"
                            >
                                {plan.semesters.map((semester: Semester) => (
                                    <option
                                        key={semester.title}
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
