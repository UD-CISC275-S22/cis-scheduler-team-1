import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Course } from "../interfaces/course";

export function CourseEditor({
    changeEditing,
    course,
    editCourse
}: {
    changeEditing: () => void;
    course: Course;
    editCourse: (code: string, newCourse: Course) => void;
}): JSX.Element {
    // create state variables for every attribute in course
    const [name, setName] = useState<string>(course.name); // original name for course
    const [credits, setCredits] = useState<string>(course.credits);
    const [description, setDescription] = useState<string>(course.descr);
    const [preReq, setPreReq] = useState<string>(course.preReq);
    const [restrict, setRestrict] = useState<string>(course.restrict);
    const [breadth, setBreadth] = useState<string>(course.breadth);
    const [type, setType] = useState<string>(course.typ);

    function saveChanges() {
        editCourse(course.code, {
            ...course,
            name: name,
            credits: credits,
            descr: description,
            preReq: preReq,
            restrict: restrict,
            breadth: breadth,
            typ: type
        });
        changeEditing();
    }

    function close() {
        changeEditing(); // close without saving
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Form.Group controlId="courseName" as={Row}>
                        <Form.Label column sm={3}>
                            Course Name:
                        </Form.Label>
                        <Col>
                            <Form.Control
                                value={name}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => setName(event.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="courseDescr" as={Row}>
                        <Form.Label column sm={3}>
                            Course Description:
                        </Form.Label>
                        <Col>
                            <Form.Control
                                value={description}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => setDescription(event.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="courseCredits" as={Row}>
                        <Form.Label column sm={3}>
                            Course Credits:
                        </Form.Label>
                        <Col>
                            <Form.Control
                                value={credits}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => setCredits(event.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="coursePreReqs" as={Row}>
                        <Form.Label column sm={3}>
                            Course PreRequisites:
                        </Form.Label>
                        <Col>
                            <Form.Control
                                value={preReq}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => setPreReq(event.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="courseRestrict" as={Row}>
                        <Form.Label column sm={3}>
                            Course Restrictions:
                        </Form.Label>
                        <Col>
                            <Form.Control
                                value={restrict}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => setRestrict(event.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="courseBreadth" as={Row}>
                        <Form.Label column sm={3}>
                            Course Breadth Fulfillments:
                        </Form.Label>
                        <Col>
                            <Form.Control
                                value={breadth}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => setBreadth(event.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group controlId="courseType" as={Row}>
                        <Form.Label column sm={3}>
                            Course Offered In:
                        </Form.Label>
                        <Col>
                            <Form.Control
                                value={type}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => setType(event.target.value)}
                            />
                        </Col>
                    </Form.Group>
                </Col>
                <Button onClick={saveChanges}>Save Changes</Button>
                <Button onClick={close}>Cancel</Button>
            </Row>
        </Container>
    );
}
