import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Course } from "../interfaces/course";
import coursedata from "../data/coursedata.json";
import { Degreeplan } from "../interfaces/degreeplan";
import { AddCourseModal } from "./AddCourseModal";

export function CoursePool({
    pool,
    plan,
    editDegree,
    editPool
}: {
    pool: Course[];
    plan: Degreeplan;
    editDegree: (id: number, newDegree: Degreeplan) => void;
    editPool: (courses: Course[]) => void;
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
        // if statement ensures that only letters are accepted, not numbers
        // use substring 0:4 so that will only accet valid course titles
        // example: HIST not HISTORY or HIST106
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
            if (!pool.includes(newCourse)) {
                const updatedCourses = [...pool, newCourse];
                editPool(updatedCourses);
                setCourse(newCourse);
            }
        }
        setID(""); // sets the id back to "" so that placeholder displays
        setDept("");
    }

    function addToSemester(course: Course) {
        const updated = pool.filter(
            (current: Course): boolean => current.code !== course.code
        );
        editPool(updated);
    }

    return (
        <div className="bg-white border m-2 p-2">
            <Container>
                <h4>Course Pool</h4>
                <div>
                    {pool.map((course: Course) => (
                        <Container
                            key={course.code}
                            className="bg-grey border m-2 p-2"
                        >
                            <Row>
                                <Col xs={8}>
                                    {course.code}: {course.name}
                                </Col>
                                <Col>
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
                <Button onClick={addCourse}>Add Course</Button>
                <AddCourseModal
                    course={course}
                    show={showAddCourse}
                    handleClose={handleCloseAddCourse}
                    editDegree={editDegree}
                    plan={plan}
                    add={addToSemester}
                ></AddCourseModal>
            </Container>
        </div>
    );
}
