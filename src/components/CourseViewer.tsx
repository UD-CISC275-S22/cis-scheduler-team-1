import React, { useState } from "react";
import { CourseEditor } from "./CourseEditor";
import { Course } from "../interfaces/course";
import { Button, Container } from "react-bootstrap";
import { Degreeplan } from "../interfaces/degreeplan";

/*
{
    plans,
    deleteDegree,
    editPlan
}: {
    plans: Degreeplan[];
    deleteDegree: (id: string) => void;
    editPlan: (id: number, newDegree: Degreeplan) => void;
}
*/

export function CourseViewer({
    course,
    editCourse
}: {
    course: Course;
    editCourse: (code: string, newCourse: Course) => void;
}): JSX.Element {
    const [editing, setEditing] = useState<boolean>(false);

    function changeEditing() {
        setEditing(!editing);
    }

    return editing ? (
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
                        <p>This class is worth {course.credits} credits</p>
                    </div>
                </p>
            </div>
            <Button onClick={changeEditing}>Edit Course</Button>
        </Container>
    );
}
