import React from "react";
import { ListGroup, Form } from "react-bootstrap";
import { course as Course } from "./interfaces/course";
import coursedata from "./coursedata.json";

interface CourseProps {
    course: Course;
    setCourse: (code: string, newCourse: Course) => void;
}

export function CourseCodeEditor({
    course,
    setCourse
}: CourseProps): JSX.Element {
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
    }
    return (
        <ListGroup as="ol" numbered>
            {courses.map((course: Course) => (
                <ListGroup.Item
                    as="li"
                    key={course.code}
                    className="d-flex align-items-start"
                >
                    <div className="ms-2 me-auto">
                        {/* Course Code */}
                        <CourseCodeEditor
                            course={course}
                            setCourse={setCourse}
                        ></CourseCodeEditor>
                        {/* Course Name */}
                        <CourseNameEditor
                            course={course}
                            setCourse={setCourse}
                        ></CourseNameEditor>
                        {/* Course Credits */}
                        <CourseCreditsEditor
                            course={course}
                            setCourse={setCourse}
                        ></CourseCreditsEditor>
                    </div>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}
