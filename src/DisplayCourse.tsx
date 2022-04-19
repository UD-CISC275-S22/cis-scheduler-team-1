import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { course } from "./interfaces/course";
import coursedata from "./coursedata.json";
import { CourseEditor } from "./CourseEditor";

export function DisplayCourse(): JSX.Element {
    //deleteCourse: (code: string) => void;
    //editCourse: (code: string, newCourse: course) => void;
    const [Course, setCourse] = useState<string>(""); // current inputted course that was typed in
    const [id, setID] = useState<string>(""); // course id that was typed in
    const [courseList, setCourseList] = useState<course[]>([]); // a comprehensive course list for the semester

    //const [credits, setCredits] = useState<number>(0); // number of credits summed from taken courses
    //const [valid, setValid] = useState<boolean>(true); // check if valid course name and code

    const [editing, setEditing] = useState<boolean>(false);

    const COURSES: Record<string, Record<string, course>> = coursedata;
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

    // updates the id from text boz
    function updateID(event: React.ChangeEvent<HTMLInputElement>) {
        setID(event.target.value.toUpperCase());
    }

    // combines the course and id and adds the course to the course list, adds appropriate credits
    function addCourse() {
        const newCourseCode = Course + " " + id;
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

    function removeCourse(courseRemove: course) {
        const updatedList = [...courseList];
        const index = updatedList.indexOf(courseRemove);
        updatedList.splice(index, 1);
        setCourseList(updatedList);
    }

    function changeEditing() {
        setEditing(!editing);
    }

    function editCourse(code: string, newCourse: course) {
        setCourseList(
            courseList.map(
                (Course: course): course =>
                    Course.code === code ? newCourse : Course
            )
        );
    }

    /*         <CourseEditor>
            changeEditing={changeEditing}
            course={Course}
            editCourse={editCourse}
            deleteCourse={deleteCourse}
        </CourseEditor>
    ) : ( */

    return (
        <div>
            <h5>Courses: </h5>
            <div>Total Credits:</div>
            {courseList.map((course: course) =>
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
                            value={Course}
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
            </Container>
        </div>
    );
}
