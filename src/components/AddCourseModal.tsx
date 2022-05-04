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
    editSemester,
    editPool,
    pool
}: {
    course: Course;
    show: boolean;
    handleClose: () => void;
    plan: Degreeplan;
    editSemester: (id: number, newSemester: Semester) => void;
    editPool: (courses: Course[]) => void;
    pool: Course[];
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
    const [id, setID] = useState<number>(0);

    /*
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
    } */

    // find the matching semester in the plan, add course to courses[] in the semester and update plan
    // so need to have editSemester function
    function saveAll() {
        //const updatedCourses = [...semester.courses, course];
        editSemester(id, {
            ...semester,
            courses: [...semester.courses, course]
        });
        const updated = pool.filter(
            (current: Course): boolean => current !== course
        );
        editPool(updated);
        handleClose();
    }

    function updateChoice(event: ChangeEvent) {
        const sem = plan.semesters.filter(
            (semester: Semester): boolean =>
                semester.title === event.target.value
        );
        setSemester(sem[0]);
        setID(sem[0].id);
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
