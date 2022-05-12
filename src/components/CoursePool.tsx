import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Course } from "../interfaces/course";
import coursedata from "../data/coursedata.json";
import { Degreeplan } from "../interfaces/degreeplan";
import { AddCourseModal } from "./AddCourseModal";
import { Semester } from "../interfaces/semester";

export function CoursePool({
    plan,
    editPool,
    editSemester,
    editPlan
}: {
    plan: Degreeplan;
    editPool: (courses: Course[]) => void;
    editSemester: (id: number, newSemester: Semester) => void;
    editPlan: (id: number, newDegree: Degreeplan) => void;
}): JSX.Element {
    //const [poolList, setPoolList] = useState<Course[]>(pool); // a comprehensive course list for the pool
    //const [course, setCourse] = useState<Course>();
    const [dept, setDept] = useState<string>(""); // current inputted course that was typed in
    const [id, setID] = useState<string>(""); // course id that was typed in
    const [course, setCourse] = useState<Course>({
        code: "",
        name: "",
        descr: "",
        credits: "",
        preReq: "",
        restrict: "",
        breadth: "",
        typ: ""
    });

    //const [poolList, setPoolList] = useState<Course[]>(pool);

    const COURSES: Record<string, Record<string, Course>> = coursedata;
    const [showAddCourse, setShowAddCourse] = useState<boolean>(false);

    // create handlers for opening and closing modal
    const handleCloseAddCourse = () => setShowAddCourse(false);
    const handleAddCourse = () => setShowAddCourse(true);

    function updateCourse(event: React.ChangeEvent<HTMLInputElement>) {
        if (
            /^[a-zA-Z]+$/.test(event.target.value) ||
            event.target.value === ""
        ) {
            setDept(event.target.value.toUpperCase().substring(0, 4));
        }
    }

    // updates the id from text box
    function updateID(event: React.ChangeEvent<HTMLSelectElement>) {
        setID(event.target.value.toUpperCase());
    }

    function addCourse() {
        const newCourseCode = dept + " " + id;
        // will only add course if valid -- work on displaying error message
        if (dept in COURSES && newCourseCode in COURSES[dept]) {
            const newCourse = {
                ...COURSES[newCourseCode.substring(0, 4)][newCourseCode]
            };
            if (!plan.pool.includes(newCourse)) {
                const updatedCourses = [...plan.pool, newCourse];
                editPool(updatedCourses);
                //setPoolList(updatedCourses);
                setCourse(newCourse);
            }
        }
        setID(""); // sets the id back to "" so that placeholder displays
        setDept("");
    }

    function clearPool() {
        editPlan(plan.id, { ...plan, pool: [] });
    }

    function deleteCourse(course: Course) {
        const updatedPool = plan.pool.filter(
            (current: Course): boolean => current !== course
        );
        editPlan(plan.id, { ...plan, pool: updatedPool });
    }

    return (
        <div className="bg-white border m-2 p-2">
            <Container>
                <h4>Course Pool</h4>
                <div>
                    {plan.pool.map((course: Course) => (
                        <Container
                            key={course.code}
                            className="bg-grey border m-2 p-2"
                        >
                            <Row>
                                <Col xs={8}>
                                    {course.code}: {course.name}
                                </Col>
                                <Col>
                                    <Row>
                                        <Button
                                            size="sm"
                                            style={{
                                                height: "30px",
                                                width: "70px"
                                            }}
                                            onClick={handleAddCourse}
                                        >
                                            Add
                                        </Button>
                                    </Row>
                                    <Row>
                                        <Button
                                            size="sm"
                                            style={{
                                                height: "30px",
                                                width: "70px"
                                            }}
                                            onClick={() => deleteCourse(course)}
                                        >
                                            Delete
                                        </Button>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    ))}
                </div>
                <Row>
                    <Col>
                        <Form.Control
                            type="string"
                            value={dept}
                            onChange={updateCourse}
                            placeholder="Department ID"
                        ></Form.Control>
                    </Col>
                    <Col>
                        <Form.Select value={id} onChange={updateID}>
                            <option key="select">Select Code</option>
                            {Object.keys(
                                dept in COURSES ? COURSES[dept] : {}
                            ).map((course: string) => (
                                <option
                                    key={course.substring(5)}
                                    value={course.substring(5)}
                                >
                                    {course.substring(5)}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={addCourse}>Add to Pool</Button>
                    </Col>
                    <Col>
                        <Button onClick={clearPool}>Empty Pool</Button>
                    </Col>
                </Row>
                <AddCourseModal
                    course={course}
                    show={showAddCourse}
                    handleClose={handleCloseAddCourse}
                    plan={plan}
                    editPlan={editPlan}
                    editSemester={editSemester}
                    editPool={editPool}
                ></AddCourseModal>
            </Container>
        </div>
    );
}
