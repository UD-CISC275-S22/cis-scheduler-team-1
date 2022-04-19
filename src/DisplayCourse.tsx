import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { course as Course } from "./interfaces/course";
import coursedata from "./coursedata.json";
//import { CourseEditor } from "./CourseEditor";

export function DisplayCourse(): /*{}: //course
//editCourse
//{
    //course: Course;
    //editCourse: (code: string, newCourse: Course) => void;
/*})*/ JSX.Element {
    const [Course, setCourse] = useState<string>(""); // current inputted course that was typed in
    const [id, setID] = useState<string>(""); // course id that was typed in
    const [courseList, setCourseList] = useState<string[]>([]); // a comprehensive course list for the semester
    //const [credits, setCredits] = useState<number>(0); // number of credits summed from taken courses
    //const [valid, setValid] = useState<boolean>(true); // check if valid course name and code
    //const [editing, setEditing] = useState<boolean>(false);

    const COURSES: Record<string, Record<string, Course>> = coursedata;
    // creates a dictionary (record) or dictionaries of courses using json data
    const [thesecourses, setTheseCourses] = useState<Course[]>([]);

    /*function changeEditing() {
        setEditing(!editing);
    }*/

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

    function editCourse(code: string, newCourse: Course) {
        setTheseCourses(
            thesecourses.map(
                (thiscourse: Course): Course =>
                    thiscourse.code === code ? newCourse : thiscourse
            )
        );
    }

    // combines the course and id and adds the course to the course list, adds appropriate credits
    function addCourse() {
        const newCourse = Course + " " + id;
        // will only add course if valid -- work on displaying error message
        if (
            newCourse.substring(0, 4) in COURSES &&
            newCourse in COURSES[newCourse.substring(0, 4)]
        ) {
            if (!courseList.includes(newCourse)) {
                setCourseList([...courseList, newCourse]);
                //creditVal = coursedata[Course][Course + " " + id][credits];
                //setCredits(credits + 3);
            }
        }
        setID(""); // sets the id back to "" so that placeholder displays
        setCourse("");
    }

    function clearCourses() {
        setCourseList([]);
    }

    function removeCourse(course: string) {
        const updatedList = [...courseList];
        const index = updatedList.indexOf(course);
        updatedList.splice(index, 1);
        setCourseList(updatedList);
    }

    //return //editing ? (
    //<CourseEditor
    //changeEditing={changeEditing}
    //course={course}
    //editCourse={editCourse}
    //></CourseEditor>
    /*) : */ return (
        <div>
            <h5>Courses: </h5>
            <div>Total Credits:</div>
            {courseList.map((course: string) => (
                <Container
                    key={course}
                    style={{ border: "1px solid white", padding: "6px" }}
                >
                    <div style={{ border: "1px solid black", padding: "6px" }}>
                        <h6>
                            {course}:{" "}
                            {COURSES[course.substring(0, 4)][course].name}
                        </h6>
                        <p>
                            {COURSES[course.substring(0, 4)][course].descr}
                            <div>
                                {" "}
                                <p>
                                    This class is worth{" "}
                                    {
                                        COURSES[course.substring(0, 4)][course]
                                            .credits
                                    }{" "}
                                    credits
                                </p>
                            </div>
                        </p>
                        <Button onClick={() => removeCourse(course)}>
                            Remove Course
                        </Button>
                    </div>
                </Container>
            ))}
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
                <span></span>
                <Button onClick={() => editCourse}>Edit Course</Button>
            </Container>
        </div>
    );
}
