import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { course as Course } from "../interfaces/course";
import coursedata from "../data/coursedata.json";
import { CourseEditor } from "./CourseEditor";

export function DisplayCourse(): JSX.Element {
    const [course, setCourse] = useState<string>(""); // current inputted course that was typed in
    const [id, setID] = useState<string>(""); // course id that was typed in
    const [courseList, setCourseList] = useState<Course[]>([]); // a comprehensive course list for the semester

    const [editing, setEditing] = useState<boolean>(false);

    const COURSES: Record<string, Record<string, Course>> = coursedata;
    // creates a dictionary (record) or dictionaries of courses using json data

    // updates the course that is being typed in
    function updateCourse(event: React.ChangeEvent<HTMLInputElement>) {
        if (
            /^[a-zA-Z]+$/.test(event.target.value) ||
            event.target.value === ""
        ) {
            setCourse(event.target.value.toUpperCase().substring(0, 4));
        }
        // if statement ensures that only letters are accepted, not numbers
        // use substring 0:4 so that will only accet valid course titles
        // example: HIST not HISTORY or HIST106
    }

    // updates the id from text box
    function updateID(event: React.ChangeEvent<HTMLInputElement>) {
        setID(event.target.value.toUpperCase());
    }

    // combines the course and id and adds the course to the course list, adds appropriate credits
    function addCourse() {
        const newCourseCode = course + " " + id;
        // will only add course if valid -- work on displaying error message
        if (
            newCourseCode.substring(0, 4) in COURSES &&
            newCourseCode in COURSES[newCourseCode.substring(0, 4)]
        ) {
            const newCourse = {
                ...COURSES[newCourseCode.substring(0, 4)][newCourseCode]
            };
            if (!courseList.includes(newCourse)) {
                setCourseList([...courseList, newCourse]);
            }
        }
        setID(""); // sets the id back to "" so that placeholder displays
        setCourse("");
    }

    function clearCourses() {
        setCourseList([]);
    }

    function removeCourse(courseRemove: Course) {
        const updatedList = [...courseList];
        const index = updatedList.indexOf(courseRemove);
        updatedList.splice(index, 1);
        setCourseList(updatedList);
    }

    function resetCourse(courseReset: Course) {
        const reset =
            COURSES[courseReset.code.substring(0, 4)][courseReset.code];
        setCourseList(
            courseList.map(
                (course: Course): Course =>
                    course.code === courseReset.code ? reset : course
            )
        );
    }

    function changeEditing() {
        setEditing(!editing);
    }

    function editCourse(code: string, newCourse: Course) {
        setCourseList(
            courseList.map(
                (course: Course): Course =>
                    course.code === code ? newCourse : course
            )
        );
    }

    return (
        <div>
            <h5>Courses: </h5>
            <div>Total Credits:</div>
            {courseList.map((course: Course) =>
                editing ? (
                    <CourseEditor
                        changeEditing={changeEditing}
                        course={course}
                        editCourse={editCourse}
                    ></CourseEditor>
                ) : (
                    <Container
                        key={course.code}
                        style={{ border: "1px solid white", padding: "6px" }}
                    >
                        <div
                            style={{
                                border: "1px solid black",
                                padding: "6px"
                            }}
                        >
                            <h6>
                                {course.code}: {course.name}
                            </h6>
                            <p>
                                {course.descr}
                                <div>
                                    {" "}
                                    <p>
                                        This class is worth {course.credits}{" "}
                                        credits
                                    </p>
                                </div>
                            </p>
                            <Button onClick={changeEditing}>Edit Course</Button>
                            <Button onClick={() => removeCourse(course)}>
                                Remove Course
                            </Button>
                            <Button onClick={() => resetCourse(course)}>
                                Reset
                            </Button>
                        </div>
                    </Container>
                )
            )}
            <div></div>
            <Container>
                <Row>
                    <Col>
                        <Form.Control
                            type="string"
                            value={course}
                            onChange={updateCourse}
                            placeholder="Type Department ID Here"
                        ></Form.Control>
                    </Col>
                    <Col>
                        <Form.Control
                            type="number"
                            value={id}
                            onChange={updateID}
                            placeholder="Type Course Number Here"
                        ></Form.Control>
                    </Col>
                </Row>
                <Button onClick={addCourse}>Add Course</Button>
                <span> </span>
                <Button onClick={clearCourses}>Clear Courses</Button>
                <span></span>
            </Container>
        </div>
    );
}
