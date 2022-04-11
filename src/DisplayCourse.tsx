import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { course } from "./interfaces/course";
import coursedata from "./coursedata.json";

export function DisplayCourse(): JSX.Element {
    const [Course, setCourse] = useState<string>(""); // current inputted course that was typed in
    const [id, setID] = useState<string>(""); // course id that was typed in
    const [courseList, setCourseList] = useState<string[]>([]); // a comprehensive course list for the semester
    const [credits, setCredits] = useState<number>(0); // number of credits summed from taken courses
    const [index, setIndex] = useState<number>(0); // index in big data that matches inputted course

    const COURSES = coursedata.map(
        (courseName: course): course => ({
            ...courseName
        })
    );

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
        const newCourse = Course + "-" + id;
        if (!courseList.includes(newCourse)) {
            setCourseList([...courseList, newCourse]);
            setCredits(credits + COURSES[index].credit);
        }
        getIndex(newCourse);
        setID("");
        setCourse("");
    }

    function getIndex(courseName: string) {
        const index = COURSES.findIndex(
            (element) => element.code === courseName
        );
        //const index = COURSES.indexOf(found);
        setIndex(index);
    }

    return (
        <div>
            <div>Total Credits: {credits}</div>
            <h5>Courses: </h5>
            {courseList.map((course: string) => (
                <Container key={course}>
                    <h6>
                        {course}: {COURSES[index].title}
                    </h6>
                    <p>
                        {COURSES[index].description}
                        <div>
                            {" "}
                            <p>
                                This class is worth {COURSES[index].credit}{" "}
                                credits
                            </p>
                        </div>
                    </p>
                </Container>
            ))}
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
            </Container>
        </div>
    );
}
