import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

export function DisplayCourse(): JSX.Element {
    const [Course, setCourse] = useState<string>(""); // current inputted course that was typed in
    const [id, setID] = useState<string>(""); // course id that was typed in
    const [courseList, setCourseList] = useState<string[]>([]); // a comprehensive course list for the semester
    const [credits, setCredits] = useState<number>(0); // number of credits summed from taken courses

    // updates the course that is being typed in
    function updateCourse(event: React.ChangeEvent<HTMLInputElement>) {
        setCourse(event.target.value.toUpperCase());
    }

    // updates the id from text boz
    function updateID(event: React.ChangeEvent<HTMLInputElement>) {
        setID(event.target.value.toUpperCase());
    }

    // combines the course and id and adds the course to the course list, adds appropriate credits
    function addCourse() {
        const newCourse = Course + id;
        if (!courseList.includes(newCourse)) {
            setCourseList([...courseList, newCourse]);
            setCredits(credits + 1);
        }
        setID("");
        setCourse("");
    }

    return (
        <div>
            <strong>Courses: </strong>
            {courseList.map((course: string) => (
                <div key={course}>{course}</div>
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
