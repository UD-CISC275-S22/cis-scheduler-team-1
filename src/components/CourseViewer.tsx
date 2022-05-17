import React, { useState } from "react";
import { CourseEditor } from "./CourseEditor";
import { Course } from "../interfaces/course";
import { Button, Container } from "react-bootstrap";

export function CourseViewer({
    course,
    editCourse
}: {
    course: Course;
    editCourse: (code: string, newCourse: Course) => void;
}): JSX.Element {
    const [editing, setEditing] = useState<boolean>(false);
    const [moreDetails, setMoreDetails] = useState<boolean>(false);

    function changeEditing() {
        setEditing(!editing);
    }
    function changeMore() {
        setMoreDetails(!moreDetails);
    }

    return editing ? (
        <CourseEditor
            changeEditing={changeEditing}
            course={course}
            editCourse={editCourse}
        ></CourseEditor>
    ) : moreDetails ? (
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
                        <p>This class is worth {course.credits} credits</p>
                    </div>
                </p>
                <Button size="sm" onClick={changeMore}>
                    Show Less
                </Button>
                <Button size="sm" onClick={changeEditing}>
                    Edit Course
                </Button>
            </div>
        </Container>
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
                <Button size="sm" onClick={changeMore}>
                    Show More
                </Button>
                <Button size="sm" onClick={changeEditing}>
                    Edit Course
                </Button>
            </div>
        </Container>
    );
}
