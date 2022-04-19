import React, { useState } from "react";
import { ListGroup, Form, Container, Col, Row, Button } from "react-bootstrap";
import { course as Course } from "./interfaces/course";
import coursedata from "./coursedata.json";

/* interface CourseProps {
    course: Course;
    setCourse: (code: string, newCourse: Course) => void;
} */

export function CourseEditor(
    {
        changeEditing,
        course,
        editCourse
    }: /*course,
    setCourse */
    {
        changeEditing: () => void;
        course: Course;
        editCourse: (code: string, newCourse: Course) => void;
    } /*CourseProps*/
): JSX.Element {
    const [code, setCode] = useState<string>(course.code);
    const [name, setName] = useState<string>(course.name);
    const [credits, setCredits] = useState<string>(course.credits);

    function save() {
        editCourse(course.code, {
            ...course,
            code: course.code,
            name: course.name,
            credits: course.credits
        });
        changeEditing();
    }

    function cancel() {
        changeEditing();
    }

    return (
        <Container>
            <Row>
                <Col>
                    {/* Course Code */}
                    <Form.Group controlId="formCourseCode" as={Row}>
                        <Form.Label column sm={2}>
                            Code:
                        </Form.Label>
                        <Col>
                            <Form.Control
                                value={course.code}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => setCode(event.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    {/* Course Name */}
                    <Form.Group controlId="formCourseName" as={Row}>
                        <Form.Label column sm={2}>
                            Name:
                        </Form.Label>
                        <Col>
                            <Form.Control
                                value={course.name}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => setName(event.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    {/* Course Credits */}
                    <Form.Group controlId="formCourseCredits" as={Row}>
                        <Form.Label column sm={2}>
                            Credits:
                        </Form.Label>
                        <Col>
                            <Form.Control
                                value={course.credits}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => setCredits(event.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    {/* Save/Cancel */}
                    <Button onClick={save} variant="success" className="me-4">
                        Save
                    </Button>
                    <Button onClick={cancel} variant="warning" className="me-5">
                        Cancel
                    </Button>
                </Col>
            </Row>
        </Container>
    );

    /*

    return (
        <Form.Control
            value={course.code}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setCourse(course.code, {
                    ...course,
                    code: event.target.value
                })
            }
        />
    );
}

export function CourseNameEditor({
    course,
    setCourse
}: CourseProps): JSX.Element {
    return (
        <Form.Control
            value={course.name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setCourse(course.code, {
                    ...course,
                    name: event.target.value
                })
            }
        />
    );
}

export function CourseCreditsEditor({
    course,
    setCourse
}: CourseProps): JSX.Element {
    return (
        <Form.Control
            value={course.credits}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setCourse(course.code, {
                    ...course,
                    credits: event.target.value
                })
            }
        />
    );
}

export function CourseEditor({
    courses,
    setCourses
}: {
    courses: Course[];
    setCourses: (courses: Course[]) => void;
}): JSX.Element {
    //id: coursedata[0].toString
    function setCourse(code: string, newCourse: Course) {
        setCourses(
            courses.map((course: Course) =>
                course.code === code ? newCourse : course
            )
        );
    } */
    /*return (
        <ListGroup as="ol" numbered>
            {courses.map((course: Course) => (
                <ListGroup.Item
                    as="li"
                    key={course.code}
                    className="d-flex align-items-start"
                >
                    <div className="ms-2 me-auto">
                        {/* Course Code */ //}
    /*<CourseCodeEditor
                            course={course}
                            setCourse={setCourse}
                        ></CourseCodeEditor>
                        {/* Course Name */ //}
    /*<CourseNameEditor
                            course={course}
                            setCourse={setCourse}
                        ></CourseNameEditor>
                        {/* Course Credits */ //}
    /*<CourseCreditsEditor
                            course={course}
                            setCourse={setCourse}
                        ></CourseCreditsEditor>
                    </div>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );*/
}
